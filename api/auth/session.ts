import type { IncomingMessage, ServerResponse } from 'http';
import { handleAuthRequest } from '../../server/handlers/authHandler.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!req.url || req.url === '/' || !req.url.includes('/session')) {
    req.url = '/api/auth/session';
  }
  return handleAuthRequest(req, res);
}
