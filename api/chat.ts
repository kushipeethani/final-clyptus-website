import type { IncomingMessage, ServerResponse } from 'http';
import { handleChatRequest } from '../server/handlers/chatHandler.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleChatRequest(req, res);
}
