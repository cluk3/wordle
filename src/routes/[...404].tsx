import { createEffect, createSignal, Show } from "solid-js";
import Revealed from "~/components/Revealed";

export default function NotFound() {
  // const [notFound, setNotFound] = createSignal(true);
  // createEffect(() => {
  //   setTimeout(() => setNotFound(false), 2000);
  // });
  return (
    <main class="grid place-content-center w-full h-screen justify-items-center">
      <Revealed letters="NOT FOUND" repeat letterClass="bg-amber-500" />
      <p class="text-center text-xl font-bold text-slate-900 pt-4">
        The page you are looking for does not exist 😔
      </p>
    </main>
  );
}
