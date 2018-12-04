import React, { Component } from 'react';
import axios from 'axios';
import '../Post/Post.css';
import { Input, Button, Header, Comment, Form } from 'semantic-ui-react';

class CommentBox extends Component {
  state = {
    comments: [],
    userName: '',
    comment: '',
    chirpId: '',
    email: '',
    open: false
  };

  corsHeaders = () => {
    const cors = {};
    const token = localStorage.getItem('id_token');
    cors.headers = { Authorization: token };
    return cors;
  };

  getData = async () => {
    const url = 'its a url';
    const cors = this.corsHeaders();
    await axios
      .get(url, cors)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  postData = async () => {
    const { userName, comment, chirpId } = this.state;
    const email = JSON.parse(localStorage.getItem('_user_prof')).email;
    const data = { userName, comment, chirpId, email };
    const url = 'https://nov-chirp-backend.herokuapp.com/chirp/comment/';
    const cors = this.corsHeaders();
    await axios
      .post(url, data, cors)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  submitComment = () => {
    const user = 'Chris';
    const { comment, comments } = this.state;
    const newComment = { userName: user, userComment: comment };
    this.setState({ comments: comments.concat(newComment), comment: '' });
    this.postData();
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
