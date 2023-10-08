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
        res.status(500).json({ error: 'Error fetching ChatGPT suggestions' });
    }
});

module.exports = router;
