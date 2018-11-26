// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../ThemeProvider";


export default function Post(props) {
  const chirp = props.chirp;
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div
          className={`post ${theme.brownBackground} ${theme.blueBackground}`}
        >
          <svg
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Emblem_of_the_First_Galactic_Empire.svg"
            alt="The Empire is with you."
          />
          <span className="content">{chirp.message}</span>
          <span className="likes">
            {chirp.likes} <FontAwesomeIcon color={theme.iconColor} icon={faThumbsUp} />
          </span>
          <span className="dislikes">
            {chirp.hates}{" "}
            <FontAwesomeIcon color={theme.iconColor} icon={faThumbsDown} />
          </span>
          <span className="favorites">
            {chirp.favorites} <FontAwesomeIcon color={theme.iconColor} icon={faStar} />
          </span>
          <span className="createdAt">
            {new Date(chirp.created_at).toLocaleDateString()}{" "}
            <FontAwesomeIcon color={theme.iconColor} icon={faClock} />
          </span>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
