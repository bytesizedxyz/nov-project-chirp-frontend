import React, { Component } from 'react';
import '../Post/Post.css';
import { Input, Button, Header, Comment, Form } from 'semantic-ui-react';

class CommentBox extends Component {
  state = {
    comments: [
      {
        userName: 'Brad',
        userComment: 'Hey dude, meet me at the Blue Rhino at 9pm.'
      },
      { userName: 'John', userComment: 'Sure thing dude!' }
    ],
    comment: '',
    open: false
  };

  // { comment: '', chirpId: '' }
  // HTTP Header - Authorization: "JWT Bearer Token"
  // POST route: https://nov-chirp-backend.herokuapp.com/chirp/comment/

  // GET - returns all chirps and associated comments
  // modify current GET request to associate all comments with to each chirp
  // { userName: '', comment: '', chirpId: '', created_at: '' }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ comment: e.target.value }, () => {
      console.log(this.state.comment);
    });
  };

  submitComment = () => {
    const user = 'Chris';
    const { comment } = this.state;
    const newComment = { userName: user, userComment: comment };
    this.setState(
      { comments: this.state.comments.concat(newComment), comment: '' },
      () => {
        console.log(this.state.comments);
      }
    );
  };

  toggleBox = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { open, comments } = this.state;
    const returnComments = () => {
      if (open) {
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
      }
    };

    const returnCommentBox = () => {
      const { open } = this.state;
      if (open) {
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
                value={this.state.comment}
                onChange={this.handleChange}
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
          <Header onClick={this.toggleBox} as="h3" dividing>
            {' '}
            Comments
          </Header>
          {returnComments()}
        </Comment.Group>
        {returnCommentBox()}
      </div>
    );
  }
}

export default CommentBox;
