require('dotenv').config();
const OpenAi = require('openai');
const { openaitoken } = require('./config.json')

const apiKey = openaitoken;
const openai = new OpenAi({
    apiKey: apiKey
});

async function generateRapBar(x) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Replace with the model you have access to, e.g., "gpt-3.5-turbo" or "text-davinci-003"
            messages: [
                    {
                    role: 'user',
                    content: `Give me a new random rap bar including the phrase ${x}`
                    }
                ],
            max_tokens: 240,
            temperature: 0.4
        });
        
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating rap bar:", error);
    }
}

module.exports = generateRapBar; // Export the function