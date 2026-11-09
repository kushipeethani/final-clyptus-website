import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleChatRequest } from '../server/handlers/chatHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleChatRequest(req, res);
}
