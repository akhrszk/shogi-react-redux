import { Player } from "./player";

export enum PieceType {
  Oh,
  Gyoku,
  Hisha,
  Kaku,
  Kin,
  Gin,
  Keima,
  Kyohsha,
  Hu,
  Ryuuoh,
  Ryuuma,
  Narigin,
  Narikei,
  Narikyoh,
  Tokin
}

export interface Piece extends Object {
  id: number;
  type: PieceType;
  ownerId: number;
  changeOwner(player: Player): void;
  nari(): void;
  omote(): void;
}
