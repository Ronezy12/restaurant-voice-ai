import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { RestaurantAgent } from './ai/agent.js';
import { parseClientEvent } from './ws-media.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/admin', express.static(path.join(__dirname, 'ai/db/web')));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'restaurant-voice-ai' });
});

app.get('/', (_req, res) => {
  res.type('text/plain').send('Restaurant Voice AI running');
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (socket) => {
  const agent = new RestaurantAgent();
  socket.send(JSON.stringify({ role: 'assistant', text: agent.respond('') }));

  socket.on('message', (payload) => {
    const parsed = parseClientEvent(payload);
    if (!parsed.ok) {
      socket.send(JSON.stringify({ role: 'system', error: parsed.error }));
      return;
    }

    const reply = agent.respond(parsed.text);
    socket.send(JSON.stringify({ role: 'assistant', text: reply }));
  });
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
