import React from 'react';
import classNames from 'classnames';
import { Player } from '../../domain/player';
import styles from './Name.module.css';
import { selectNextPlayer } from '../game/gameSlice';
import { useSelector } from 'react-redux';

export const Name: React.FC<{
  player: Player,
  upsideDown: boolean
}> = ({ player, upsideDown }) => {
  const nextPlayer = useSelector(selectNextPlayer);
  return (
    <div className={
      classNames(styles.name, {
        [styles.upsideDown]: upsideDown,
        [styles.active]: nextPlayer.id === player.id,
      })}
    >
      {`${player.name}`}
    </div>
  );
};