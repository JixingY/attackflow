const express = require('express');
const axios = require('axios'); // 使用axios库进行HTTP请求
const router = express.Router();

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = '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'; 

router.post('/getChatGPTSuggestions', async (req, res) => {
  try {
    const gptResponse = await openai.complete({
        prompt: req.body.text,  // 确保 req.body.text 存在
        max_tokens: 150
    });
    res.send(gptResponse.data.choices[0].text.trim());
  } catch (error) {
    console.error("Error fetching ChatGPT suggestions:", error.message);
    res.status(500).json({ error: `Error fetching ChatGPT suggestions: ${error.message}` });
  }
});

module.exports = router;
