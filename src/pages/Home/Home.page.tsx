import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import LayoutWrapper from "components/LayoutWrapper";

import StorageService, { STORAGE_KEYS } from "services/storageService";

import "./Home.styles.scss";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [username, setUsername] = useState("");
  const isUsernameEmpty = useMemo(() => !username, [username]);

  const onUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(e.currentTarget.value),
    []
  );

  const onStartGameClick = useCallback(
    (e) =>
      isUsernameEmpty
        ? e.preventDefault()
        : StorageService.setItem(STORAGE_KEYS.CURRENT_USER, username),
    [isUsernameEmpty, username]
  );

  return (
    <LayoutWrapper>
      <div className="home">
        <h1 className="home_title">Memory game</h1>
        <div className="home_form">
          <input
            className="home_form_input"
            placeholder="Enter username"
            onChange={onUsernameChange}
          />
          <Link
            className={`home_form_button${isUsernameEmpty ? "-disabled" : ""}`}
            to="/game"
            onClick={onStartGameClick}
          >
            Start game
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
