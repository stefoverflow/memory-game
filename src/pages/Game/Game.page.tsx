import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LayoutWrapper from "components/LayoutWrapper";
import Card from "components/Card";

import { useAppSelector, useAppDispatch } from "hooks/store";
import { setInitialState, generateCards, flipCard, checkWin } from "./reducers";

import StorageService, { STORAGE_KEYS } from "services/storageService";

import "./Game.styles.scss";

const TABLE_SIZE = 3;

type GameProps = {};

const Home: React.FC<GameProps> = () => {
  const { cards, gameTurn, isWinner, score } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(generateCards(TABLE_SIZE));
  }, [dispatch]);

  useEffect(() => {
    if (gameTurn === 2) {
      setTimeout(() => dispatch(checkWin()), 700);
    }
  }, [dispatch, gameTurn]);

  useEffect(() => {
    if (isWinner) {
      const scoreboard = JSON.parse(
        StorageService.getItem(STORAGE_KEYS.SCOREBOARD)
      );
      const currentUser = StorageService.getItem(STORAGE_KEYS.CURRENT_USER);
      const newScore = { id: uuidv4(), username: currentUser, score };

      if (!scoreboard) {
        const updatedScoreboard = [newScore];
        StorageService.setItem(
          STORAGE_KEYS.SCOREBOARD,
          JSON.stringify(updatedScoreboard)
        );
      } else {
        const updatedScoreboard = [...scoreboard];
        for (let i = 0; i < updatedScoreboard.length; i++) {
          if (newScore.score <= updatedScoreboard[i].score) {
            updatedScoreboard.splice(i, 0, newScore);
            break;
          }
        }
        if (scoreboard.length === updatedScoreboard.length)
          updatedScoreboard.push(newScore);

        StorageService.setItem(
          STORAGE_KEYS.SCOREBOARD,
          JSON.stringify(updatedScoreboard)
        );
      }
    }
  }, [isWinner, score]);

  return (
    <LayoutWrapper>
      <div className="game">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onClick={(id) => dispatch(flipCard(id))}
          />
        ))}
        {isWinner && (
          <div className="game_winner-container">
            <div className="game_winner-container_title">WINNER</div>
            <div className="game_winner-container_description">
              moves: {score}
            </div>
            <Link
              className="game_winner-container_scores"
              to="/scoreboard"
              onClick={() => dispatch(setInitialState())}
            >
              To scoreboard
            </Link>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default Home;
