import { useContext } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./context/themeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <div className="game">
        <Board />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
