const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

// Load environment variables
dotenv.config();

const API_KEY = process.env.CHAT_GPT_API_KEY;
const PORT = 8000;

// Create an instance of Express app
const app = express();

// Enable CORS middleware and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Define an endpoint for handling POST requests to /completions
app.post("/completions", async (req, res) => {
  // Prepare options for the request to OpenAI's API
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`, // Pass in the API key in the Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }], // Sample input message
      max_tokens: 100,
    }),
  };

  try {
    // Send the request to OpenAI's API
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json(); // Parse the JSON response
    res.send(data); // Send the response back to the client
  } catch (error) {
    console.error(error); // Log any errors
  }
});

// Respond with Hello World! on the homepage:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server and listen for incoming requests
app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
