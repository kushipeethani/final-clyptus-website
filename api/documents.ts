import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleDocumentsRequest } from '../backend/handlers/documentsHandler';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleDocumentsRequest(req, res);
}
