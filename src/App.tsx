import { useState, useEffect, SetStateAction } from "react";

interface Chat {
  content: string;
  role: string;
  title: string;
}

// main app
function App(): JSX.Element {
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [message, setMessage] = useState<{ role: string; content: string }>({
    role: "",
    content: "",
  });
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  const [value, setValue] = useState<string>("");

  function createNewChat(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setMessage({ role: "", content: "" });
    setValue("");
    setCurrentTitle("");
  }

  function handleClick(uniqueTitle: SetStateAction<string>): void {
    setCurrentTitle(uniqueTitle);
    setMessage({ role: "", content: "" });
    setValue("");
  }

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

  // console.log(previousChats);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>
            Created by{" "}
            <a href="https://github.com/milliorn" target="_blank">
              Scott Milliorn
            </a>
          </p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ChatGPT-Clone</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role.toUpperCase()}:</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>

        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessage}>
              +{" "}
            </div>
          </div>
          <p className="info">
            ChatGPT-Clone may produce inaccurate information about people,
            places, or facts.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
