import { createStore, produce } from "solid-js/store";
import { guessableWords, allWords } from "~/dictionary";
import { makePersisted } from "@solid-primitives/storage";

const greeting = [
  "Genius!",
  "Magnificient",
  "Incredible",
  "Splendind",
  "Great",
  "Good",
];

console.log(guessableWords.length);

const initialState = () => ({
  currentAttempt: 0,
  toast: "",
  currentLetter: 0,
  gameFinished: false,
  animateWrong: false,
  gameWon: false,
  word: guessableWords[Math.floor(Math.random() * guessableWords.length)],
  attempts: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  stats: [] as number[],
});

export const [store, setStore] = makePersisted(createStore(initialState()), {
  name: "wordle",
});

export const setToast = (text: string, duration = 2000) => {
  setStore({
    ...store,
    toast: text,
  });
  setTimeout(() => {
    setStore({
      ...store,
      toast: "",
    });
  }, duration);
};

export const restartGame = () => {
  setStore({
    ...initialState(),
    stats: store.stats,
  });
};

export const handleLetter = (letter: string) => {
  if (!store.gameFinished && store.currentLetter < 5) {
    setStore(
      produce((state) => {
        state.attempts[state.currentAttempt][state.currentLetter] = letter;
        state.currentLetter++;
      })
    );
  }
};

export const handleBackspace = () => {
  if (!store.gameFinished && store.currentLetter > 0) {
    setStore(
      produce((state) => {
        state.currentLetter--;
        state.attempts[state.currentAttempt][state.currentLetter] = "";
      })
    );
  }
};

export const handleEnter = () => {
  if (!store.gameFinished && store.currentLetter === 5) {
    setStore(
      produce((state) => {
        const attempt = state.attempts[state.currentAttempt].join("");

        if (state.word === attempt) {
          state.gameFinished = true;
          state.gameWon = true;
          setTimeout(() => {
            setToast(greeting[state.currentAttempt], 3000);
          }, 2000);
          state.stats.push(state.currentAttempt + 1);
          state.currentAttempt++;
          state.currentLetter = 0;
        } else if (!allWords.includes(attempt)) {
          setToast("Not in word list");
          state.animateWrong = true;
        } else if (state.currentAttempt > 4) {
          state.gameFinished = true;
          state.currentAttempt++;
          state.currentLetter = 0;
          setToast(state.word);
          state.stats.push(state.currentAttempt + 1);
        } else {
          state.currentAttempt++;
          state.currentLetter = 0;
        }
      })
    );
  } else {
    setToast("Not enough letters", 1500);
    setStore({
      ...store,
      animateWrong: true,
    });
  }
};
