import { Piece, PieceType } from "../domain/piece";
import { find as findPiece, newPiece } from "../factory/pieceFactory";
import { Player } from "../domain/player";
import { Position } from "../domain/position";
import { convertToPositionFromIndex, convertToIndexFromPosition } from "../utils/utils";

export const boardWidth = 9;

export const player1: Player = { id: 1, name: "Player1" };
export const player2: Player = { id: 2, name: "Player2" };

export const initializeBoard = (): (number|null)[] => [
  newPiece(PieceType.Kyohsha, player2).id,
  newPiece(PieceType.Keima, player2).id,
  newPiece(PieceType.Gin, player2).id,
  newPiece(PieceType.Kin, player2).id,
  newPiece(PieceType.Gyoku, player2).id,
  newPiece(PieceType.Kin, player2).id,
  newPiece(PieceType.Gin, player2).id,
  newPiece(PieceType.Keima, player2).id,
  newPiece(PieceType.Kyohsha, player2).id,
  null, newPiece(PieceType.Hisha, player2).id,
  null, null, null, null, null,
  newPiece(PieceType.Kaku, player2).id, null,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  newPiece(PieceType.Hu, player2).id,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  newPiece(PieceType.Hu, player1).id,
  null, newPiece(PieceType.Kaku, player1).id,
  null, null, null, null, null,
  newPiece(PieceType.Hisha, player1).id, null,
  newPiece(PieceType.Kyohsha, player1).id,
  newPiece(PieceType.Keima, player1).id,
  newPiece(PieceType.Gin, player1).id,
  newPiece(PieceType.Kin, player1).id,
  newPiece(PieceType.Oh, player1).id,
  newPiece(PieceType.Kin, player1).id,
  newPiece(PieceType.Gin, player1).id,
  newPiece(PieceType.Keima, player1).id,
  newPiece(PieceType.Kyohsha, player1).id,
];

export const calculateMovablePositions = (pieceId: number, board: (number|null)[], upsideDown: boolean): Position[] => {
  const piece = findPiece(pieceId);
  if (piece === null) {
    return [];
  }
  const index = board.indexOf(pieceId);
  const [x, y] = convertToPositionFromIndex(index);

  const isExistsPiece = (position: Position): boolean => {
    const index = convertToIndexFromPosition(position);
    return board[index] !== null;
  };

  const getPiece = (position: Position): Piece|null => {
    const index = convertToIndexFromPosition(position);
    const pieceId = board[index];
    if (pieceId === null) {
      return null;
    }
    return findPiece(pieceId);
  };

  const calculateMovableLiens = (direction: [number, number]): Position[] => {
    const [dx, dy] = direction;
    let positions: Position[] = [];
    for (let i = 0; i < 8; i++) {
      const position: Position = [x + dx * (i + 1), y + dy * (i + 1)];
      if (position[0] < 0 || position[0] > 8 || position[1] < 0 || position[1] > 8) {
        break;
      }
      positions = [...positions, position];
      
      if (isExistsPiece(position)) {
        break;
      }
    }
    return positions;
  };

  let positions: Position[] = [];
  switch(piece.type) {
    case PieceType.Oh:
    case PieceType.Gyoku:
      positions = [
        [x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y],
        [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1],
      ];
      break;
    case PieceType.Kin:
    case PieceType.Narigin:
    case PieceType.Narikei:
    case PieceType.Narikyoh:
    case PieceType.Tokin:
      positions = upsideDown ?
        [[x, y + 1], [x + 1, y + 1], [x - 1, y + 1], [x - 1, y], [x + 1, y], [x, y - 1]] :
        [[x, y - 1], [x + 1, y - 1], [x - 1, y - 1], [x - 1, y], [x + 1, y], [x, y + 1]];
      break;
    case PieceType.Gin:
      positions = upsideDown ?
        [[x, y + 1], [x + 1, y + 1], [x - 1, y + 1], [x - 1, y - 1], [x + 1, y - 1]] :
        [[x, y - 1], [x + 1, y - 1], [x - 1, y - 1], [x - 1, y + 1], [x + 1, y + 1]];
      break;
    case PieceType.Keima:
      positions = upsideDown ? [[x - 1, y + 2], [x + 1, y + 2]] : [[x - 1, y - 2], [x + 1, y - 2]];
      break;
    case PieceType.Kyohsha:
      positions = calculateMovableLiens(upsideDown ? [0, 1] : [0, -1]);
      break;
    case PieceType.Hu:
      positions = upsideDown ? [[x, y + 1]] : [[x, y - 1]];
      break;
    case PieceType.Hisha:
      positions = [
        ...calculateMovableLiens([1, 0]), ...calculateMovableLiens([-1, 0]),
        ...calculateMovableLiens([0, 1]), ...calculateMovableLiens([0, -1])
      ];
      break;
    case PieceType.Kaku:
      positions = [
        ...calculateMovableLiens([1, 1]), ...calculateMovableLiens([-1, -1]),
        ...calculateMovableLiens([1, -1]), ...calculateMovableLiens([-1, 1])
      ];
      break;
    case PieceType.Ryuuoh:
      positions = [
        ...calculateMovableLiens([1, 0]), ...calculateMovableLiens([-1, 0]),
        ...calculateMovableLiens([0, 1]), ...calculateMovableLiens([0, -1]),
        [x + 1, y + 1], [x - 1, y + 1], [x + 1, y - 1], [x - 1, y - 1],
      ];
      break;
    case PieceType.Ryuuma:
      positions = [
        ...calculateMovableLiens([1, 1]), ...calculateMovableLiens([-1, -1]),
        ...calculateMovableLiens([1, -1]), ...calculateMovableLiens([-1, 1]),
        [x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y],
      ];
      break;
  }
  positions = positions.filter(position => getPiece(position)?.ownerId !== piece.ownerId);
  return positions;
};

export const calculatePuttablePositions = (board: (number|null)[]): Position[] => {
  const positions: Position[] = [];
  board.forEach((v, idx) =>{
    if (v === null)
      positions.push(convertToPositionFromIndex(idx));
  });
  return positions;
};

export const confirmNariIfNeed =
  (piece: Piece, position: Position, board: (number|null)[], upsdieDown: boolean, callback: () => void) => {
    let isNeed: boolean;
    switch(piece.type) {
      case PieceType.Hisha:
      case PieceType.Kaku:
      case PieceType.Gin:
      case PieceType.Keima:
      case PieceType.Kyohsha:
      case PieceType.Hu:
        const [, y] = position;
        isNeed = ((y < 3 && !upsdieDown) || (y > 5 && upsdieDown)) && board.includes(piece.id);
        break;
      default:
        isNeed = false;
        break;
    }
    if (!isNeed) {
      return;
    }
    if (window.confirm("成りますか？")) {
      callback();
    }
  };
