export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  return fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
    .then((res) => res.text())
    .then((result) => {
      const wordArray = result.split("\n");
      const trimmed = wordArray.map((w) => w.trim());
      let set = new Set(trimmed);
      return set;
    });
};

// https://codereview.stackexchange.com/a/274334
const COLOR_CORRECT_SPOT = "correct";
const COLOR_WRONG_SPOT = "almost";
const COLOR_NOT_ANY_SPOT = "error";

function guessColor(guess, word, index) {
  // correct (matched) index letter
  if (guess[index] === word[index]) {
    return COLOR_CORRECT_SPOT;
  }
  let wrongWord = 0;
  let wrongGuess = 0;
  for (let i = 0; i < word.length; i++) {
    // count the wrong (unmatched) letters
    if (word[i] === guess[index] && guess[i] !== guess[index]) {
      wrongWord++;
    }
    if (i <= index) {
      if (guess[i] === guess[index] && word[i] !== guess[index]) {
        wrongGuess++;
      }
    }
    if (i >= index) {
      if (wrongGuess === 0) {
        break;
      }
      if (wrongGuess <= wrongWord) {
        return COLOR_WRONG_SPOT;
      }
    }
  }
  return COLOR_NOT_ANY_SPOT;
}

export const getAttemptColoring = (guess, correct) => {
  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(guessColor(guess.toLowerCase(), correct.toLowerCase(), i));
  }
  return colors;
};
