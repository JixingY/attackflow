// chatgpt.mjs

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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',
});

export async function getChatGPTSuggestions(prompt) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching ChatGPT suggestions:", error);
        throw error;
    }
}
