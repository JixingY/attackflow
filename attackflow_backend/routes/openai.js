const express = require('express');
const axios = require('axios'); // 使用axios库进行HTTP请求
const router = express.Router();

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = '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'; 

router.post('/getChatGPTSuggestions', async (req, res) => {
  try {
    const response = await axios.post(OPENAI_API_URL, {
      prompt: req.body.text,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("OpenAI API Response:", response.data);  // 这里添加

    if (response.data.choices && response.data.choices[0] && response.data.choices[0].text) {
      res.send(response.data.choices[0].text.trim());
    } else {
      throw new Error("Unexpected response format from OpenAI API");
    }
  } catch (error) {
    console.error("Error fetching ChatGPT suggestions:", error.message);
    console.error("OpenAI API Error Response:", error.response && error.response.data);
    res.status(500).json({ error: `Error fetching ChatGPT suggestions: ${error.message}` });
  }
});

module.exports = router;
