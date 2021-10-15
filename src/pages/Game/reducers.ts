import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Card } from "models/Card";
import { GameState } from "models/GameState";

const initialState = {
  cards: [],
  gameTurn: 0,
  score: 0,
  isWinner: false,
} as GameState;

const counterSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setInitialState(state) {
      state.cards = [];
      state.gameTurn = 0;
      state.score = 0;
      state.isWinner = false;
    },
    generateCards(state, action: PayloadAction<number>) {
      const cards = [] as Card[];
      const tableSize = action.payload;
      for (let i = 0; i < tableSize * 2; i++) {
        const card = {
          id: uuidv4(),
          content: i % tableSize,
          flipped: false,
          matched: false,
        };
        cards.splice(i, 0, card);
        const rand = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[rand]] = [cards[rand], cards[i]];
      }
      state.cards = cards;
    },
    flipCard(state, action: PayloadAction<string>) {
      const cards = state.cards;
      const cardId = action.payload;
      const flippedCards = cards.filter((c) => c.flipped);

      if (flippedCards.length < 2) {
        const card = cards.find((c) => c.id === cardId);
        const index = cards.indexOf(card);

        card.flipped = true;
        cards[index] = card;

        state.gameTurn++;

        state.cards = cards;
      }
    },
    checkWin(state) {
      const cards = state.cards;
      const flippedCards = cards.filter((c) => c.flipped);

      const card1 = flippedCards[0];
      const index1 = cards.indexOf(card1);

      const card2 = flippedCards[1];
      const index2 = cards.indexOf(card2);

      if (card1.content === card2.content) {
        card1.matched = true;
        card2.matched = true;
      }
      card1.flipped = false;
      card2.flipped = false;

      cards[index1] = card1;
      cards[index2] = card2;

      if (cards.every((c) => c.matched)) state.isWinner = true;

      state.score += 1;
      state.gameTurn = 0;
      state.cards = cards;
    },
  },
});

export const { setInitialState, generateCards, flipCard, checkWin } =
  counterSlice.actions;
export default counterSlice.reducer;
