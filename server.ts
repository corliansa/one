// server.ts
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Ensure `req.url` is a string to satisfy TypeScript's strict type checking.
    const parsedUrl = parse(req.url ?? '', true); // Use `?? ''` to provide a default empty string if `req.url` is undefined.
    handle(req, res, parsedUrl);
  }).listen(3000, (err?: Error) => { // Modify the callback to accept an optional error argument.
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
