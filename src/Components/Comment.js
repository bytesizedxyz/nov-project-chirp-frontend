import React, { Component } from "react";
import "./Post/Post.css";

class Comment extends Component {
  state = {
    comments: [{ userName: "A User", comment: "I WIN" }],
    commentValue: ""
  };

  handleChange = e => {
    this.setState({ commentValue: e.target.value });
  };

  submitComment = () => {
    const user = "fake user";
    const { commentValue } = this.state;
    const newComment = { userName: user, comment: commentValue };
    this.setState({ comments: this.state.comments.concat(newComment) });
  };

  render() {
    const { comments, commentValue } = this.state;
    return (
      <div className="comment-body">
        <span>
          {comments.map(comment => {
            return (
              <span className="comment-header">
                <img
                  className="comment-profile-image"
                  src="https://www.neweurope.eu/wp-content/uploads/2018/02/h_53880267.jpg"
                  alt="A user visual identifier."
                />
                <h4>{comment.userName}</h4>|<p>{comment.comment}</p>
              </span>
            );
          })}
          <span className="reply-bar">
            <p>Like</p>
            <p>Hate</p>
            <p>Reply</p>
          </span>
        </span>

        <span className="reply-input">
          <input value={commentValue} onChange={this.handleChange} type="text" />
          <p onClick={this.submitComment}>Send</p>
        </span>
      </div>
    );
  }
}

export default Comment;
