import type { Component } from "solid-js";
import { store, restartGame, setShowStats } from "~/store";
import { Index } from "solid-js";

import { Tooltip } from "@kobalte/core/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";
import { A } from "@solidjs/router";

const getDistribution = (value: number) => {
  return store.stats[value - 1].length;
};

const Bar: Component<{
  value: number;
}> = (props) => {
  const distribution = getDistribution(props.value);

  const maxDistribution = Math.max(
    ...Array.from({ length: 7 }, (_, i) => getDistribution(i + 1))
  );
  const width = Math.ceil((distribution / maxDistribution) * 100);

  return (
    <div
      class={`h-6 text-white text-xs flex justify-end items-center min-w-1 ${
        props.value === store.currentAttempt && store.gameFinished
          ? "bg-green-600"
          : "bg-gray-600"
      }`}
      style={`
        width: ${width}%;
      `}
    >
      {distribution ? (
        <Tooltip openDelay={500} placement="top-end">
          <Tooltip.Trigger class="h-full w-full text-end pr-2">
            {distribution}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content class="tooltip__content">
              <Tooltip.Arrow />
              <p>{store.stats[props.value - 1].join(", ")}</p>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

const Stats: Component<{}> = (props) => {
  return (
    <Dialog open={store.showStats} onOpenChange={setShowStats}>
      <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>Your stats</DialogHeader>
        <div class="grid grid-cols-[auto,1fr] gap-2 justify-center items-center max-w-[80%]">
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
