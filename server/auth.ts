import crypto from 'crypto';

export interface UserSession {
  username: string;
  role: 'clyptus' | 'audit';
  iat: number;
  exp: number;
}

// In-memory rate limiting map for login attempts: IP -> { count, firstAttempt }
const loginRateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_LOGIN_ATTEMPTS = 5;

// Secret used for HMAC session cookie signing.
// In production, configure SESSION_SECRET environment variable.
const SESSION_SECRET = process.env.SESSION_SECRET || 'clyptus_secure_production_hmac_secret_2026_xyz987';

/**
 * Hash a password using PBKDF2-HMAC-SHA512 with 100,000 iterations.
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

/**
 * Constant-time string comparison to defend against timing attacks.
 */
export function safeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Default cryptographic salts and hashes for the standard accounts.
// System administrators can override these at any time via environment variables:
// - AUTH_CLYPTUS_HASH & AUTH_CLYPTUS_SALT
// - AUTH_AUDIT_HASH & AUTH_AUDIT_SALT
const DEFAULT_CLYPTUS_SALT = 'e48a1c93f0b24982bb7d48386cfb9401';
const DEFAULT_CLYPTUS_HASH = '105a07bb531a501cfaf5650afa9818d1fb31652e39a6bd3e7118f2dc1e27ef3cc7f12f4e4668dece32578ed5c86904196d7b7837e8f81e1a453e4553cb1f37c4';

const DEFAULT_AUDIT_SALT = '78a9c2014b29f79883d6a2f81498b04a';
const DEFAULT_AUDIT_HASH = 'c318eeba340daebda9db8802fdca354a997dee397d68ece84c490d75dc5f8827e0a52cc899a5fe3fe54eee9c5fe04602e8ec28b4a882afd6a04a29697859b2a0';

/**
 * Verify credentials against environment variables or cryptographically hashed defaults.
 */
export function verifyUserCredentials(username: string, pass: string): { verified: boolean; role?: 'clyptus' | 'audit' } {
  const normUser = username.trim().toLowerCase();

  if (normUser === 'clyptus') {
    const salt = process.env.AUTH_CLYPTUS_SALT || DEFAULT_CLYPTUS_SALT;
    const expectedHash = process.env.AUTH_CLYPTUS_HASH || DEFAULT_CLYPTUS_HASH;
    const computedHash = hashPassword(pass, salt);

    if (safeEqual(computedHash, expectedHash)) {
      return { verified: true, role: 'clyptus' };
    }
  }

  if (normUser === 'audit') {
    const salt = process.env.AUTH_AUDIT_SALT || DEFAULT_AUDIT_SALT;
    const expectedHash = process.env.AUTH_AUDIT_HASH || DEFAULT_AUDIT_HASH;
    const computedHash = hashPassword(pass, salt);

    if (safeEqual(computedHash, expectedHash)) {
      return { verified: true, role: 'audit' };
    }
  }

  return { verified: false };
}

/**
 * Check and record login attempt rate limit by client IP.
 */
export function checkLoginRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record) {
    loginRateLimitMap.set(ip, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - 1 };
  }

  // Window expired, reset counter
  if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    loginRateLimitMap.set(ip, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - 1 };
  }

  if (record.count >= MAX_LOGIN_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.firstAttempt + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - record.count };
}

/**
 * Clear rate limit on successful authentication.
 */
export function resetLoginRateLimit(ip: string): void {
  loginRateLimitMap.delete(ip);
}

/**
 * Sign an HMAC-SHA256 session token.
 */
export function createSessionToken(username: string, role: 'clyptus' | 'audit'): string {
  const payload: UserSession = {
    username,
    role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

/**
 * Verify and decode an HMAC-SHA256 session token.
 */
export function verifySessionToken(token: string): UserSession | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('base64url');

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const session: UserSession = JSON.parse(payloadJson);

    if (Date.now() > session.exp) {
      return null; // Expired session
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Parse the 'clyptus_session' cookie or Authorization Bearer header from request.
 */
export function extractSessionFromRequest(cookieHeader?: string, authHeader?: string): UserSession | null {
  // 1. Try Authorization header
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const session = verifySessionToken(token);
    if (session) return session;
  }

  // 2. Try Cookie header
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith('clyptus_session=')) {
        const token = cookie.substring('clyptus_session='.length);
        const session = verifySessionToken(token);
        if (session) return session;
      }
    }
  }

  return null;
}

/**
 * Generate Set-Cookie header string with HttpOnly, SameSite=Lax, Path=/, and Secure.
 */
export function serializeSessionCookie(token: string, isSecure = false): string {
  const maxAge = 24 * 60 * 60; // 24 hours in seconds
  let cookie = `clyptus_session=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax`;
  if (isSecure || process.env.NODE_ENV === 'production') {
    cookie += '; Secure';
  }
  return cookie;
}

/**
 * Generate clear-cookie header to log out.
 */
export function serializeClearSessionCookie(isSecure = false): string {
  let cookie = 'clyptus_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax';
  if (isSecure || process.env.NODE_ENV === 'production') {
    cookie += '; Secure';
  }
  return cookie;
}
