const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }));

// Fallback: if body is a raw string that looks like JSON, parse it
app.use((req, _res, next) => {
  if (typeof req.body === 'string') {
    try { req.body = JSON.parse(req.body); } catch (_) { /* keep as-is */ }
  }
  next();
});

const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use(limiter);

app.use('/', searchRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Debug: echo back exactly what ElevenLabs sends
app.all('/debug', (req, res) => {
  res.json({
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query,
    rawBody: typeof req.body === 'string' ? req.body : null,
  });
});

if (!process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_KEY === 'fc-your-key-here') {
  console.warn('[warn] FIRECRAWL_API_KEY is not set — search endpoints will return empty results');
}

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
