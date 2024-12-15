import { createStore, produce } from "solid-js/store";
import { guessableWords, allWords } from "~/dictionary";
import { makePersisted } from "@solid-primitives/storage";
import { encodeWord } from "./utils";

const GREETINGS = [
  "Genius!",
  "Magnificient",
  "Incredible",
  "Splendind",
  "Great",
  "Good",
];

const generateWord = (alreadyGuessed: string[] = []) => {
  while (true) {
    const word =
      guessableWords[Math.floor(Math.random() * guessableWords.length)];
    if (!alreadyGuessed.includes(word)) return word;
  }
};

type Stats = [
  string[],
  string[],
  string[],
  string[],
  string[],
  string[],
  string[]
];

const initialState = () => ({
  currentAttempt: 0,
  toast: "",
  currentLetter: 0,
  gameFinished: false,
  animateWrong: false,
  gameWon: false,
  word: generateWord(),
  attempts: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  stats: [[], [], [], [], [], [], []] as Stats,
  showStats: false,
});

export const [store, setStore] = makePersisted(createStore(initialState()), {
  name: "wordle",
});

export const setShowStats = (showStats: boolean) =>
  setStore({ ...store, showStats });

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

export const restartGame = (word?: string) => {
  setStore({
    ...initialState(),
    word: word || generateWord(store.stats.flat()),
    stats: store.stats,
  });

  const encoded = encodeWord(store.word);
  window.history.pushState(null, "", `/?w=${encoded}`);
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

        // Word guessed
        if (state.word === attempt) {
          state.gameFinished = true;
          state.gameWon = true;
          setTimeout(() => {
            setToast(GREETINGS[state.currentAttempt - 1], 3000);
          }, 2000);
          state.currentAttempt++;
          state.currentLetter = 0;
          state.stats[state.currentAttempt - 1].push(state.word);
          setTimeout(() => {
            state.showStats = true;
          }, 4000);

          // word doesn't exist
        } else if (!allWords.includes(attempt)) {
          setToast("Not in word list");
          state.animateWrong = true;

          // all attempts are done, game lost
        } else if (state.currentAttempt > 4) {
          state.currentAttempt = state.currentAttempt + 2;
          state.currentLetter = 0;
          setToast(state.word);
          state.stats[state.currentAttempt - 1].push(state.word);
          state.gameFinished = true;

          // word not guessed, next attempt
        } else {
          state.currentAttempt++;
          state.currentLetter = 0;
        }
      })
    );
  } else if (!store.gameFinished && store.currentLetter < 5) {
    setToast("Not enough letters", 1500);
    setStore({
      ...store,
      animateWrong: true,
    });
  }
};
