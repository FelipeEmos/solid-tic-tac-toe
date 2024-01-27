import { For, createSignal } from "solid-js";

enum SquareValue {
  O = "O",
  X = "X",
  Empty = "",
}

type GameResult = "draw" | SquareValue.O | SquareValue.X | undefined;

type BoardState = [
  [SquareValue, SquareValue, SquareValue],
  [SquareValue, SquareValue, SquareValue],
  [SquareValue, SquareValue, SquareValue],
];

const initialBoardState = () =>
  [
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
  ] as const satisfies BoardState;

export function Game() {
  const [playerTurn, setPlayerTurn] = createSignal<SquareValue>(SquareValue.X);
  const [boardState, setBoardState] =
    createSignal<BoardState>(initialBoardState());

  const gameResult = (): GameResult => {
    let hasEmptySquare = false;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (boardState()[x][y] === SquareValue.Empty) {
          hasEmptySquare = true;
        }
      }
    }
    if (!hasEmptySquare) {
      return "draw";
    }

    for (let x = 0; x < 3; x++) {
      const row = [boardState()[x][0], boardState()[x][1], boardState()[x][2]];
      if (
        row[0] !== SquareValue.Empty &&
        row[0] === row[1] &&
        row[0] === row[2]
      ) {
        return row[0];
      }
    }
    for (let y = 0; y < 3; y++) {
      const col = [boardState()[0][y], boardState()[1][y], boardState()[2][y]];
      if (
        col[0] !== SquareValue.Empty &&
        col[0] === col[1] &&
        col[0] === col[2]
      ) {
        return col[0];
      }
    }
    const primaryDiagonal = [
      boardState()[0][0],
      boardState()[1][1],
      boardState()[2][2],
    ];
    if (
      primaryDiagonal[0] !== SquareValue.Empty &&
      primaryDiagonal[0] === primaryDiagonal[1] &&
      primaryDiagonal[0] === primaryDiagonal[2]
    ) {
      return primaryDiagonal[0];
    }
    const secondaryDiagonal = [
      boardState()[0][2],
      boardState()[1][1],
      boardState()[2][0],
    ];
    if (
      secondaryDiagonal[0] !== SquareValue.Empty &&
      secondaryDiagonal[0] === secondaryDiagonal[1] &&
      secondaryDiagonal[0] === secondaryDiagonal[2]
    ) {
      return secondaryDiagonal[0];
    }
  };

  const onSquareClick = ({ x, y }: { x: number; y: number }) => {
    if (
      gameResult() !== undefined ||
      boardState()[x][y] !== SquareValue.Empty
    ) {
      return;
    }

    const newBoard = [...boardState()] as BoardState;
    newBoard[x][y] = playerTurn();
    setBoardState(newBoard);

    setPlayerTurn(
      playerTurn() === SquareValue.X ? SquareValue.O : SquareValue.X,
    );
  };

  return (
    <>
      <div class="w-fit border-2 border-black">
        <For each={[0, 1, 2]}>
          {(x) => (
            <div class="flex flex-row">
              <For each={[0, 1, 2]}>
                {(y) => {
                  const isClickable = () =>
                    boardState()[x][y] === SquareValue.Empty &&
                    gameResult() === undefined;

                  return (
                    <div
                      class={`${isClickable() ? "cursor-pointer hover:bg-slate-200" : ""} flex h-20 w-20 items-center justify-center border-2 border-black bg-white text-3xl font-bold`}
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
      {gameResult() !== undefined && (
        <>
          <h1 class="text-2xl">
            {gameResult() === "draw" ? "Draw!" : `Winner is ${gameResult()}!!!`}
          </h1>
          <button
            class="rounded-lg bg-slate-800 p-5 text-white hover:bg-slate-600"
            onClick={() => {
              console.log("reset", boardState());
              setBoardState(initialBoardState());
            }}
          >
            Reset Game
          </button>
        </>
      )}
    </>
  );
}
