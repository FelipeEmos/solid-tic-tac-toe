export enum SquareValue {
  O = "O",
  X = "X",
  Empty = "",
}

export type GameResult =
  | { type: "draw" }
  | { type: "winner"; winningLine: Line; winner: SquareValue.O | SquareValue.X }
  | undefined;

export type BoardState = [
  [SquareValue, SquareValue, SquareValue],
  [SquareValue, SquareValue, SquareValue],
  [SquareValue, SquareValue, SquareValue],
];

export const initialBoardState = () =>
  [
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
    [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty],
  ] as const satisfies BoardState;

export type Coordinate = { x: number; y: number };
export type Line = [Coordinate, Coordinate, Coordinate];

export const rows: Line[] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
];

export const columns: Line[] = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
];

export const diagonals: Line[] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ],
];
