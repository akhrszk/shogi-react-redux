import React from 'react';
import classNames from 'classnames';
import styles from './Board.module.css';
import { Piece, PieceType } from '../../domain/piece';
import { Position } from '../../domain/position';
import {
  player2,
  calculateMovablePositions,
  calculatePuttablePositions,
  confirmNariIfNeed
} from '../../core/game';
import {
  comparePositions,
  convertToPositionFromIndex,
  isContainPosition
} from '../../utils/utils';
import {
  move,
  selectBoard,
  selectNextPlayer,
  selectPieceId,
  selectSelectedPieceId
} from '../game/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { find as findPiece } from '../../factory/pieceFactory';

const Cell: React.FC<{
  piece: Piece|null,
  position: Position,
  isActive: boolean,
  isFocused: boolean,
  onClickCell: (position: Position, piece: Piece|null, isActive: boolean) => void
}> = ({ piece, position, isActive, isFocused, onClickCell }) => (
  <div className={
    classNames(styles.cell, {
      [styles.activeCell]: isActive,
      [styles.focusedCell]: isFocused,
    })}
    onClick={() => onClickCell(position, piece, isActive)}
  >
    {piece !== null && (
      <div className={
          classNames(styles.piece, {
            [styles.upsideDown]: piece.ownerId === player2.id,
            [styles.nari]: piece.type === PieceType.Narigin ||
              piece.type === PieceType.Narikei ||
              piece.type === PieceType.Narikyoh ||
              piece.type === PieceType.Tokin ||
              piece.type === PieceType.Ryuuoh ||
              piece.type === PieceType.Ryuuma,
          })
        }
      >
        {`${piece}`}
      </div>
    )}
  </div>
);

export const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const selectedPieceId = useSelector(selectSelectedPieceId);
  const nextPlayer = useSelector(selectNextPlayer);

  const selectedPiece: Piece|null =
    selectedPieceId !== null ? findPiece(selectedPieceId) : null;

  const putPiece = (piece: Piece, position: Position) => {
    dispatch(move({ pieceId: piece.id, position }));
  };
  const selectPiece = (piece: Piece|null) => {
    dispatch(selectPieceId({ pieceId: piece?.id || null }))
  };
  const isSelectablePiece = (piece: Piece): boolean => piece.ownerId === nextPlayer.id;

  let focusedPosition: Position|null = null;
  if (selectedPieceId !== null && board.includes(selectedPieceId)) {
    focusedPosition = convertToPositionFromIndex(board.indexOf(selectedPieceId));
  }
  let activePositions: Position[] = [];
  if (selectedPieceId !== null) {
    if (board.includes(selectedPieceId)) {
      activePositions =
        calculateMovablePositions(selectedPieceId, board, findPiece(selectedPieceId)?.ownerId === player2.id);
    } else {
      activePositions = calculatePuttablePositions(board);
    }
  }
  return (
    <div className={styles.board}>
      {board.map((pieceId, i) =>
        <Cell key={i}
          position={convertToPositionFromIndex(i)}
          piece={pieceId !== null ? findPiece(pieceId) : null}
          isActive={isContainPosition(convertToPositionFromIndex(i), activePositions)}
          isFocused={
            focusedPosition !== null &&
              comparePositions(convertToPositionFromIndex(i), focusedPosition)
          }
          onClickCell={(position, piece, isActive) => {
            if (selectedPiece !== null) {
              if (isActive) {
                putPiece(selectedPiece, position);
                confirmNariIfNeed(
                  selectedPiece,
                  position,
                  board,
                  selectedPiece.ownerId === player2.id,
                  () => {
                    selectedPiece.nari();
                  }
                );
              }
              selectPiece(null);
            } else {
              if (piece !== null && isSelectablePiece(piece)) {
                selectPiece(piece);
              }
            }
          }}
        />
      )}
    </div>
  )
};
