import React, { Component } from 'react';
import '../Post/Post.css';

class Comment extends Component {
  state = {
    comments: [],
    commentValue: '',
    commentBoxOpen: false
  };
  // { userName: '', comment: '' }, { userName: 'White Dads Answering The Phone: ', comment: 'Yellow' }

  toggleBox = () => {
    const { commentBoxOpen } = this.state;
    this.setState({ commentBoxOpen: !commentBoxOpen }, () => {
      console.log(commentBoxOpen);
    });
  };

  handleChange = e => {
    console.log('handling comment change');
    this.setState({ commentValue: e.target.value });
  };

  submitComment = () => {
    console.log('submitting comment');
    const user = 'fake user';
    const { commentValue } = this.state;
    const newComment = { userName: user, comment: commentValue };
    this.setState({ comments: this.state.comments.concat(newComment) });
    this.toggleBox();

    // url for POST
    // data object for POST
    // url for GET
    // data object received from GET
  };

  render() {
    const { comments, userName } = this.state;
    const returnComment = () => {
      if (comments) {
        return comments.map(comment => {
          return (
            <span key={`${comment}${userName}`} data-testid="comments">
              <span className="comment-header">
                <img
                  className="comment-profile-image"
                  src="https://www.neweurope.eu/wp-content/uploads/2018/02/h_53880267.jpg"
                  alt="A user visual identifier."
                />
                <h4>{comment.userName}</h4>
                <p>{comment.comment}</p>
              </span>
              <span className="reply-bar">
                <p>Like</p>
                <p>Hate</p>
              </span>
            </span>
          );
        });
      }
    };

    const returnCommentBox = () => {
      const { commentValue, commentBoxOpen } = this.state;
      if (commentBoxOpen) {
        return (
          <span className="reply-input">
            <input
              placeholder="New Comment"
              value={commentValue}
              onChange={this.handleChange}
              type="text"
            />
            <p onClick={this.submitComment}>Send</p>
          </span>
        );
      } else {
        return <span />;
      }
    };

    return (
      <div className="comment-body">
        <span className="reply-bar">
          <p onClick={this.toggleBox}>Comment</p>
        </span>
        <span>{returnComment()}</span>
        <span>{returnCommentBox()}</span>
      </div>
    );
  }
}

export default Comment;
