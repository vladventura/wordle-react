import { createContext, useReducer } from "react";
import { boardDefault, generateWordSet, getAttemptColoring } from "../Words";

export const actions = {
  KEY_INPUT: "KEY_INPUT",
  SET_WORD: "SET_WORD",
  ENTER_PRESSED: "ENTER_PRESSED",
  DELETE_PRESSED: "DELETE_PRESSED",
  LOAD_WORDSET: "LOAD_WORDSET",
  DISABLE_LETTER: "DISABLE_LETTER",
};

const initState = {
  board: boardDefault,
  // https://stackoverflow.com/a/41815396
  boardColors: Array(6)
    .fill(null)
    .map(() => Array(5).fill("")),
  attempt: 0,
  letterPosition: 0,
  correctWord: "",
  wordSet: null,
  disabledLetters: [],
  keyPressed: (char) => {},
  enterPressed: () => {},
  deletePressed: () => {},
  loadWordSet: async () => {},
  disableLetter: (letter) => {},
};

const GameContext = createContext(initState);

const reducer = (state, action) => {
  switch (action.type) {
    case actions.KEY_INPUT:
      return {
        ...state,
        ...action.payload,
      };
    case actions.ENTER_PRESSED:
      return {
        ...state,
        attempt: action.payload.attempt,
        letterPosition: action.payload.letterPosition,
        boardColors: action.payload.boardColors,
      };
    case actions.DELETE_PRESSED:
      return {
        ...state,
        letterPosition: action.payload.letterPosition,
        board: action.payload.board,
      };
    case actions.LOAD_WORDSET:
      return {
        ...state,
        wordSet: action.payload.wordSet,
        correctWord: action.payload.correctWord
      };
    case actions.DISABLE_LETTER:
      return {
        ...state,
        disabledLetters: [...state.disabledLetters, action.payload],
      };
    default:
      return state;
  }
};

const GameProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const keyPressed = (char) => {
    const { board, attempt, letterPosition } = state;
    if (letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[attempt][letterPosition] = char;
    let newLetterPosition = letterPosition + 1;
    dispatch({
      type: actions.KEY_INPUT,
      payload: {
        board: newBoard,
        letterPosition: newLetterPosition,
      },
    });
  };

  const enterPressed = () => {
    const { letterPosition, attempt } = state;
    if (letterPosition !== 5) return;
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += state.board[state.attempt][i];
    }
    if (state.wordSet.has(currentWord.toLowerCase())) {
      const currentAttemptColoring = getAttemptColoring(
        currentWord,
        state.correctWord
      );
      const newColoring = [...state.boardColors];
      newColoring[attempt] = currentAttemptColoring;
      dispatch({
        type: actions.ENTER_PRESSED,
        payload: {
          attempt: attempt + 1,
          letterPosition: 0,
          boardColors: newColoring,
        },
      });
    } else alert("Word Invalid");
    if (currentWord === state.correctWord) {
      alert("Game ended!");
    }
  };

  const deletePressed = () => {
    const { letterPosition, attempt, board } = state;
    if (letterPosition === 0) return;
    const newBoard = [...board];
    const newLP = letterPosition - 1;
    newBoard[attempt][newLP] = "";
    dispatch({
      type: actions.DELETE_PRESSED,
      payload: {
        board: newBoard,
        letterPosition: newLP,
      },
    });
  };

  const loadWordSet = async () => {
    if (state.wordSet !== null) return;
    const wSet = await generateWordSet();
    // Get random word from here, make this twofold
    const forRand = Array.from(wSet);
    const randomWord = forRand[Math.floor(Math.random() * forRand.length)];
    dispatch({
      type: actions.LOAD_WORDSET,
      payload: {
        wordSet: wSet,
        correctWord: randomWord
      },
    });
  };

  const disableLetter = (letter) => {
    dispatch({
      type: actions.DISABLE_LETTER,
      payload: letter,
    });
  };

  return (
    <GameContext.Provider
      value={{
        game: state,
        keyPressed,
        enterPressed,
        deletePressed,
        loadWordSet,
        disableLetter,
      }}
      {...props}
    />
  );
};

export { GameProvider, GameContext };
