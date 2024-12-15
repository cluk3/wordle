import { createEffect, createMemo, createSignal, For } from "solid-js";
import { buildHint, cn } from "~/utils";
import { handleLetter, handleBackspace, handleEnter, store } from "~/store";
import type { Component, ParentComponent } from "solid-js";
import type { Hint } from "~/utils";

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];
const buttonStyle = [
  "flex flex-[1_1_42px] text-lg text-slate-800 items-center justify-center px-2 py-3 rounded uppercase",
  "font-semibold select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400",
  "outline-transparent focus-visible:outline-purple-600 focus-visible:shadow-md focus-visible:shadow-purple-600",
  "disabled:bg-slate-200 disabled:hover:bg-slate-200 disabled:active:bg-slate-200 disabled:text-slate-400",
].join(" ");

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
      class={cn(
        buttonStyle,
        goGuess() &&
          "bg-slate-600 text-white disabled:bg-slate-400 disabled:hover:bg-slate-400 disabled:active:bg-slate-400 disabled:text-slate-50",
        goGreen() &&
          "bg-green-400 text-white hover:bg-green-500 active:bg-green-600 disabled:bg-green-300 disabled:hover:bg-green-300 disabled:active:bg-green-300 disabled:text-slate-50"
      )}
      onClick={() => handleLetter(props.children as string)}
      disabled={
        store.gameFinished ||
        store.attempts[store.currentAttempt]?.at(-1) !== ""
      }
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
    <div class="flex flex-col gap-3 max-w-[640px] mx-auto">
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
          class={cn(buttonStyle, "flex-[1_1_96px] text-[12px] font-mono")}
          onClick={handleEnter}
          disabled={store.gameFinished}
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
          class={cn(buttonStyle, "flex-[1_1_96px] text-xl")}
          onClick={handleBackspace}
          disabled={store.gameFinished}
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
