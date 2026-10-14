import type { IncomingMessage, ServerResponse } from 'http';
import { handleAuthRequest } from '../server/handlers/authHandler.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleAuthRequest(req, res);
}
