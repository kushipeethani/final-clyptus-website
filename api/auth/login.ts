import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleAuthRequest } from '../../server/handlers/authHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!req.url || req.url === '/' || !req.url.includes('/login')) {
    req.url = '/api/auth/login';
  }
  return handleAuthRequest(req, res);
}
