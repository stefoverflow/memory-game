import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutWrapper from "components/LayoutWrapper";
import Score from "components/Score";

import StorageService, { STORAGE_KEYS } from "services/storageService";

import "./Scoreboard.styles.scss";

type ScoreboardProps = {};

const Scoreboard: React.FC<ScoreboardProps> = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(JSON.parse(StorageService.getItem(STORAGE_KEYS.SCOREBOARD)));
  }, []);

  return (
    <LayoutWrapper>
      <div className="scoreboard">
        <div className="scoreboard_header">
          <h1 className="scoreboard_header_title">Scoreboard</h1>
          <Link className="scoreboard_header_button" to="/">
            Play again
          </Link>
        </div>
        <div className="scoreboard_scores">
          <div className="scoreboard_scores_header">
            <div className="scoreboard_scores_header_username">username</div>
            <div className="scoreboard_scores_header_score">moves</div>
          </div>
          {scores.map((score) => (
            <Score key={score.id} {...score} />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Scoreboard;
