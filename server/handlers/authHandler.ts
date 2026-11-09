import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  verifyUserCredentials,
  checkLoginRateLimit,
  resetLoginRateLimit,
  createSessionToken,
  serializeSessionCookie,
  serializeClearSessionCookie,
  extractSessionFromRequest,
} from '../auth';

// Helper to get CORS headers compatible with credentials and cookies
function getCorsHeaders(req: IncomingMessage, allowedMethods = 'GET, POST, OPTIONS'): Record<string, string> {
  const origin = (req.headers.origin as string) || '';
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': allowedMethods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };

  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
}

// Helper to send CORS preflight responses
function handleCorsPreflight(req: IncomingMessage, res: ServerResponse, allowedMethods = 'POST, OPTIONS'): boolean {
  res.writeHead(204, getCorsHeaders(req, allowedMethods));
  res.end();
  return true;
}

// Resilient helper to read JSON body (supports pre-parsed Vercel body, raw Node stream, and timeout)
async function readJsonBody(req: IncomingMessage): Promise<any> {
  if ((req as any).body !== undefined && (req as any).body !== null) {
    if (typeof (req as any).body === 'string') {
      try {
        return JSON.parse((req as any).body);
      } catch {
        return {};
      }
    }
    return (req as any).body;
  }

  if (req.readableEnded || (req as any).complete) {
    return {};
  }

  return new Promise((resolve) => {
    let body = '';
    const timer = setTimeout(() => {
      resolve({});
    }, 2500);

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        clearTimeout(timer);
        resolve({});
      }
    });
    req.on('end', () => {
      clearTimeout(timer);
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      clearTimeout(timer);
      resolve({});
    });
  });
}

/**
 * Dedicated handler for POST /api/auth/login
 */
export async function handleLoginRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = req.method || 'GET';
  if (method === 'OPTIONS') {
    handleCorsPreflight(req, res, 'POST, OPTIONS');
    return;
  }

  const isSecure = req.headers['x-forwarded-proto'] === 'https' || Boolean(process.env.VERCEL);
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  const sendJson = (status: number, data: any, headers?: Record<string, string | string[]>) => {
    if (res.headersSent) return;
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      ...getCorsHeaders(req, 'POST, OPTIONS'),
      ...(headers || {}),
    });
    res.end(JSON.stringify(data));
  };

  if (method !== 'POST') {
    return sendJson(405, { success: false, error: 'Method not allowed. Use POST.' });
  }

  // Check login rate limit
  const rateCheck = checkLoginRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return sendJson(429, {
      success: false,
      error: `Too many login attempts. Please try again in ${rateCheck.retryAfterSeconds || 60} seconds.`,
    });
  }

  const body = await readJsonBody(req);
  const username = body?.username;
  const password = body?.password;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return sendJson(400, { success: false, error: 'Username and password are required.' });
  }

  const result = verifyUserCredentials(username, password);
  if (!result.verified || !result.role) {
    return sendJson(401, {
      success: false,
      error: 'Invalid username or password. Access denied.',
      remainingAttempts: rateCheck.remaining,
    });
  }

  resetLoginRateLimit(clientIp);

  const token = createSessionToken(username.trim(), result.role);
  const cookieHeader = serializeSessionCookie(token, isSecure);

  return sendJson(
    200,
    {
      success: true,
      user: { username: username.trim(), role: result.role },
      token,
    },
    { 'Set-Cookie': cookieHeader }
  );
}

/**
 * Dedicated handler for POST /api/auth/logout
 */
export async function handleLogoutRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = req.method || 'GET';
  if (method === 'OPTIONS') {
    handleCorsPreflight(req, res, 'POST, OPTIONS');
    return;
  }

  const isSecure = req.headers['x-forwarded-proto'] === 'https' || Boolean(process.env.VERCEL);
  const clearCookie = serializeClearSessionCookie(isSecure);

  if (res.headersSent) return;
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    ...getCorsHeaders(req, 'POST, OPTIONS'),
    'Set-Cookie': clearCookie,
  });
  res.end(JSON.stringify({ success: true }));
}

/**
 * Dedicated handler for GET /api/auth/session
 */
export async function handleSessionRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = req.method || 'GET';
  if (method === 'OPTIONS') {
    handleCorsPreflight(req, res, 'GET, OPTIONS');
    return;
  }

  const session = extractSessionFromRequest(req.headers.cookie, req.headers.authorization);
  if (res.headersSent) return;
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    ...getCorsHeaders(req, 'GET, OPTIONS'),
  });

  if (!session) {
    res.end(JSON.stringify({ authenticated: false }));
    return;
  }

  res.end(
    JSON.stringify({
      authenticated: true,
      user: { username: session.username, role: session.role },
    })
  );
}

/**
 * Combined handler used by Vite dev server plugin and fallback routers
 */
export async function handleAuthRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = req.url || '';
  if (url.includes('/logout')) {
    return handleLogoutRequest(req, res);
  }
  if (url.includes('/session')) {
    return handleSessionRequest(req, res);
  }
  return handleLoginRequest(req, res);
}
