import { Game } from "../components/game";

export default function Home() {
  return (
    <section class="flex h-screen w-screen flex-1 flex-col items-center gap-10 bg-gray-200 p-8 text-gray-700">
      <h1 class="mt-40 text-4xl font-bold">Tic Tac Toe</h1>
      <Game />
    </section>
  );
}
