import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleContactRequest } from '../backend/handlers/contactHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleContactRequest(req, res);
}
