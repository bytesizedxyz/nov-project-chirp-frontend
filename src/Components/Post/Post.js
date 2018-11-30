// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { Card } from 'semantic-ui-react';
import { ThemeContext } from "../../ThemeProvider";
import Comment from "../Comments";
import Header from "../Header/Header";

export default function Post(props) {
  const { chirp, user } = props;
  //TODO:
  //  [ ] - get votes to work
  // const updateVotes = e => {
  //   const voteName = e.target.dataset.testid;
  //   const uuid = chirp.uuid;
  //   const wat = fetch("https://nov-chirp-backend.herokuapp.com/chirp/reaction/" + voteName, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       chirpUuid: uuid,
  //       userUuid: "35f8ce60-f333-11e8-92bb-d90a6311ea527d94fea3-f4b9-4058-9677-93bf6f8351e6"
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log("I AM THE ONE AND ONLY DATAMIN", res.data);
  //       const {voteName}
  //       console.log(res.data + `.${voteName}Count`)
  //     })
  //     .catch(err => {
  //       console.log("error happened, printed below");
  //       console.log(err);
  //       alert("NO");
  //     });

  //   console.log(wat);
  // };
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <Card
          color={theme.brownBackground? "red" : "white"}
        >
        <Card.Content>
          <Card.Header>
            <span className="profile-info">
              <img
                className="chirp-profile-image"
                src="https://media.licdn.com/dms/image/C5603AQELTaav4xJOkQ/profile-displayphoto-shrink_200_200/0?e=1548892800&v=beta&t=mC4qkBGQZDv4dJsJ3686-Ev7w1XJhVudOIVChTpZR-Q"
                alt="User"
              />
              <h3>Users Name</h3>
            </span>
          </Card.Header>
          <Card.Description>
            <span className="content">{chirp.message}</span>
          </Card.Description>

        </Card.Content>
        <Card.Content extra>
        <span className="stats">
            <span className="votes">
              <span data-testid="like">
                {chirp.likes} <FontAwesomeIcon color={theme.iconColor} icon={faThumbsUp} />
              </span>
              <span data-testid="hate">
                {chirp.hates} <FontAwesomeIcon color={theme.iconColor} icon={faThumbsDown} />
              </span>
              <span data-testid="favorite">
                {chirp.favorites} <FontAwesomeIcon color={theme.iconColor} icon={faStar} />
              </span>
            </span>
            <span className="date">
              {new Date(chirp.created_at).toLocaleDateString() + " "}
              <FontAwesomeIcon color={theme.iconColor} icon={faClock} />
            </span>
          </span>
          <span className="comment-span">
            <Comment userName="MyUser" />
          </span>
        </Card.Content>
   
        </Card>
      )}
    </ThemeContext.Consumer>
  );
}
