import React from 'react';
import { player1, player2 } from '../../core/game';
import { Board } from '../board/Board';
import { Name } from '../name/Name';
import { Stock } from '../stock/Stock';
import styles from './Game.module.css';

export const Game = () => (
  <div className={styles.game}>
    <Name player={player2} upsideDown={true} />
    <div className={styles.container}>
      <Stock player={player2} upsideDown={true} />
      <Board />
      <Stock player={player1} upsideDown={false} />
    </div>
    <Name player={player1} upsideDown={false} />
  </div>
);
