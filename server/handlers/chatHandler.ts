import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export interface ChatHistoryItem {
  sender: 'user' | 'ai';
  text: string;
}

export interface QuickActionItem {
  label: string;
  pageTarget?: string;
  chatQuery?: string;
}

// In-memory rate limiting map for chat queries: IP -> { count, windowStart }
const chatRateLimitMap = new Map<string, { count: number; windowStart: number }>();
const CHAT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_CHAT_PER_MINUTE = 40;

function getGroqApiKey(): string | undefined {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    return process.env.GROQ_API_KEY.trim();
  }
  if (process.env.VITE_GROQ_API_KEY && process.env.VITE_GROQ_API_KEY.trim()) {
    return process.env.VITE_GROQ_API_KEY.trim();
  }

  // Fallback: Read directly from .env file in workspace root
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match =
        content.match(/^GROQ_API_KEY=(.+)$/m) ||
        content.match(/^VITE_GROQ_API_KEY=(.+)$/m);
      if (match && match[1]) {
        const val = match[1].trim().replace(/^['"]|['"]$/g, '');
        if (val) return val;
      }
    }
  } catch {
    // Ignore error
  }

  return undefined;
}

const SYSTEM_PROMPT = `You are Keva, the intelligent AI assistant for Clyptus Software Solutions (www.clyptus.com).
Your mission is to provide accurate, engaging, and professional answers about Clyptus's services, team, journey, and website.

COMPANY IDENTITY & LEADERSHIP:
• Clyptus Software Solutions was founded in 2014 and is an official SAP Silver Partner with 250+ senior enterprise consultants worldwide.
• Slogan: "Turning Ideas Into Impact" | Vision: "Shaping Tomorrow Through Innovation".
• Leadership Team:
  - Vamsi Krishna Are: Chief Executive Officer & Founder (leading global strategy, cloud & AI partnerships across USA, UAE, and India).
  - Satya Narayana K: Operations Manager (leading cross-functional engineering delivery units across SAP, Cloud, AI, and QA governance).
  - Nandhini P: Project Manager (enterprise project execution, agile sprint governance, and client stakeholder management).

GLOBAL LOCATIONS & CONTACTS:
• Hyderabad, India (Global HQ): Manjeera Trinity Corporate, JNTU-Hitech City Rd. Phone: +91 77999 88139
• Dubai, UAE: 101 Sheikh Zayed Rd, Trade Centre 1, DIFC. Phone: +971 52 350 3297
• California, USA: 45627 Basswood Ct, Temecula, CA. Phone: +1 480 427-6373
• Official Emails: sales@clyptus.com | hr.india@clyptus.com | hr.uae@clyptus.com | hr.usa@clyptus.com | contact@clyptus.com

8 CORE ENTERPRISE PRACTICES:
1. ERP & SAP Solutions (SAP Silver Partner):
   - SAP S/4HANA: Greenfield implementations, brownfield system conversions, and RISE with SAP.
   - SAP BRIM (Billing & Revenue Innovation Management): SOM, Convergent Charging (CC), Convergent Invoicing (CI), Convergent Mediation (CM), and FI-CA / RAR (IFRS 15) revenue recognition.
   - Clean Core Architecture: Decoupling custom logic via SAP BTP to preserve a clean core for automated zero-downtime upgrades.
   - SAP BTP: Cloud Integration (CPI), SAP Fiori UX modernization, and ABAP Cloud development.
   - 24/7 Managed AMS: Hypercare stabilization and SLA-backed maintenance.

2. Artificial Intelligence & GenAI Engineering:
   - Bespoke LLMs & Enterprise RAG: Connecting internal vector databases (Pinecone, pgvector) with zero-data leakage.
   - Autonomous AI Agent Swarms: Multi-agent systems collaborating on multi-step workflows.
   - Core Services: Data Science & Analytics (predictive models & dashboards), Intelligent Process Automation (IPA for ERP reconciliations), AI Inside SAP S/4HANA (embedded ML for cash/MRP).
   - 5-Step Project Lifecycle: 1. Data Audit & Readiness, 2. Architecture & Model Selection, 3. Validation & Guardrail Benchmarking, 4. Production MLOps Deployment, 5. Continuous Monitoring & Drift Mitigation.
   - Innovation Lab: Digital Twins (real-time process simulation), Computer Vision (sub-mm defect inspection, PPE compliance), RPA + GenAI (hyperautomation), Industry 4.0 analytics.
   - Model Architectures: NLP, Computer Vision, Predictive Analytics, Generative Copilots, Recommendation Systems, Time Series Forecasting.
   - Case Studies: Retail Demand Forecasting (-27% stockouts), Logistics Automation (-35% turnaround), Healthcare Data Lake (HIPAA-compliant), Banking Data Warehouse (sub-40ms fraud scoring).

3. Multi-Cloud Architecture & DevOps:
   - AWS, Microsoft Azure, Google Cloud Platform (GCP).
   - Kubernetes (EKS/AKS/GKE), Docker microservices, serverless computing (AWS Lambda, Azure Functions).
   - Zero-downtime cloud migration, database modernization, and Terraform/Ansible IaC.

4. Cybersecurity & Regulatory Compliance:
   - 24/7 Managed SOC: Real-time SIEM/SOAR automated response playbooks and proactive threat hunting.
   - Zero-Trust Architecture: Least-privilege IAM, software-defined microsegmentation, and end-to-end mTLS.
   - Compliance Readiness: ISO/IEC 27001, SOC 2 Type II, HIPAA/HITECH, GDPR, PCI DSS v4.0, NIST CSF.

5. CRM & Customer Experience:
   - SAP CX (Sales Cloud, Service Cloud, Commerce Cloud, CDP, Emarsys).
   - Microsoft Dynamics 365 (Finance, Supply Chain, Business Central, Field Service).
   - Omnichannel CPQ & automated revenue operations.

6. Salesforce & Agentforce:
   - Salesforce Agentforce AI autonomous agents.
   - Sales & Service Cloud modernization, custom Lightning Web Components (LWC), Apex, and MuleSoft integrations.

7. Data Engineering & Modern Lakehouses:
   - Snowflake, Databricks, and Google BigQuery lakehouse architectures (Medallion: Bronze/Silver/Gold).
   - Real-time streaming with Apache Kafka, Apache Spark, and automated dbt transformations.
   - Executive BI visualization in Power BI, Tableau, and Looker.

8. IT Staffing & Talent Delivery:
   - Models: Contract Staffing, Contract-to-Hire, Permanent Placement, Dedicated Offshore Centers of Excellence (CoE).
   - 330+ vetted engineers across SAP, Cloud, AI, and DevOps.

WEBSITE RESOURCES & PORTALS:
• Insights & Blogs: Technical whitepapers, 2026 SAP migration roadmaps, and architectural deep-dives.
• HR Policies: Protected corporate portal for employee handbooks, POSH, code of conduct, leave policies.
• Careers: Active vacancies for SAP S/4HANA, Cloud Architects, GenAI Engineers, BRIM, Power BI developers.

PAGE NAVIGATION TARGETS:
When a user asks to see, open, visit, or navigate to a page, identify the exact target page:
'Home', 'Services', 'SAP', 'AI', 'Cloud', 'Security', 'CRM', 'Salesforce', 'DataEngineering', 'Recruiting', 'Projects', 'Industries', 'About', 'Careers', 'HR Policies', 'Contact', 'Blogs'.

CRITICAL FORMATTING INSTRUCTIONS (STRICT):
• NEVER output Markdown tables with pipes '|'. Chat windows are narrow, and tables break readability.
• NEVER output raw HTML tags like <br>, <p>, <div>, or <span>. Use clean double newlines for line breaks.
• Always format lists, metrics, and comparisons as clean bullet points:
  • **Category / Practice**: Description of key offerings and achievements.
• Be factual, helpful, and concise (under 200 words unless in-depth detail is requested).
• If the question relates to an enterprise page, mention that you can take them there.`;

export function sanitizeAndFormatChat(text: string): string {
  if (!text) return '';

  const rawLines = text.split('\n');
  const processedLines: string[] = [];

  for (const rawLine of rawLines) {
    const line = rawLine.trim();
    if (!line) {
      processedLines.push('');
      continue;
    }

    // Skip table header divider rows like |---|---| or |:---|:---|
    if (/^\|[\s:-|-]+\|$/.test(line)) {
      continue;
    }

    // Match table rows: | Col1 | Col2 | Col3? |
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);

      // If it looks like a generic header row (e.g. # | Practice | Highlights)
      if (
        cells.some((c) =>
          /^(#|practice|area|service|what we do|category|key offerings|highlights|domain)$/i.test(c)
        )
      ) {
        continue;
      }

      if (cells.length === 1) {
        const subItems = cells[0].split(/<br\s*\/?>/gi).map((s) => s.trim()).filter(Boolean);
        for (const sub of subItems) {
          processedLines.push(sub.startsWith('•') || sub.startsWith('-') ? sub : '• ' + sub);
        }
      } else if (cells.length >= 2) {
        // Strip numbering like 1, 2 or markdown bold
        const title = cells[0].replace(/^(\d+\.?\s*|\*+)/g, '').replace(/\*+$/g, '').trim();
        const descRaw = cells.slice(1).join(' — ').trim();
        const subItems = descRaw.split(/<br\s*\/?>/gi).map((s) => s.trim()).filter(Boolean);

        if (subItems.length === 1) {
          const cleanDesc = subItems[0].replace(/^[•-]\s*/, '').trim();
          processedLines.push(`• **${title}**: ${cleanDesc}`);
        } else {
          processedLines.push(`• **${title}**:`);
          for (const sub of subItems) {
            const cleanSub = sub.replace(/^[•-]\s*/, '').trim();
            processedLines.push(`  - ${cleanSub}`);
          }
        }
      }
      continue;
    }

    // Normal non-table line: split any <br> into separate lines
    const subs = line.split(/<br\s*\/?>/gi);
    for (const sub of subs) {
      if (sub.trim()) processedLines.push(sub.trim());
    }
  }

  // Remove any remaining raw HTML tags
  let result = processedLines.join('\n');
  result = result.replace(/<\/?(br|p|div|span|strong|b|em|i)>/gi, '');

  return result.trim();
}

export async function handleChatRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
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

  // 1. Rate Limiting Check (40 requests per minute per IP)
  const now = Date.now();
  const rateRecord = chatRateLimitMap.get(clientIp);
  if (rateRecord) {
    if (now - rateRecord.windowStart < CHAT_WINDOW_MS) {
      if (rateRecord.count >= MAX_CHAT_PER_MINUTE) {
        return sendJson(429, {
          success: false,
          error: 'Rate limit reached. Please wait a moment before sending another message.',
          useFallback: true,
        });
      }
      rateRecord.count += 1;
    } else {
      chatRateLimitMap.set(clientIp, { count: 1, windowStart: now });
    }
  } else {
    chatRateLimitMap.set(clientIp, { count: 1, windowStart: now });
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

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const history: ChatHistoryItem[] = Array.isArray(body.history) ? body.history.slice(-6) : [];

  if (!message) {
    return sendJson(400, { success: false, error: 'Message cannot be empty.' });
  }

  // 3. Check for Groq API Key
  const groqApiKey = getGroqApiKey();
  if (!groqApiKey) {
    // If no key is set yet, instruct client to use local rule engine seamlessly
    return sendJson(200, {
      success: true,
      useFallback: true,
      reason: 'No GROQ_API_KEY configured.',
    });
  }

  // 4. Build Groq Chat Payload
  const messagesPayload: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  // Append recent conversational context
  for (const h of history) {
    if (h.sender === 'user') {
      messagesPayload.push({ role: 'user', content: h.text });
    } else if (h.sender === 'ai') {
      messagesPayload.push({ role: 'assistant', content: h.text });
    }
  }

  messagesPayload.push({ role: 'user', content: message });

  // 5. Query Groq API with robust model fallback and 12-second timeout
  const CANDIDATE_MODELS = [
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant'
  ];

  let aiText = '';

  for (const model of CANDIDATE_MODELS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: messagesPayload,
          temperature: 0.3,
          max_tokens: 1200,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (groqResponse.ok) {
        const data: any = await groqResponse.json();
        const content = data?.choices?.[0]?.message?.content?.trim() || '';
        if (content) {
          aiText = content;
          break; // Successfully got response from Groq
        }
      } else {
        const errText = await groqResponse.text();
        console.warn(`Groq model ${model} unavailable (${groqResponse.status}):`, errText);
        // Continue to next candidate model
      }
    } catch (modelErr: any) {
      console.warn(`Groq model ${model} error:`, modelErr?.message || modelErr);
      // Continue to next candidate model
    }
  }

  if (!aiText) {
    return sendJson(200, { success: true, useFallback: true, reason: 'No Groq models responded' });
  }

  // Sanitize any raw <br> tags or markdown tables into clean bullet structures
  aiText = sanitizeAndFormatChat(aiText);

  // 6. Infer Navigation & Quick Action Recommendations from Query & Answer
  const lowerQ = message.toLowerCase();
  const lowerA = aiText.toLowerCase();

    let pageTarget: string | undefined = undefined;
    const quickActions: QuickActionItem[] = [];

    if (/\b(erp|sap|s\/?4hana|brim|btp|clean core)\b/i.test(lowerQ) || lowerA.includes('sap s/4hana') || lowerA.includes('sap brim')) {
      pageTarget = 'SAP';
      quickActions.push({ label: 'Go to ERP & SAP Services', pageTarget: 'SAP' });
    } else if (/\b(ai|genai|llm|rag|machine learning|agent|digital twin|computer vision)\b/i.test(lowerQ) || lowerA.includes('artificial intelligence')) {
      pageTarget = 'AI';
      quickActions.push({ label: 'Go to AI Solutions', pageTarget: 'AI' });
    } else if (/\b(cloud|aws|azure|gcp|devops|kubernetes)\b/i.test(lowerQ)) {
      pageTarget = 'Cloud';
      quickActions.push({ label: 'Go to Cloud Services', pageTarget: 'Cloud' });
    } else if (/\b(security|cyber|soc|zero trust|iso 27001|compliance)\b/i.test(lowerQ)) {
      pageTarget = 'Security';
      quickActions.push({ label: 'Go to Cybersecurity', pageTarget: 'Security' });
    } else if (/\b(crm|dynamics 365|sap cx)\b/i.test(lowerQ)) {
      pageTarget = 'CRM';
      quickActions.push({ label: 'Go to CRM Services', pageTarget: 'CRM' });
    } else if (/\b(salesforce|agentforce)\b/i.test(lowerQ)) {
      pageTarget = 'Salesforce';
      quickActions.push({ label: 'Go to Salesforce Solutions', pageTarget: 'Salesforce' });
    } else if (/\b(data engineering|lakehouse|snowflake|databricks|kafka)\b/i.test(lowerQ)) {
      pageTarget = 'DataEngineering';
      quickActions.push({ label: 'Go to Data Engineering', pageTarget: 'DataEngineering' });
    } else if (/\b(careers?|carrers?|jobs?|hiring|openings?)\b/i.test(lowerQ)) {
      pageTarget = 'Careers';
      quickActions.push({ label: 'Go to Careers Page', pageTarget: 'Careers' });
    } else if (/\b(recruiting|staffing|talent acquisition)\b/i.test(lowerQ)) {
      pageTarget = 'Recruiting';
      quickActions.push({ label: 'Go to Talent Acquisition', pageTarget: 'Recruiting' });
    } else if (/\b(insights?|blogs?|articles?|whitepapers?)\b/i.test(lowerQ)) {
      pageTarget = 'Blogs';
      quickActions.push({ label: 'Go to Insights Page', pageTarget: 'Blogs' });
    } else if (/\b(about|leadership|founder|journey|history)\b/i.test(lowerQ)) {
      pageTarget = 'About';
      quickActions.push({ label: 'Go to About Us', pageTarget: 'About' });
    } else if (/\b(contact|office|locations?|email|phone)\b/i.test(lowerQ)) {
      pageTarget = 'Contact';
      quickActions.push({ label: 'Go to Contact Page', pageTarget: 'Contact' });
    }

    if (quickActions.length === 0) {
      quickActions.push(
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Go to Insights Page', pageTarget: 'Blogs' }
      );
    }

    return sendJson(200, {
      success: true,
      text: aiText,
      pageTarget,
      quickActions,
    });
}
