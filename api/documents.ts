import type { IncomingMessage, ServerResponse } from 'http';
import { handleDocumentsRequest } from '../server/handlers/documentsHandler.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleDocumentsRequest(req, res);
}
