import { useState, useEffect } from "react";

interface Chat {
  title: string;
  role: string;
  content: string;
}

// main app
function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [message, setMessage] = useState<{ role: string; content: string }>({
    role: "",
    content: "",
  });
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string>("");

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
      // console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      // Log any errors that occur during the request
      console.error(error);
    }
  }

  //  console.log(value);
  //  console.log(message);

  useEffect(() => {
    // console.log(currentTitle, value, message);

    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

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
            <input value={value} onChange={(e) => setValue(e.target.value)} />
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
