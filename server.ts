import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT ?? 3001);
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanInput(value: unknown, maxLength: number) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getClientKey(req: Request) {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(req: Request) {
  const key = getClientKey(req);
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  existing.count += 1;
  return existing.count > maxRequests;
}

app.post('/api/contact', async (req: Request, res: Response) => {
  const payload = req.body as ContactPayload;

  if (payload.website) {
    return res.status(200).json({ ok: true });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  const name = cleanInput(payload.name, 80);
  const email = cleanInput(payload.email, 254).toLowerCase();
  const message = cleanInput(payload.message, 3000);

  if (name.length < 2 || !emailPattern.test(email) || message.length < 10) {
    return res.status(400).json({ error: 'Please check your name, email, and message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Missing contact mail environment variables.');
    return res.status(500).json({ error: 'Contact form is not configured yet.' });
  }

  const subject = `Portfolio message from ${name}`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #3E2C44; line-height: 1.6;">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr />
          <p>${safeMessage}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('Mail provider rejected the message:', details);
    return res.status(502).json({ error: 'Message could not be sent right now.' });
  }

  return res.status(200).json({ ok: true });
});

if (isProduction) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
