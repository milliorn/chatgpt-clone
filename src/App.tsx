// main app
function App(): JSX.Element {
  async function getMessage(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "Hello!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

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
            <input type="text" />
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
