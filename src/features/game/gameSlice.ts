import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { initializeBoard, player1, player2 } from "../../core/game";
import { Player } from "../../domain/player";
import { Position } from "../../domain/position";
import { find as findPiece } from "../../factory/pieceFactory";
import { convertToIndexFromPosition } from "../../utils/utils";

interface State {
  nextPlayer: Player;
  board: (number|null)[];
  stocks: number[];
  selectedPieceId: number|null;
}

const initialState: State = {
  nextPlayer: player1,
  board: initializeBoard(),
  stocks: [],
  selectedPieceId: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    move: (state, action: PayloadAction<{ pieceId: number, position: Position }>) => {
      const { pieceId, position } = action.payload;
      const { nextPlayer, board, stocks } = state;
      const piece = findPiece(pieceId)!!;
      if (board.includes(piece.id)) {
        board[board.indexOf(piece.id)] = null;
      }
      if (stocks.includes(piece.id)) {
        stocks.splice(stocks.indexOf(piece.id), 1);
      }
      const index = convertToIndexFromPosition(position);
      if (board[index] !== null) {
        findPiece(board[index]!!)?.changeOwner(nextPlayer);
        findPiece(board[index]!!)?.omote();
        stocks.push(board[index]!!);
        board[index] = null;
      }
      board[index] = piece.id;
      state.nextPlayer = nextPlayer.id === player1.id ? player2 : player1;
    },
    selectPieceId: (state, action: PayloadAction<{ pieceId: number|null}>) => {
      const { pieceId } = action.payload;
      state.selectedPieceId = pieceId;
    },
  },
});

export const { move, selectPieceId } = boardSlice.actions;

export const selectNextPlayer = (state: RootState) => state.game.nextPlayer;
export const selectBoard = (state: RootState) => state.game.board;
export const selectStocks = (state: RootState) => state.game.stocks;
export const selectSelectedPieceId = (state: RootState) => state.game.selectedPieceId;

export default boardSlice.reducer;
