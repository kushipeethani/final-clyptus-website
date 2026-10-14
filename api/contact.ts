import type { IncomingMessage, ServerResponse } from 'http';
import { handleContactRequest } from '../server/handlers/contactHandler.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleContactRequest(req, res);
}
