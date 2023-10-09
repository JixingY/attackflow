const express = require('express');
const axios = require('axios'); // 使用axios库进行HTTP请求
const router = express.Router();

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = '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'; 

router.post('/getChatGPTSuggestions', async (req, res) => {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            prompt: req.body.prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].text);
      } catch (error) {
        console.error("Error fetching ChatGPT suggestions:", error.message);
        res.status(500).json({ error: `Error fetching ChatGPT suggestions: ${error.message}` });
      }
});

module.exports = router;
