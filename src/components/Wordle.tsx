import {
  store,
  setStore,
  handleLetter,
  handleBackspace,
  handleEnter,
} from "~/store";

import { For, Show, createEffect, onMount, onCleanup } from "solid-js";
import Keyboard from "~/components/Keyboard";
import Attempt from "~/components/Attempt";
import Toast from "~/components/Toast";
import Stats from "./Stats";

import { Presence } from "solid-motionone";

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
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  createEffect(() => {
    console.log(store.word);
  });

  return (
    <main class="p-4">
      <h2 class="text-center mx-auto text-gray-700 text-xl">Wordle</h2>
      <div class="w-full flex justify-center pb-4">
        <div class="inline-grid grid-rows-6 gap-2 p-2">
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
      <Stats />
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
