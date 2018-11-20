
// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from 'react';
import "./Post.css";

export default function Post(props) {
  const chirp = props.chirp
  return (
    <div className="post">
      <p>{chirp.message}</p>
      <p>{chirp.likes}</p>
      <p>{chirp.dislikes}</p>
      <p>{chirp.favorites}</p>
      <p>{chirp.created_at}</p>
    </div>
  )
}

