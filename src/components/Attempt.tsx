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
          const [go, setGo] = createSignal(false);
          const [hint, setHint] = createSignal({
            letter,
            inWord: false,
            inPosition: false,
          });

          createEffect(() => {
            if (!props.isDraft) {
              setTimeout(
                () => setGo(true),
                props.isLastAttempt ? index() * 400 + 200 : 0
              );
            }
          });

          createEffect(() => {
            if (!props.isDraft) {
              setHint(buildHint(store.word, props.attempt)[index()]);
            }
          });

          return (
            <Motion.div
              animate={
                props.isLastAttempt
                  ? {
                      scaleY: [1, 0, 1],
                      boxShadow:
                        store.gameWon || hint().inPosition
                          ? [
                              "0px 0px 0px 0px #4ade80",
                              "0px 0px 60px 12px #4ade80",
                              "0px 0px 0px 0px #4ade80",
                            ]
                          : "",
                    }
                  : undefined
              }
              transition={{
                scaleY: {
                  delay: index() * 0.4,
                  duration: 0.4,
                  easing: "linear",
                },
                boxShadow: {
                  delay: 2,
                  duration: 1,
                  easing: "ease-in-out",
                },
              }}
            >
              <Motion.div
                class="size-14 flex items-center justify-center text-4xl font-bold uppercase select-none"
                classList={{
                  "bg-slate-400":
                    go() &&
                    !props.isDraft &&
                    !hint().inWord &&
                    !hint().inPosition,
                  "bg-yellow-400": go() && !props.isDraft && hint().inWord,
                  "bg-green-400": go() && !props.isDraft && hint().inPosition,
                  "text-white": go() && !props.isDraft,
                  border: props.isDraft || !go(),
                  "border-slate-400": !hint().letter,
                  "border-slate-800": !!hint().letter,
                }}
                animate={hint().letter ? { scale: [1.2, 1] } : undefined}
              >
                {hint().letter}
              </Motion.div>
            </Motion.div>
          );
        }}
      </For>
    </Motion.div>
  );
};

export default Attempt;
