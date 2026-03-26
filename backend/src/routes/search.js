const express = require('express');
const router = express.Router();
const { searchQuestions, searchFollowup } = require('../lib/firecrawl');

// ElevenLabs may nest params under different keys — extract them robustly
function extractParams(req) {
  const body = req.body || {};
  // Try top-level, then common nested wrappers
  const params = body.parameters || body.data || body.args || body;
  // Also merge query string as fallback
  return { ...req.query, ...params };
}

router.post('/search-questions', async (req, res) => {
  console.log('[search-questions] raw body:', JSON.stringify(req.body));
  console.log('[search-questions] content-type:', req.headers['content-type']);

  const params = extractParams(req);
  const { interview_type = '', company = '', role = '', difficulty = 'hardest' } = params;

  // If agent sends empty params, fall back to a generic search
  const searchCompany = company || 'top tech companies';
  const searchRole = role || 'software engineer';
  const searchType = interview_type || 'technical';

  try {
    const results = await searchQuestions({ interviewType: searchType, company: searchCompany, role: searchRole, difficulty });

    const combined = results
      .slice(0, 10)
      .map((r) => `Platform: ${r.platform}\nSource: ${r.title}\nURL: ${r.source}\n\n${r.content}`)
      .join('\n\n---\n\n')
      .slice(0, 8000);

    const platforms = [...new Set(results.map((r) => r.platform))];

    return res.json({
      questions: combined,
      total_sources: results.length,
      platforms,
      interview_type: searchType,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Search failed.' });
  }
});

router.post('/search-followup', async (req, res) => {
  console.log('[search-followup] raw body:', JSON.stringify(req.body));
  console.log('[search-followup] content-type:', req.headers['content-type']);

  const params = extractParams(req);
  const { topic = '', user_answer_summary = '' } = params;

  if (!topic) return res.status(400).json({ error: 'topic is required.' });

  try {
    const content = await searchFollowup({ topic, userAnswerSummary: user_answer_summary });
    return res.json({ model_answers: content || 'No additional context found.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Followup search failed.' });
  }
});

module.exports = router;
