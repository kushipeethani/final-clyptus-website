import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  submittedAt: string;
  ip: string;
  userAgent?: string;
}

// In-memory rate limiting map for contact submissions: IP -> { count, firstSubmission }
const contactRateLimitMap = new Map<string, { count: number; firstSubmission: number }>();
const CONTACT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CONTACT_PER_WINDOW = 5;

// Valid service options
const ALLOWED_SERVICES = [
  'AI Solutions & Agentic Pipelines',
  'SAP Consulting, BRIM & S/4HANA',
  'IT Staffing & Global Recruitment',
  'Cloud Architecture & DevOps',
  'Custom Enterprise Development',
  'General Inquiry & Leadership Contact',
  'SAP Consulting',
  'AI Development',
  'IT Staffing',
  'Recruiting',
  'General Inquiry',
];

// RFC 5322 simplified email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function handleContactRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = req.method || 'GET';
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const sendJson = (status: number, data: any) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(JSON.stringify(data));
  };

  if (method !== 'POST') {
    return sendJson(405, { success: false, error: 'Method not allowed. Use POST.' });
  }

  // 1. Rate Limiting Check
  const now = Date.now();
  const rateRecord = contactRateLimitMap.get(clientIp);
  if (rateRecord) {
    if (now - rateRecord.firstSubmission < CONTACT_WINDOW_MS) {
      if (rateRecord.count >= MAX_CONTACT_PER_WINDOW) {
        const retryAfterMinutes = Math.ceil((rateRecord.firstSubmission + CONTACT_WINDOW_MS - now) / 60000);
        return sendJson(429, {
          success: false,
          error: `Too many submissions from your network. Please wait ${retryAfterMinutes} minute(s) before trying again.`,
        });
      }
      rateRecord.count += 1;
    } else {
      contactRateLimitMap.set(clientIp, { count: 1, firstSubmission: now });
    }
  } else {
    contactRateLimitMap.set(clientIp, { count: 1, firstSubmission: now });
  }

  // 2. Read Request Body
  let body: any;
  try {
    const raw = await new Promise<string>((resolve, reject) => {
      let accum = '';
      req.on('data', (chunk) => {
        accum += chunk;
        if (accum.length > 50000) {
          reject(new Error('Payload too large'));
        }
      });
      req.on('end', () => resolve(accum));
      req.on('error', reject);
    });
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return sendJson(400, { success: false, error: 'Malformed JSON payload.' });
  }

  // 3. Honeypot Bot Trap Check
  // Hidden fields: if filled, reject submission
  if (body._company_website || body._gotcha) {
    return sendJson(400, { success: false, error: 'Spam detected.' });
  }

  // 4. Validate Fields
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length < 2 || name.length > 100) {
    return sendJson(400, { success: false, error: 'Please provide a valid name (2-100 characters).' });
  }

  if (!email || email.length > 150 || !EMAIL_REGEX.test(email)) {
    return sendJson(400, { success: false, error: 'Please provide a valid business email address.' });
  }

  if (phone && phone.length > 25) {
    return sendJson(400, { success: false, error: 'Phone number cannot exceed 25 characters.' });
  }

  if (service && !ALLOWED_SERVICES.includes(service)) {
    return sendJson(400, { success: false, error: 'Please select a valid service category.' });
  }

  if (!message || message.length < 10) {
    return sendJson(400, { success: false, error: 'Message must be at least 10 characters long.' });
  }

  if (message.length > 3000) {
    return sendJson(400, { success: false, error: 'Message cannot exceed 3,000 characters.' });
  }

  const inquiry: ContactInquiry = {
    name,
    email,
    phone: phone || undefined,
    service: service || 'General Inquiry',
    message,
    submittedAt: new Date().toISOString(),
    ip: clientIp,
    userAgent: req.headers['user-agent'],
  };

  // 5. Delivery Provider Dispatch
  let deliveryResult = { delivered: false, provider: 'none', details: '' };

  // Option A: Resend API (if configured in environment)
  if (process.env.RESEND_API_KEY) {
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Clyptus Website <onboarding@resend.dev>',
          to: process.env.CONTACT_TO_EMAIL || 'contact@clyptus.com',
          reply_to: email,
          subject: `[New Inquiry] ${service} - from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nTime: ${inquiry.submittedAt}\n\nMessage:\n${message}`,
        }),
      });

      if (resendResponse.ok) {
        deliveryResult = { delivered: true, provider: 'resend', details: 'Email dispatched via Resend' };
      } else {
        const errorText = await resendResponse.text();
        console.error('Resend delivery error:', errorText);
        deliveryResult = { delivered: false, provider: 'resend', details: errorText };
      }
    } catch (err: any) {
      console.error('Failed to dispatch via Resend:', err.message);
      deliveryResult = { delivered: false, provider: 'resend', details: err.message };
    }
  }

  // Option B: Webhook (if configured in environment)
  else if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const webhookRes = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (webhookRes.ok) {
        deliveryResult = { delivered: true, provider: 'webhook', details: 'Notification dispatched via Webhook' };
      }
    } catch (err: any) {
      console.error('Failed to dispatch via Webhook:', err.message);
    }
  }

  // Always log inquiry to protected server log file
  try {
    const logDir = path.resolve(process.cwd(), 'server', 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logPath = path.resolve(logDir, 'inquiries.jsonl');
    fs.appendFileSync(logPath, JSON.stringify(inquiry) + '\n', 'utf8');
    if (!deliveryResult.delivered) {
      deliveryResult = { delivered: true, provider: 'server_audit_log', details: 'Inquiry securely recorded in server queue' };
    }
  } catch (err: any) {
    console.error('Failed to write inquiry log:', err.message);
  }

  return sendJson(200, {
    success: true,
    message: 'Thank you for reaching out! A senior Clyptus solution architect will review your project details and contact you promptly.',
    inquiryId: Buffer.from(`${Date.now()}-${Math.random().toString(36).slice(2, 7)}`).toString('base64url'),
    provider: deliveryResult.provider,
  });
}
