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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis
          ipsa impedit nulla voluptatum dolorem, voluptatem molestias repellat
          ea. Nobis distinctio consequuntur ab perspiciatis quod fuga minima
          natus ea rem.
        </p>
      </section>
    </div>
  );
}

export default App;
