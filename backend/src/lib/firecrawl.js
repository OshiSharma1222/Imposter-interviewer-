const axios = require('axios');

const FIRECRAWL_BASE = 'https://api.firecrawl.dev/v1';

async function searchQuestions({ interviewType, company, role, difficulty = 'hardest' }) {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  const queries = [
    `${difficulty} ${company} ${role} interview questions site:glassdoor.com`,
    `unexpected ${company} ${role} interview questions reddit`,
    `tricky ${role} interview questions ${company} blind teamblind`,
  ];

  const results = [];

  for (const query of queries) {
    try {
      const response = await axios.post(
        `${FIRECRAWL_BASE}/search`,
        {
          query,
          limit: 3,
          scrapeOptions: { formats: ['markdown'] },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 20000,
        }
      );

      const data = response.data?.data || response.data?.results || [];
      for (const item of data) {
        results.push({
          source: item.url || '',
          title: item.title || '',
          content: (item.markdown || item.description || '').slice(0, 2000),
        });
      }
    } catch (err) {
      console.error(`Firecrawl query failed for: ${query}`, err.message);
    }
  }

  return results;
}

async function searchFollowup({ topic }) {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  try {
    const response = await axios.post(
      `${FIRECRAWL_BASE}/search`,
      {
        query: `best answer to "${topic}" interview question`,
        limit: 3,
        scrapeOptions: { formats: ['markdown'] },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      }
    );

    const data = response.data?.data || response.data?.results || [];
    return data.map((r) => (r.markdown || r.description || '').slice(0, 1000)).join('\n\n');
  } catch (err) {
    console.error('Firecrawl followup failed:', err.message);
    return '';
  }
}

module.exports = { searchQuestions, searchFollowup };
