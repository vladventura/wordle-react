import React, { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import Key from "./Key";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

function Keyboard() {
  const ctx = useContext(GameContext);
  const { keyPressed, enterPressed, deletePressed } = ctx;
  const { disabledLetters } = ctx.game;

  const handleKeyboardInput = useCallback(
    (kEvent) => {
      if (kEvent.key === "Enter") {
        enterPressed();
      } else if (kEvent.key === "Backspace") {
        deletePressed();
      } else {
        if (
          keys1.find((k) => {
            return k.toLowerCase() === kEvent.key.toLowerCase();
          }) ||
          keys2.find((k) => {
            return k.toLowerCase() === kEvent.key.toLowerCase();
          }) ||
          keys3.find((k) => {
            return k.toLowerCase() === kEvent.key.toLowerCase();
          })
        ) {
          keyPressed(kEvent.key.toUpperCase());
        }
      }
    },
    [deletePressed, enterPressed, keyPressed]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);
    return () => document.removeEventListener("keydown", handleKeyboardInput);
  }, [handleKeyboardInput]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboardInput}>
      <div className="line1">
        {keys1.map((el) => (
          <Key
            key={el}
            character={el}
            disabled={disabledLetters.includes(el)}
          />
        ))}
      </div>
      <div className="line2">
        {keys2.map((el) => (
          <Key
            key={el}
            character={el}
            disabled={disabledLetters.includes(el)}
          />
        ))}
      </div>
      <div className="line3">
        <Key character={"Enter"} enterKey />
        {keys3.map((el) => (
          <Key
            key={el}
            character={el}
            disabled={disabledLetters.includes(el)}
          />
        ))}
        <Key character={"Delete"} deleteKey />
      </div>
    </div>
  );
}

export default Keyboard;
