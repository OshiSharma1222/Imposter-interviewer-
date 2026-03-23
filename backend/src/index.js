const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use(limiter);

app.use('/', searchRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

if (!process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_KEY === 'fc-your-key-here') {
  console.warn('[warn] FIRECRAWL_API_KEY is not set — search endpoints will return empty results');
}

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
