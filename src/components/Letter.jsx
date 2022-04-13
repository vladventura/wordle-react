import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/gameContext";

function Letter({ letterPosition, attemptValue }) {
  const [disabled, setDisabled] = useState(false);
  const [letterState, setLetterState] = useState("");
  const ctx = useContext(GameContext);
  const { board, attempt, boardColors } = ctx.game;
  const { disableLetter } = ctx;
  const letter = board[attemptValue][letterPosition];

  const shouldColor = attemptValue < attempt;

  useEffect(() => {
    if (letterState === "error" && !disabled) {
      disableLetter(letter);
      setDisabled(true);
    }
  }, [letterState, disabled, disableLetter, letter]);

  useEffect(() => {
    if (shouldColor) setLetterState(boardColors[attemptValue][letterPosition]);
  }, [shouldColor, boardColors, attempt, letterPosition, attemptValue]);

  return <div className={`letter ${letterState}`}>{letter}</div>;
}

export default Letter;
