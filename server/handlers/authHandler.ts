import type { IncomingMessage, ServerResponse } from 'http';
import {
  verifyUserCredentials,
  checkLoginRateLimit,
  resetLoginRateLimit,
  createSessionToken,
  serializeSessionCookie,
  serializeClearSessionCookie,
  extractSessionFromRequest,
} from '../auth.ts';

export async function handleAuthRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = req.url || '';
  const method = req.method || 'GET';
  const isSecure = req.headers['x-forwarded-proto'] === 'https';
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  // Helper to send JSON
  const sendJson = (status: number, data: any, headers?: Record<string, string | string[]>) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      ...(headers || {}),
    });
    res.end(JSON.stringify(data));
  };

  // Helper to read JSON body
  const readJsonBody = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 50000) {
          reject(new Error('Payload too large'));
        }
      });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          reject(new Error('Invalid JSON'));
        }
      });
      req.on('error', reject);
    });
  };

  // Route 1: POST /api/auth/login
  if (method === 'POST' && url.includes('/login')) {
    // Check rate limit
    const rateCheck = checkLoginRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return sendJson(429, {
        success: false,
        error: `Too many login attempts. Please try again in ${rateCheck.retryAfterSeconds || 60} seconds.`,
      });
    }

    let body: any;
    try {
      body = await readJsonBody();
    } catch {
      return sendJson(400, { success: false, error: 'Malformed request body.' });
    }

    const { username, password } = body;
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

    // Reset rate limit upon successful login
    resetLoginRateLimit(clientIp);

    const token = createSessionToken(username.trim(), result.role);
    const cookieHeader = serializeSessionCookie(token, isSecure);

    return sendJson(
      200,
      {
        success: true,
        user: { username: username.trim(), role: result.role },
        token, // Also returned in case client stores token for Bearer headers
      },
      { 'Set-Cookie': cookieHeader }
    );
  }

  // Route 2: GET /api/auth/session
  if (method === 'GET' && url.includes('/session')) {
    const session = extractSessionFromRequest(req.headers.cookie, req.headers.authorization);
    if (!session) {
      return sendJson(200, { authenticated: false });
    }

    return sendJson(200, {
      authenticated: true,
      user: { username: session.username, role: session.role },
    });
  }

  // Route 3: POST /api/auth/logout
  if (method === 'POST' && url.includes('/logout')) {
    const clearCookie = serializeClearSessionCookie(isSecure);
    return sendJson(200, { success: true }, { 'Set-Cookie': clearCookie });
  }

  return sendJson(404, { success: false, error: 'Auth endpoint not found.' });
}
