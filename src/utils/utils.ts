import { Position } from "../domain/position";
import { boardWidth as width } from "../core/game";

export const convertToPositionFromIndex = (index: number): Position =>
  [index % width, Math.floor(index / width)];

export const convertToIndexFromPosition = (position: Position): number => {
  const [x, y] = position;
  return x + width * y;
};

export const comparePositions = (p1: Position, p2: Position): boolean => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return x1 === x2 && y1 === y2;
};

export const isContainPosition = (position: Position, positions: Position[]): boolean => 
  positions.filter(p => comparePositions(p, position)).length > 0;

export const groupBy = <K, V>(arr: readonly V[], getKey: (cur: V, idx: number, src: readonly V[]) => K): V[][] =>
  arr.reduce((acc, cur, idx, src) => {
    const key = getKey(cur, idx, src);
    const item = acc.find(([k,]) => k === key);
    if (item) {
      const [, v] = item;
      v.push(cur);
    } else {
      acc.push([key, [cur]]);
    }
    return acc;
  }, [] as [K, V[]][])
  .map(([, v]) => v);
