import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: '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',
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "what is the biggest country?" }],
    model: "gpt-3.5-turbo",
});

const generatedResponse = chatCompletion.choices[0].message.content;
console.log(generatedResponse);