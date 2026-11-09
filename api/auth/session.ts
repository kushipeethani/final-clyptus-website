import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleSessionRequest } from '../../server/handlers/authHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleSessionRequest(req, res);
}
