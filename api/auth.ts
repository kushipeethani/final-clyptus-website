import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleAuthRequest } from '../server/handlers/authHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleAuthRequest(req, res);
}
