import { useState, useEffect } from "react";
// main app
function App(): JSX.Element {
  const [value, setValue] = useState<string | null>(null);
  const [message, setMessage] = useState(null);

  async function getMessage(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> {
    // Define the request options
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Send the request to the server and wait for the response
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      // Parse the response data as JSON
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      // Log any errors that occur during the request
      console.error(error);
    }
  }

  console.log(value);

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>Lorem</li>
        </ul>
        <nav>
          <p>Created by Scott Milliorn</p>
        </nav>
      </section>
      <section className="main">
        <h1>ChatGPT-Clone</h1>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getMessage}>
              +{" "}
            </div>
          </div>
        </div>
        <p className="info">
          ChatGPT-Clone may produce inaccurate information about people, places,
          or facts.
        </p>
      </section>
    </div>
  );
}

export default App;
