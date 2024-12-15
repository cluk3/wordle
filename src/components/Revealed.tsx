import { Index } from "solid-js";
import { Motion } from "solid-motionone";
import type { Component } from "solid-js";
import { cn } from "~/utils";

const Revealed: Component<{
  letters: string;
  repeat?: boolean;
  delay?: number;
  letterClass?: string;
}> = (props) => {
  const count = props.letters.length;
  return (
    <div class="flex gap-1">
      <Index each={props.letters.split("")}>
        {(letter, index) => {
          const scaleArr = Array.from({ length: count * 2 + 2 }, (_, i) =>
            (index + 1) * 2 !== i ? 1 : 0
          );
          return (
            <Motion.div
              animate={{
                scaleY: scaleArr,
              }}
              transition={{
                duration: 0.4 * count,
                easing: "linear",
                repeat: props.repeat ? Infinity : 0,
                delay: props.delay || 0,
              }}
            >
              <div
                class={cn(
                  "size-10  bg-green-300 border border-lime-700 text-white flex items-center justify-center text-xl font-bold uppercase select-none",
                  props.letterClass
                )}
              >
                {letter()}
              </div>
            </Motion.div>
          );
        }}
      </Index>
    </div>
  );
};

export default Revealed;
