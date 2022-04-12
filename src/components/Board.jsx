import React, { useContext, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import Letter from "./Letter";

function Board() {
  const ctx = useContext(GameContext);
  const { board, wordSet } = ctx.game;
  const { loadWordSet } = ctx;

  useEffect(() => {
    wordSet === null && loadWordSet();
  }, [loadWordSet, wordSet]);

  return (
    <div className="board">
      {wordSet !== null &&
        board.map((el, elIndex) => {
          return (
            <div className="row" key={`row${elIndex}`}>
              {el.map((letter, letterIndex) => (
                <Letter
                  key={`row${elIndex}-letter${letterIndex}`}
                  letterPosition={letterIndex}
                  attemptValue={elIndex}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default Board;
