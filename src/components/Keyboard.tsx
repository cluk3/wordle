import { createEffect, createMemo, createSignal, For } from "solid-js";
import { buildHint } from "~/utils";
import { handleLetter, handleBackspace, handleEnter, store } from "~/store";
import type { Component, ParentComponent } from "solid-js";
import type { Hint } from "~/utils";

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

const KeyButton: ParentComponent<{
  hasBeenGuessed: boolean;
  isYellow: boolean;
  isGreen: boolean;
}> = (props) => {
  const [goGuess, setGoGuess] = createSignal(false);
  const [goGreen, setGoGreen] = createSignal(false);
  const [goYellow, setGoYellow] = createSignal(false);

  createEffect(() => {
    if (!store.gameFinished) {
      setGoGuess(false);
      setGoGreen(false);
      setGoYellow(false);
    }
  });

  createEffect(() => {
    if (props.hasBeenGuessed && !props.isYellow && !props.isGreen)
      setTimeout(() => setGoGuess(true), 2000);
    else setGoGuess(false);
  });
  createEffect(() => {
    if (props.isYellow && !props.isGreen)
      setTimeout(() => {
        setGoYellow(true);
        setGoGuess(false);
      }, 2000);
  });
  createEffect(() => {
    if (props.isGreen)
      setTimeout(() => {
        setGoGreen(true);
        setGoGuess(false);
        setGoYellow(false);
      }, 2000);
  });

  return (
    <button
      class={
        "flex flex-[0_1_42px] item-center justify-center px-2 py-3 rounded uppercase font-semibold select-none border-2 hover:border-gray-300 active:bg-gray-300"
      }
      classList={{
        "bg-gray-600": goGuess(),
        "bg-yellow-400": goYellow(),
        "bg-green-400": goGreen(),
        "text-white": goGuess() || goYellow() || goGreen(),
        "bg-gray-200": !goGuess() && !goYellow() && !goGreen(),
      }}
      onClick={() => handleLetter(props.children as string)}
    >
      {props.children}
    </button>
  );
};

const Keyboard: Component = () => {
  const attempts = createMemo(() =>
    store.attempts.slice(0, store.currentAttempt)
  );
  const hints = createMemo(() => {
    return attempts().map((attempt) => buildHint(store.word, attempt));
  });

  return (
    <div class="flex flex-col gap-3 max-w-[460px] mx-auto">
      <div class="flex gap-1 justify-center">
        <For each={firstRow}>
          {(item) => {
            return (
              <KeyButton
                hasBeenGuessed={hasBeenGuessed(attempts(), item)}
                isYellow={isYellow(hints(), item)}
                isGreen={isGreen(hints(), item)}
              >
                {item}
              </KeyButton>
            );
          }}
        </For>
      </div>
      <div class="flex gap-1 justify-center">
        <For each={secondRow}>
          {(item) => {
            return (
              <KeyButton
                hasBeenGuessed={hasBeenGuessed(attempts(), item)}
                isYellow={isYellow(hints(), item)}
                isGreen={isGreen(hints(), item)}
              >
                {item}
              </KeyButton>
            );
          }}
        </For>
      </div>
      <div class="flex gap-1 justify-center">
        <button
          class={
            "flex-[0_1_96px] px-2 py-3 rounded uppercase font-semibold select-none text-[12px] bg-gray-200 font-mono border-2 hover:border-gray-300 active:bg-gray-300"
          }
          onClick={handleEnter}
        >
          enter
        </button>
        <For each={thirdRow}>
          {(item) => {
            return (
              <KeyButton
                hasBeenGuessed={hasBeenGuessed(attempts(), item)}
                isYellow={isYellow(hints(), item)}
                isGreen={isGreen(hints(), item)}
              >
                {item}
              </KeyButton>
            );
          }}
        </For>

        <button
          class={
            "flex-[0_1_96px] item-center justify-center px-2 py-3 rounded uppercase font-semibold select-none text-xl bg-gray-200 border-2 hover:border-gray-300 active:bg-gray-300"
          }
          onClick={handleBackspace}
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Keyboard;

function hasBeenGuessed(attempts: string[][], letter: string) {
  return attempts.some((attempt) => attempt.includes(letter));
}
function isYellow(hints: Hint[], letter: string) {
  return hints.some((hint) =>
    hint.some((h) => h.letter === letter && h.inWord)
  );
}
function isGreen(hints: Hint[], letter: string) {
  return hints.some((hint) =>
    hint.some((h) => h.letter === letter && h.inPosition)
  );
}
