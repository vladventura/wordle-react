import React, { useContext } from "react";
import { GameContext } from "../context/gameContext";

function Key({ character, enterKey, deleteKey, disabled }) {
  const { keyPressed, enterPressed, deletePressed } = useContext(GameContext);
  const selectLetter = () => {
    if (enterKey) {
      enterPressed();
    } else if (deleteKey) {
      deletePressed();
    } else keyPressed(character);
  };

  return (
    <div
      className="key"
      id={enterKey || deleteKey ? "big" : disabled ? "disabled" : ""}
      onClick={selectLetter}
    >
      {character}
    </div>
  );
}

export default Key;
