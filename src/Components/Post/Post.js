// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { Card } from "semantic-ui-react";
import { ThemeContext } from "../../ThemeProvider";
import Comment from "../Comments";

export default function Post(props) {
  const { chirp, user, updateChirp } = props;
  const updateVotes = e => {
    const voteName = e.target.dataset.testid;
    const uuid = chirp.uuid;
    fetch(`https://nov-chirp-backend.herokuapp.com/chirp/reaction/${voteName}/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token")
      }
    })
      .then(res => res.json())
      .then(res => {
        const objKeys = Object.keys(res.data);
        updateChirp({ [objKeys[0]]: res.data[objKeys[0]] }, uuid);
      })
      .catch(err => {
        console.log("error happened, printed below");
        console.log(err);
      });
  };
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <Card style={theme.currentTheme === "dark"? {backgroundColor:"#292323", boxShadow:"none"}: {backgroundColor:"#fff", boxShadow:"none"}} color={theme.brownBackground ? "red" : ""}>
          <Card.Content>
            <Card.Header style={theme.currentTheme === "dark"? {color:"#fff"}: {color:"#000"}}>
              <span className="profile-info">
                <img
                  className="chirp-profile-image"
                  src="https://media.licdn.com/dms/image/C5603AQELTaav4xJOkQ/profile-displayphoto-shrink_200_200/0?e=1548892800&v=beta&t=mC4qkBGQZDv4dJsJ3686-Ev7w1XJhVudOIVChTpZR-Q"
                  alt="User"
                />
                <h3>{chirp.username? chirp.username : "Users Name"}</h3>
              </span>
            </Card.Header>

            <Card.Description style={theme.currentTheme === "dark"? {color:"#fff"}: {color:"#000"}}>
              <span>{chirp.message}</span>
              <span className="stats">
                <span className="votes">
                  <span data-testid="like" onClick={updateVotes}>
                    {chirp.likes} <FontAwesomeIcon color={theme.iconColor} icon={faThumbsUp} />
                  </span>
                  <span data-testid="hate" onClick={updateVotes}>
                    {chirp.hates} <FontAwesomeIcon color={theme.iconColor} icon={faThumbsDown} />
                  </span>
                  <span data-testid="favorite" onClick={updateVotes}>
                    {chirp.favorites} <FontAwesomeIcon color={theme.iconColor} icon={faStar} />
                  </span>
                </span>
                <span className="date">
                  {new Date(chirp.created_at).toLocaleDateString() + " "}
                  <FontAwesomeIcon color={theme.iconColor} icon={faClock} />
                </span>
              </span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span style={theme.currentTheme === "dark"? {color:"#fff"}: {color:"#000"}}>
              <Comment userName={user} />
            </span>
          </Card.Content>
        </Card>
      )}
    </ThemeContext.Consumer>
  );
}
