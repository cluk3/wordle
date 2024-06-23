import { For, createEffect, createSignal } from "solid-js";
import { buildHint } from "~/utils";
import { Motion } from "solid-motionone";
import type { Component } from "solid-js";
import { store } from "~/store";

const Attempt: Component<{
  attempt: string[];
  isDraft: boolean;
  animateWrong: boolean;
  resetAnimateWrong: () => void;
  isLastAttempt: boolean;
}> = (props) => {
  return (
    <Motion.div
      class="grid grid-cols-5 gap-2"
      animate={
        props.animateWrong ? { x: [-3, 3, -3, 3, -3, 3, -3] } : undefined
      }
      transition={{ duration: 0.5, easing: "linear" }}
      onMotionComplete={() => props.resetAnimateWrong()}
    >
      <For each={props.attempt}>
        {(letter, index) => {
          let hint = buildHint(store.word, props.attempt)[index()];
          const [go, setGo] = createSignal(false);

          createEffect(() => {
            if (!props.isDraft) {
              setTimeout(
                () => setGo(true),
                props.isLastAttempt ? index() * 400 + 200 : 0
              );
            }
          });

          return (
            <Motion.div
              animate={props.isLastAttempt ? { scaleY: [1, 0, 1] } : undefined}
              transition={{
                delay: index() * 0.4,
                duration: 0.4,
              }}
            >
              <Motion.div
                class="size-14 flex items-center justify-center text-4xl font-bold uppercase select-none"
                classList={{
                  "bg-gray-400": go() && !props.isDraft && !hint.inWord,
                  "bg-yellow-400":
                    go() && !props.isDraft && hint.inWord && !hint.inPosition,
                  "bg-green-400": go() && !props.isDraft && hint.inPosition,
                  "text-white": go() && !props.isDraft,
                  border: props.isDraft || !go(),
                  "border-slate-400": !letter,
                  "border-slate-800": !!letter,
                }}
                animate={letter ? { scale: [1.2, 1] } : undefined}
              >
                {letter}
              </Motion.div>
            </Motion.div>
          );
        }}
      </For>
    </Motion.div>
  );
};

export default Attempt;
