const express = require('express');
const axios = require('axios'); // 确保已经安装axios
const router = express.Router();

router.post('/ask', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: req.body.prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Detailed error:', error);  // 打印详细的错误信息
        res.status(500).json({ error: 'Error calling ChatGPT API' });
    }
});

module.exports = router;
