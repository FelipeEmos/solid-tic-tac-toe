import { For, createSignal } from "solid-js";
import {
  SquareValue,
  BoardState,
  initialBoardState,
  GameResult,
  rows,
  columns,
  diagonals,
  Coordinate,
} from "./defs";
import { cn } from "~/lib/utils";

export function Game() {
  const [playerTurn, setPlayerTurn] = createSignal<SquareValue>(SquareValue.X);
  const [boardState, setBoardState] =
    createSignal<BoardState>(initialBoardState);

  const gameResult = (): GameResult => {
    for (const line of [...rows, ...columns, ...diagonals]) {
      const values = line.map((coord) => boardState()[coord.x][coord.y]);
      if (
        values[0] !== SquareValue.Empty &&
        values[0] === values[1] &&
        values[0] === values[2]
      ) {
        return {
          type: "winner",
          winningLine: line,
          winner: values[0],
        };
      }
    }

    if (
      rows.every((row) =>
        row.every(
          (coord) => boardState()[coord.x][coord.y] !== SquareValue.Empty,
        ),
      )
    ) {
      return { type: "draw" };
    }
  };

  const isClickable = ({ x, y }: Coordinate) =>
    boardState()[x][y] === SquareValue.Empty && gameResult() === undefined;

  const onSquareClick = ({ x, y }: Coordinate) => {
    if (!isClickable({ x, y })) {
      return;
    }

    const newBoard = [...boardState()] as BoardState;
    newBoard[x][y] = playerTurn();
    setBoardState(newBoard);

    setPlayerTurn(
      playerTurn() === SquareValue.X ? SquareValue.O : SquareValue.X,
    );
  };

  const isOWinner = () => {
    const result = gameResult();
    return result?.type === "winner" && result.winner === SquareValue.O;
  };

  const isXWinner = () => {
    const result = gameResult();
    return result?.type === "winner" && result.winner === SquareValue.X;
  };

  const isInWinningLine = ({ x, y }: Coordinate) => {
    const result = gameResult();
    if (result?.type !== "winner") {
      return false;
    }
    return result.winningLine.some((coord) => coord.x === x && coord.y === y);
  };

  const winningMessage = () => {
    const result = gameResult();
    if (result === undefined) {
      return undefined;
    }
    if (result?.type === "draw") {
      return "Draw!";
    }
    if (result?.type === "winner") {
      return `Winner is ${result.winner}!!!`;
    }
  };

  return (
    <>
      <div class="w-fit border-2 border-black">
        <For each={[0, 1, 2]}>
          {(x) => (
            <div class="flex flex-row">
              <For each={[0, 1, 2]}>
                {(y) => {
                  return (
                    <div
                      class={cn(
                        "flex h-20 w-20 items-center justify-center border-2 border-black bg-white text-3xl font-bold transition-colors duration-0",
                        {
                          "cursor-pointer hover:bg-slate-200": isClickable({
                            x,
                            y,
                          }),
                          "bg-red-400 duration-500":
                            isXWinner() && isInWinningLine({ x, y }),
                          "bg-blue-400 duration-500":
                            isOWinner() && isInWinningLine({ x, y }),
                          "bg-amber-300 duration-500":
                            gameResult()?.type === "draw",
                        },
                      )}
                      onClick={() => onSquareClick({ x, y })}
                    >
                      {boardState()[x][y]}
                    </div>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>

      {winningMessage() ? (
        <h3 class="text-2xl">{winningMessage()}</h3>
      ) : (
        <h3 class="text-2xl">
          Now it's <span class="font-bold">{playerTurn()}'s</span> turn
        </h3>
      )}
      <button
        class={cn("rounded-lg bg-slate-800 p-5 text-white hover:bg-slate-600", {
          invisible: gameResult() === undefined,
        })}
        onClick={() => {
          setBoardState(initialBoardState);
        }}
      >
        Reset Game
      </button>
    </>
  );
}
