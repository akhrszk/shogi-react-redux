import { Piece, PieceType } from "../domain/piece";
import { Player } from "../domain/player";

const pool: Piece[] = [];

export const find = (id: number): Piece|null => {
  return pool.find(piece => piece.id === id) || null;
};

let incremental: number = 1;

export const newPiece = (type: PieceType, owner: Player): Piece => {
  const piece: Piece = {
    id: incremental++,
    type,
    ownerId: owner.id,
    changeOwner(player) {
      this.ownerId = player.id;
    },
    nari() {
      if (this.type === PieceType.Hisha) {
        this.type = PieceType.Ryuuoh;
      }
      if (this.type === PieceType.Kaku) {
        this.type = PieceType.Ryuuma;
      }
      if (this.type === PieceType.Gin) {
        this.type = PieceType.Narigin;
      }
      if (this.type === PieceType.Keima) {
        this.type = PieceType.Narikei;
      }
      if (this.type === PieceType.Kyohsha) {
        this.type = PieceType.Narikyoh;
      }
      if (this.type === PieceType.Hu) {
        this.type = PieceType.Tokin;
      }
    },
    omote() {
      if (this.type === PieceType.Ryuuoh) {
        this.type = PieceType.Hisha;
      }
      if (this.type === PieceType.Ryuuma) {
        this.type = PieceType.Kaku;
      }
      if (this.type === PieceType.Narigin) {
        this.type = PieceType.Gin;
      }
      if (this.type === PieceType.Narikei) {
        this.type = PieceType.Keima;
      }
      if (this.type === PieceType.Narikyoh) {
        this.type = PieceType.Kyohsha;
      }
      if (this.type === PieceType.Tokin) {
        this.type = PieceType.Hu;
      }
    },
    toString() {
      switch (this.type) {
        case PieceType.Oh:
          return "王";
        case PieceType.Gyoku:
          return "玉";
        case PieceType.Hisha:
          return "飛";
        case PieceType.Kaku:
          return "角";
        case PieceType.Kin:
          return "金";
        case PieceType.Gin:
          return "銀";
        case PieceType.Keima:
          return "桂";
        case PieceType.Kyohsha:
          return "香";
        case PieceType.Hu:
          return "歩";
        case PieceType.Ryuuoh:
          return "竜";
        case PieceType.Ryuuma:
          return "馬";
        case PieceType.Narigin:
          return "全";
        case PieceType.Narikei:
          return "圭";
        case PieceType.Narikyoh:
          return "杏";
        case PieceType.Tokin:
          return "と";
        default:
          return"";
      }
    }
  };
  pool.push(piece);
  return piece;
};
