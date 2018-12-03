import React, { Component } from 'react';
import '../Post/Post.css';
import { Input, Button, Header, Comment, Form } from 'semantic-ui-react';

class CommentBox extends Component {
  state = {
    comments: [
      { userName: '', comment: '' },
      { userName: 'White Dads Answering The Phone: ', comment: 'Yellow' }
    ],
    commentValue: '',
    commentBox: false
  };

  // { comment: '', chirpId: '' }
  // HTTP Header - Authorization: "JWT Bearer Token"
  // POST route: https://nov-chirp-backend.herokuapp.com/chirp/comment/

  // GET - returns all chirps and associated comments
  // modify current GET request to associate all comments with to each chirp
  // { userName: '', comment: '', chirpId: '', created_at: '' }
  toggleBox = () => {
    const { commentBox } = this.state;
    this.setState({ commentBox: !commentBox });
  };

  handleChange = e => {
    this.setState({ commentValue: e.target.value }, () => {
      console.log(this.state.commentValue);
    });
  };

  submitComment = () => {
    const user = 'fake user';
    const { commentValue } = this.state;
    console.log(commentValue);
    const newComment = { userName: user, comment: commentValue };
    this.setState({ comments: this.state.comments.concat(newComment) }, () => {
      console.log(this.state.comments);
    });
    this.toggleBox();
  };

  render() {
    const { comments } = this.state;
    const comment = () => {
      if (comments) {
        return comments.map(comment => {
          const { userComment, userName } = comment;
          return (
            <Comment key={`${userName}${userComment}`} data-testid="comments">
              <Comment.Avatar src="https://www.neweurope.eu/wp-content/uploads/2018/02/h_53880267.jpg" />
              <Comment.Content>
                <Comment.Author as="a">{userName}</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{userComment}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        });
      }
    };

    const commentBox = () => {
      const { commentBox } = this.state;
      if (commentBox) {
        return (
          <Form reply>
            <Form.Field>
              <Input
                action={
                  <Button
                    color="red"
                    onClick={this.submitComment}
                    content="Comment"
                    labelPosition="left"
                    icon="edit"
                  />
                }
                actionPosition="left"
                placeholder="Add something to the conversation:"
              />
            </Form.Field>
          </Form>
        );
      } else {
        return <span />;
      }
    };

    return (
      <div>
        <Comment.Group>
          {comment()}
          {commentBox()}
          <Header onClick={this.toggleBox} as="h3" dividing>
            {' '}
            Comments
          </Header>
        </Comment.Group>
      </div>
    );
  }
}

export default CommentBox;
