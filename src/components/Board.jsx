import React, { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import Letter from "./Letter";

let buffer = [];
let lastTimeKey = Date.now();

const keyStrokeDelay = 1000;

const codeList = ['ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA', 'Enter'
];

const arrCompare = (ar1 = [], ar2 = []) => {
  return ar1.length === ar2.length && ar1.every((el, idx) => el === ar2[idx]);
}

function Board() {
  const ctx = useContext(GameContext);
  const { board, wordSet, correctWord } = ctx.game;
  const { loadWordSet } = ctx;

  const konamiCodeListener = useCallback((kEvent) => {
    const code = kEvent.code;
    const currentTime = Date.now();
    if (currentTime - lastTimeKey > keyStrokeDelay) buffer = [];
    lastTimeKey = currentTime;
    if (codeList.indexOf(code) === -1) return;
    buffer.push(code);
    if (arrCompare(buffer, codeList)) alert(`KONAMI CODE DETECTED: ${correctWord}`);
  }, [correctWord]);
  
  useEffect(() => {
    document.addEventListener('keydown', konamiCodeListener);
    return () => document.removeEventListener('keydown', konamiCodeListener);
  }, [konamiCodeListener]);

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
