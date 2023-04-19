// main app
function App(): JSX.Element {
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
            <div id="submit"> {">"}</div>
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
