import React from "react";

import "./Card.styles.scss";

type CardProps = {
  id: string;
  flipped: boolean;
  content: number;
  onClick: (id: string) => void;
  matched: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  flipped,
  content,
  matched,
  onClick,
}) => {
  return (
    <div className={`card`}>
      <div
        className={`card_container ${matched || flipped ? "fliped" : ""}`}
        onClick={() => !flipped && onClick(id)}
      >
        <div className="card_container_front"></div>
        <div className={`card_container_back ${matched ? "matched" : ""}`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Card;
