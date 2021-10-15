import { Card } from 'models/Card';

export type GameState = {
  cards: Card[],
  gameTurn: number,
  score: number,
  isWinner: boolean,
}