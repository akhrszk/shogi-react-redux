import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedPieceId,
  selectStocks,
  selectPieceId,
  selectNextPlayer
} from '../game/gameSlice';
import { Player } from '../../domain/player';
import { find as findPiece } from '../../factory/pieceFactory';
import styles from './Stock.module.css';
import { Piece } from '../../domain/piece';
import { groupBy } from '../../utils/utils';

const Row: React.FC<{
  pieces: Piece[],
  isFocused: boolean,
  onClick: (piece: Piece, isFocused: boolean) => void
}> = ({ pieces, isFocused, onClick }) => (
  <div className={styles.row}>
    <div className={
      classNames(styles.piece, {
        [styles.focusedPiece]: isFocused
      })}
      onClick={() => onClick(pieces[0], isFocused)}
    >
      {`${pieces[0]}`}
    </div>
    {`x${pieces.length}`}
  </div>
);

export const Stock: React.FC<{ player: Player, upsideDown: boolean }> =
  ({ player, upsideDown }) => {
    const dispatch = useDispatch();
    const pieceIds = useSelector(selectStocks);
    const selectedPieceId = useSelector(selectSelectedPieceId);
    const nextPlayer = useSelector(selectNextPlayer);
    const pieces = pieceIds.map(id => findPiece(id)!!)
      .filter(piece => piece.ownerId === player.id);

    const selectPiece = (piece: Piece|null) => {
      dispatch(selectPieceId({ pieceId: piece?.id || null }));
    };
    const isSelectablePiece = (piece: Piece): boolean => piece.ownerId === nextPlayer.id;

    return (
      <div className={classNames(styles.stock, { [styles.upsideDown]: upsideDown })}>
        {groupBy(pieces, piece => piece.type)
          .sort((a, b) => a[0].type - b[0].type)
          .map(pieces =>
            <Row key={pieces[0].type}
              pieces={pieces}
              isFocused={pieces.filter(piece => piece.id === selectedPieceId).length > 0}
              onClick={(piece, isSelected) => {
                if (!isSelected && isSelectablePiece(piece))
                  selectPiece(piece);
                else
                  selectPiece(null);
              }}
            />
          )}
      </div>
    );
  };
