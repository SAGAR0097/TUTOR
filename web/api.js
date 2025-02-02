const express = require('express');
const fetch = require('node-fetch');  
const app = express();
const PORT = 3000;


app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await openAIResponse.json();

    if (data.choices && data.choices[0]) {
      res.json({ answer: data.choices[0].message.content });
    } else {
      res.json({ answer: 'No response from OpenAI' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: 'Error occurred. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:5000`);
});
