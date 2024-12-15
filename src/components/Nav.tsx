import { useNavigate } from "@solidjs/router";
import { restartGame, setShowStats, store } from "~/store";
import Revealed from "./Revealed";
import { ImStatsBars2 } from "solid-icons/im";
import { ImPlus } from "solid-icons/im";
import { Button } from "./ui/button";
import { encodeWord } from "~/utils";

export default function Nav() {
  let ref;
  const navigate = useNavigate();
  return (
    <nav class="px-4 border-b-4 h-16 border-amber-300">
      <div class="grid grid-rows-1 grid-cols-[1fr,260px,1fr] h-full max-w-[640px] mx-auto">
        <div class={`grid justify-center md:justify-start place-items-center`}>
          <Button
            ref={ref}
            onClick={() => {
              restartGame();
              ref && ref.blur();
              navigate(`/?w=${encodeWord(store.word)}`);
            }}
            variant="secondary"
            class="group text-amber-500 shadow-drop-golden flex-1 flex gap-2"
          >
            <ImPlus class="size-4 md:size-3 group-active:scale-125 md:group-hover:scale-125 transition-transform" />

            <span class="sr-only md:not-sr-only md:text-lg font-semibold">
              New Game
            </span>
          </Button>
        </div>
        <div class="grid justify-center w-full place-items-center h-full col-start-2">
          <Revealed letters="WORDLE" delay={0} />
        </div>
        <div class={`grid justify-center md:justify-end place-items-center`}>
          <button onClick={() => setShowStats(!store.showStats)}>
            <ImStatsBars2 class="text-amber-500 size-6 md:size-8 active:scale-125 md:hover:scale-125 transition-transform shadow-drop-golden" />
          </button>
        </div>
      </div>
    </nav>
  );
}
