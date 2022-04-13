import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App light">
      <Navbar />
      <div className="game">
        <Board />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
