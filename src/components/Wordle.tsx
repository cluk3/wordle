import {
  store,
  setStore,
  handleLetter,
  handleBackspace,
  handleEnter,
  restartGame,
} from "~/store";

import { For, Show, createEffect, onMount, onCleanup } from "solid-js";
import Keyboard from "~/components/Keyboard";
import Attempt from "~/components/Attempt";
import Toast from "~/components/Toast";
import Stats from "./Stats";

import { Presence } from "solid-motionone";
import { decodeWord, encodeWord } from "~/utils";

function isLetter(letter: string) {
  return letter.length === 1 && letter.match(/[a-z]/i);
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Backspace") {
    handleBackspace();
  }

  if (event.key === "Enter") {
    handleEnter();
  }

  if (
    isLetter(event.key) &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    handleLetter(event.key.toLowerCase());
  }
};

export default function Wordle() {
  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("w");
    if (myParam && myParam.length === 5) {
      const word = decodeWord(myParam);
      if (word !== store.word) {
        restartGame(word);
      }
    } else if (store.word) {
      const encoded = encodeWord(store.word);
      window.history.replaceState(null, "", `?w=${encoded}`);
    }

    console.log(encodeWord("rotor"));
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  createEffect(() => {
    console.log(store.word);
  });

  return (
    <main class="p-4 animate-in fade-in duration-1000">
      <div class="w-full flex justify-center pb-20 pt-4">
        <div class="inline-grid grid-rows-6 gap-2 p-2 ">
          <For each={store.attempts}>
            {(attempt, index) => {
              return (
                <Attempt
                  attempt={attempt}
                  isDraft={index() > store.currentAttempt - 1}
                  isLastAttempt={index() === store.currentAttempt - 1}
                  animateWrong={
                    store.animateWrong && index() === store.currentAttempt
                  }
                  resetAnimateWrong={() => {
                    setStore({
                      ...store,
                      animateWrong: false,
                    });
                  }}
                />
              );
            }}
          </For>
        </div>
      </div>
      <Keyboard />
      <Presence>
        <Show when={store.toast}>
          <Toast>{store.toast}</Toast>
        </Show>
      </Presence>
    </main>
  );
}

/*

1. create state with:
- current attempt draft
- current attempt number
2. keyboard event listner on document:
- ignore command and ctrl
- only letters, enter and del
3. on enter validate draft
- if word is not in vocabulary - notify
- game ends if n of attempts === 6 or word is guessed

*/
