import { clientOnly } from "@solidjs/start";
const Wordle = clientOnly(() => import("~/components/Wordle"));
export default function Home() {
  return <Wordle fallback={<div>Loading...</div>} />;
}
