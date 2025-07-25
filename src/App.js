import logo from "./logo.svg";
import "./index.css";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
                <h1 className="text-3xl font-bold underline text-blue-500">
                    Testando Tailwind!
                </h1>
            </header>
        </div>
    );
}

export default App;
