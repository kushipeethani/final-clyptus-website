import type { Plugin } from 'vite';
import { handleAuthRequest } from './handlers/authHandler';
import { handleContactRequest } from './handlers/contactHandler';
import { handleDocumentsRequest } from './handlers/documentsHandler';
import { handleChatRequest } from './handlers/chatHandler';

export function viteApiServerPlugin(): Plugin {
  return {
    name: 'vite-api-server-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        if (url.startsWith('/api/chat')) {
          handleChatRequest(req, res).catch((err) => {
            console.error('API Chat Handler Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error in chat' }));
          });
          return;
        }

        if (url.startsWith('/api/auth')) {
          handleAuthRequest(req, res).catch((err) => {
            console.error('API Auth Handler Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error in auth' }));
          });
          return;
        }

        if (url.startsWith('/api/contact')) {
          handleContactRequest(req, res).catch((err) => {
            console.error('API Contact Handler Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error in contact' }));
          });
          return;
        }

        if (url.startsWith('/api/documents')) {
          handleDocumentsRequest(req, res).catch((err) => {
            console.error('API Documents Handler Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error in documents' }));
          });
          return;
        }

        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        if (url.startsWith('/api/chat')) {
          handleChatRequest(req, res).catch(() => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          });
          return;
        }

        if (url.startsWith('/api/auth')) {
          handleAuthRequest(req, res).catch(() => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          });
          return;
        }

        if (url.startsWith('/api/contact')) {
          handleContactRequest(req, res).catch(() => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          });
          return;
        }

        if (url.startsWith('/api/documents')) {
          handleDocumentsRequest(req, res).catch(() => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          });
          return;
        }

        next();
      });
    },
  };
}
