import { useState, useEffect, SetStateAction } from "react";
import BottomSection from "./components/BottomSection";
import PageFeed from "./components/PageFeed";
import SideBar from "./components/SideBar";
import { Chat } from "./Chat";

// main app
function App(): JSX.Element {
  // stores the title of the current chat session
  const [currentTitle, setCurrentTitle] = useState<string>("");
  // stores the latest message received from the user
  const [message, setMessage] = useState<{ role: string; content: string }>({
    role: "",
    content: "",
  });
  // previousChats stores the chat history
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  // value stores the text entered by the user in the input field
  const [value, setValue] = useState<string>("");

  // resets the message, value, and currentTitle state variables
  function createNewChat(): void {
    setMessage({ role: "", content: "" });
    setValue("");
    setCurrentTitle("");
  }

  // takes in the uniqueTitle of the clicked chat as an argument and updates the currentTitle state,
  // resets the message, value states to empty strings
  function handleClick(uniqueTitle: SetStateAction<string>): void {
    setCurrentTitle(uniqueTitle);
    setMessage({ role: "", content: "" });
    setValue("");
  }

  async function getMessage(): Promise<void> {
    // Define the request options
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value, // message to be sent to the server
      }),
      headers: {
        "Content-Type": "application/json", // det request content type to JSON
      },
    };

    try {
      // send request to the server and wait for response
      const response = await fetch(
        "http://localhost:8000/completions", // The endpoint to send the request to
        options // The request options to include in the request
      );
      // Parse the response data as JSON
      const data = await response.json();
      // console.log(data);
      setMessage(data.choices[0].message); // update message state with first message choice from server response
    } catch (error) {
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

    // create a new chat entry with the user's message and the AI's response
    // then add new chat entry to the list of previous chats
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

  // currentChat contains all elements from previousChats array that have same title value as currentTitle. filter() loops previousChats and returns only elements that match condition specified in callback. currentChat contains all chat messages related to currently selected title.
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  // populate titles in side bar and remove duplicates
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  // console.log(uniqueTitles);

  return (
    <div className="app">
      <SideBar
        createNewChat={createNewChat}
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
        handleClickCallback={(event) => {
          // Define what should happen when a list item is clicked
        }}
      />

      <section className="main">
        {!currentTitle && <h1>ChatGPT-Clone</h1>}
        <PageFeed currentChat={currentChat} />

        <BottomSection
          value={value}
          setValue={setValue}
          getMessage={getMessage}
        />
      </section>
    </div>
  );
}

export default App;
