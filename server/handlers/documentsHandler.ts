import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { extractSessionFromRequest } from '../auth.ts';

// Strict mapping of allowed policy IDs to protected PDF filenames
const POLICY_FILE_MAP: Record<string, { fileName: string; title: string }> = {
  'code-of-conduct': {
    fileName: 'Code of Conduct.pdf',
    title: 'Clyptus Code of Conduct',
  },
  'disciplinary-policy': {
    fileName: 'Disciplinary Policy.pdf',
    title: 'Clyptus Disciplinary Policy',
  },
  'employee-benefits': {
    fileName: 'Employee benefits policy.pdf',
    title: 'Clyptus Employee Benefits Policy',
  },
  'leave-policy': {
    fileName: 'Leave, Maternity, Paternity Policy.pdf',
    title: 'Clyptus Leave, Maternity & Paternity Policy',
  },
  'grievance-policy': {
    fileName: 'Grievance Redressal Policy.pdf',
    title: 'Clyptus Grievance Redressal Policy',
  },
  'employee-handbook': {
    fileName: 'Clyptus Employee Handbook.pdf',
    title: 'Clyptus Employee Handbook',
  },
  'maternity-leave-policy': {
    fileName: 'Leave, Maternity, Paternity Policy.pdf',
    title: 'Clyptus Maternity Leave Policy',
  },
  'posh-policy': {
    fileName: 'Clyptus_POSH.pdf',
    title: 'Clyptus POSH Policy',
  },
  'data-privacy-policy': {
    fileName: 'Clyptus_Data_Privacy_Policy.pdf',
    title: 'Clyptus Data Privacy Policy',
  },
  'rejoin-policy': {
    fileName: 'Rejoin Policy.pdf',
    title: 'Clyptus Rejoin Policy',
  },
  // Audit-specific aliases mapped to verified documents
  'audit-code-of-conduct': {
    fileName: 'Code of Conduct.pdf',
    title: 'Audit: Code of Conduct',
  },
  'audit-disciplinary-policy': {
    fileName: 'Disciplinary Policy.pdf',
    title: 'Audit: Disciplinary Policy',
  },
  'audit-employee-benefits': {
    fileName: 'Employee benefits policy.pdf',
    title: 'Audit: Employee Benefits',
  },
  'audit-leave-policy': {
    fileName: 'Leave, Maternity, Paternity Policy.pdf',
    title: 'Audit: Leave Policy',
  },
  'audit-grievance-policy': {
    fileName: 'Grievance Redressal Policy.pdf',
    title: 'Audit: Grievance Redressal Policy',
  },
  'audit-employee-handbook': {
    fileName: 'Clyptus Employee Handbook.pdf',
    title: 'Audit: Employee Handbook',
  },
  'audit-maternity-leave-policy': {
    fileName: 'Leave, Maternity, Paternity Policy.pdf',
    title: 'Audit: Maternity Leave Policy',
  },
  'audit-posh-policy': {
    fileName: 'Clyptus_POSH.pdf',
    title: 'Audit: POSH Policy',
  },
  'audit-data-privacy-policy': {
    fileName: 'Clyptus_Data_Privacy_Policy.pdf',
    title: 'Audit: Data Privacy Policy',
  },
  'audit-rejoin-policy': {
    fileName: 'Rejoin Policy.pdf',
    title: 'Audit: Rejoin Policy',
  },
};

export async function handleDocumentsRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = req.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // 1. Authorize user session
  const session = extractSessionFromRequest(req.headers.cookie, req.headers.authorization);
  if (!session) {
    res.writeHead(401, {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(
      JSON.stringify({
        error: 'Unauthorized: Authentication required to access confidential Clyptus HR policies.',
      })
    );
    return;
  }

  // 2. Extract requested document ID from query string
  const urlObj = new URL(req.url || '', 'http://localhost');
  const docId = urlObj.searchParams.get('id');

  if (!docId || !POLICY_FILE_MAP[docId]) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(JSON.stringify({ error: 'Document not found or access restricted.' }));
    return;
  }

  const policy = POLICY_FILE_MAP[docId];

  // Resolve file safely inside server/protected-documents
  const protectedDir = path.resolve(process.cwd(), 'server', 'protected-documents');
  const filePath = path.resolve(protectedDir, policy.fileName);

  // Strict path traversal defense: ensure resolved path is inside protectedDir
  if (!filePath.startsWith(protectedDir)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Access forbidden: Invalid path.' }));
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Document file not found on server.' }));
    return;
  }

  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size,
    'Content-Disposition': `inline; filename="${policy.fileName}"`,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  });

  if (method === 'HEAD') {
    res.end();
    return;
  }

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}
