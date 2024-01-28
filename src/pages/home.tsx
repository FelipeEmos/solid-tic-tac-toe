import { Game } from "~/game/game";

export default function Home() {
  return (
    <div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700">
      <section class="flex flex-col items-center gap-10">
        <h1 class="text-4xl font-bold">Tic Tac Toe</h1>
        <Game />
      </section>
    </div>
  );
}
