
// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from 'react';
import "./Post.css";

export default function Post(props) {
  const chirp = props.chirp
  return (
    <div className="post">
      <span className="content">{chirp.message}</span>
      <span className="likes">{chirp.likes} Likes</span>
      <span className="dislikes">{chirp.dislikes} Dislikes</span>
      <span className="favorites">{chirp.favorites} Favorites</span>
      <span className="createdAt">{chirp.created_at}</span>
    </div>
  )
}

