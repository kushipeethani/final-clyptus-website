import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleLoginRequest } from '../../server/handlers/authHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleLoginRequest(req, res);
}
