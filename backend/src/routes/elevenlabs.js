const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/elevenlabs/session', async (req, res) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here') {
    return res.status(500).json({ error: 'ELEVENLABS_API_KEY not configured in .env' });
  }

  try {
    const response = await axios.get(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url`,
      {
        params: { agent_id: agentId },
        headers: { 'xi-api-key': apiKey },
      }
    );

    res.json({ signedUrl: response.data.signed_url });
  } catch (err) {
    const detail = err?.response?.data;
    console.error('[elevenlabs] signed URL error — status:', err?.response?.status, '| body:', JSON.stringify(detail));
    res.status(500).json({ error: typeof detail === 'string' ? detail : JSON.stringify(detail) || err.message });
  }
});

module.exports = router;
