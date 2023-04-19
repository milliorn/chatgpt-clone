const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const API_KEY = process.env.CHAT_GPT_API_KEY;
const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello!" }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
