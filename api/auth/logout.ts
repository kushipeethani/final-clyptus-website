import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleLogoutRequest } from '../../backend/handlers/authHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleLogoutRequest(req, res);
}
