import React from "react";

import { Score as ScoreModel } from "models/Score";

import "./Score.styles.scss";

const Score: React.FC<ScoreModel> = ({ username, score }) => {
  return (
    <div className="score">
      <div className="score_username">{username}</div>
      <div className="score_score">{score}</div>
    </div>
  );
};

export default Score;
