const axios = require('axios');

const FIRECRAWL_BASE = 'https://api.firecrawl.dev/v1';

async function searchQuestions({ interviewType, company, role, difficulty = 'hardest' }) {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  const queries = [
    // Glassdoor — real interview reports
    `${difficulty} ${company} ${role} interview questions site:glassdoor.com`,

    // Reddit — honest brutally-detailed threads
    `${company} ${role} interview questions experience site:reddit.com`,

    // Blind / TeamBlind — insider candid posts
    `${company} ${role} interview questions site:teamblind.com`,

    // X / Twitter — real-time interview experiences
    `${company} ${role} interview questions experience site:x.com OR site:twitter.com`,

    // Quora — detailed Q&A answer threads
    `hardest ${company} ${role} interview questions site:quora.com`,

    // Levels.fyi — compensation + interview intel
    `${company} ${role} interview questions site:levels.fyi`,

    // Hacker News — technical / startup interview threads
    `${company} ${role} interview questions site:news.ycombinator.com`,

    // LinkedIn — professional posts sharing interview experiences
    `${company} ${role} interview questions experience site:linkedin.com`,

    // Indeed — candidate interview reviews
    `${company} ${role} interview questions site:indeed.com`,

    // CareerCup — curated interview question database
    `${company} ${role} interview questions site:careercup.com`,
  ];

  const results = [];

  // Run all queries in parallel for speed
  const settled = await Promise.allSettled(
    queries.map((query) =>
      axios.post(
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
      )
    )
  );

  for (let i = 0; i < settled.length; i++) {
    const result = settled[i];
    if (result.status === 'fulfilled') {
      const data = result.value.data?.data || result.value.data?.results || [];
      for (const item of data) {
        results.push({
          source: item.url || '',
          title: item.title || '',
          platform: detectPlatform(item.url || ''),
          content: (item.markdown || item.description || '').slice(0, 2000),
        });
      }
    } else {
      console.error(`Firecrawl query failed: ${queries[i]}`, result.reason?.message);
    }
  }

  // Deduplicate by URL
  const seen = new Set();
  const unique = results.filter((r) => {
    if (seen.has(r.source)) return false;
    seen.add(r.source);
    return true;
  });

  // If too few results and we searched with a company, retry with just role
  if (unique.length < 5 && company && company !== 'top tech companies') {
    console.log(`[firecrawl] Only ${unique.length} results for "${company} ${role}" — retrying with role only`);
    const fallback = await searchQuestions({ interviewType, company: '', role, difficulty });
    for (const r of fallback) {
      if (!seen.has(r.source)) {
        seen.add(r.source);
        unique.push(r);
      }
    }
  }

  return unique;
}

function detectPlatform(url) {
  if (url.includes('glassdoor')) return 'Glassdoor';
  if (url.includes('reddit')) return 'Reddit';
  if (url.includes('teamblind') || url.includes('blind')) return 'Blind';
  if (url.includes('x.com') || url.includes('twitter')) return 'X (Twitter)';
  if (url.includes('quora')) return 'Quora';
  if (url.includes('levels.fyi')) return 'Levels.fyi';
  if (url.includes('ycombinator')) return 'Hacker News';
  if (url.includes('linkedin')) return 'LinkedIn';
  if (url.includes('indeed')) return 'Indeed';
  if (url.includes('careercup')) return 'CareerCup';
  return 'Web';
}

async function searchFollowup({ topic }) {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  const queries = [
    `best answer to "${topic}" interview question site:reddit.com`,
    `how to answer "${topic}" interview question site:quora.com`,
    `"${topic}" interview answer example site:glassdoor.com`,
  ];

  const settled = await Promise.allSettled(
    queries.map((query) =>
      axios.post(
        `${FIRECRAWL_BASE}/search`,
        {
          query,
          limit: 2,
          scrapeOptions: { formats: ['markdown'] },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 20000,
        }
      )
    )
  );

  const parts = [];
  for (const result of settled) {
    if (result.status === 'fulfilled') {
      const data = result.value.data?.data || result.value.data?.results || [];
      for (const r of data) {
        const text = (r.markdown || r.description || '').slice(0, 800);
        if (text) parts.push(text);
      }
    }
  }

  return parts.join('\n\n').slice(0, 4000);
}

module.exports = { searchQuestions, searchFollowup };
