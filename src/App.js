import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { GameProvider } from "./context/gameContext";

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <GameProvider>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </GameProvider>
    </div>
  );
}

export default App;
