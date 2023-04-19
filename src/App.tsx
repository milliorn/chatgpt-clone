// main app
function App(): JSX.Element {
  return (
    <div className="App">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Created by Scott Milliorn</p>
        </nav>
      </section>
      <section className="main"></section>
    </div>
  );
}

export default App;
