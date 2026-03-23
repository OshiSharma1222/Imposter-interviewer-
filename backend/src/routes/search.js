const express = require('express');
const router = express.Router();
const { searchQuestions, searchFollowup } = require('../lib/firecrawl');

router.post('/search-questions', async (req, res) => {
  const { interview_type = '', company = '', role = '', difficulty = 'hardest' } = req.body;

  if (!company && !role && !interview_type) {
    return res.status(400).json({ error: 'Provide at least interview_type, company, or role.' });
  }

  try {
    const results = await searchQuestions({ interviewType: interview_type, company, role, difficulty });

    const combined = results
      .slice(0, 6)
      .map((r) => `Source: ${r.title}\nURL: ${r.source}\n\n${r.content}`)
      .join('\n\n---\n\n')
      .slice(0, 5000);

    return res.json({
      questions: combined,
      total_sources: results.length,
      interview_type,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Search failed.' });
  }
});

router.post('/search-followup', async (req, res) => {
  const { topic = '', user_answer_summary = '' } = req.body;

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
