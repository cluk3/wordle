import type { Component } from "solid-js";
import { store, restartGame, setShowStats } from "~/store";
import { createEffect, Index } from "solid-js";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";

const getDistribution = (value: number) => {
  return store.stats.filter((x) => x === value).length;
};

const Bar: Component<{
  value: number;
}> = (props) => {
  const distribution = getDistribution(props.value);

  const maxDistribution = Math.max(
    ...[
      getDistribution(1),
      getDistribution(2),
      getDistribution(3),
      getDistribution(4),
      getDistribution(5),
      getDistribution(6),
      getDistribution(7),
    ]
  );
  const width = Math.ceil((distribution / maxDistribution) * 100);
  return (
    <div
      class={`h-4 text-white text-xs flex justify-end min-w-4 px-1 ${
        props.value === store.currentAttempt && store.gameFinished
          ? "bg-green-600"
          : "bg-gray-600"
      }`}
      style={`
        width: ${width}%;
      `}
    >
      {distribution}
    </div>
  );
};

createEffect(() => {
  if (store.gameFinished) {
    setTimeout(() => {
      setShowStats(true);
    }, 2000);
  }
});

const Stats: Component<{}> = (props) => {
  return (
    <Dialog open={store.showStats} onOpenChange={setShowStats}>
      <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>Your stats</DialogHeader>
        <div class="grid grid-cols-[auto,1fr] gap-2 justify-center items-center max-w-[60%]">
          <Index each={Array(7)}>
            {(_, index) => (
              <>
                <div class="text-sm">{index === 6 ? "Lost" : index + 1}</div>
                <Bar value={index + 1} />
              </>
            )}
          </Index>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              restartGame();
              setShowStats(false);
            }}
          >
            New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Stats;
