import type { Component } from "solid-js";
import { store, restartGame } from "~/store";
import { createSignal, createEffect } from "solid-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      class="bg-gray-600 h-4 text-white text-xs flex justify-end min-w-4 px-1"
      style={`
        width: ${width}%;
      `}
    >
      {distribution}
    </div>
  );
};

const Stats: Component<{}> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  createEffect(() => {
    if (store.gameFinished) {
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    }
  });
  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          {store.gameWon ? "You win!" : "You lost :("}
        </DialogHeader>
        <div class="grid grid-cols-[auto,1fr] gap-2 justify-center items-center">
          <div>1</div>
          <Bar value={1} />
          <div>2</div>
          <Bar value={2} />
          <div>3</div>
          <Bar value={3} />
          <div>4</div>
          <Bar value={4} />
          <div>5</div>
          <Bar value={5} />
          <div>6</div>
          <Bar value={6} />
          <div>Lost</div>
          <Bar value={7} />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              restartGame();
              setIsOpen(false);
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
