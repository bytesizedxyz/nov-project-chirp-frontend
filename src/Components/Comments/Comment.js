import React, { Component } from 'react';
import axios from 'axios';
import '../Post/Post.css';
import { Input, Button, Header, Comment, Form } from 'semantic-ui-react';
import Gravatar from 'gravatar-react';

class CommentBox extends Component {
  state = {
    comments: [],
    user: JSON.parse(localStorage.getItem('_user_prof')).user,
    email: JSON.parse(localStorage.getItem('_user_prof')).email,
    token: localStorage.getItem('id_token'),
    comment: '',
    open: false
  };

  corsHeaders = () => {
    const { token } = this.state;
    const cors = {};
    cors.headers = { Authorization: token };
    return cors;
  };

  getData = async () => {
    const { comments } = this.state;
    const url = 'http://www.itsaurl.com';
    const cors = this.corsHeaders();
    await axios
      .get(url, cors)
      .then(res => {
        console.log(res);
        this.setState({ comments: comments.concat(res.body) });
      })
      .catch(err => {
        console.log(err);
      });
  };

  postData = async () => {
    const { userName, comment, chirpId, email } = this.state;
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
    const { comment, comments, user } = this.state;
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
            const email = 'email@gmail.com';
            const { userComment, userName, chirpId, createdAt } = comment;
            return (
              <Comment key={`${chirpId}`} data-testid="comments">
                <span style={{ display: 'flex' }}>
                  <Gravatar
                    email={email}
                    size={35}
                    rating="PG"
                    alt="Profile Avatar"
                    default="monsterid"
                    secure
                  />
                  <Comment.Content style={{ paddingLeft: '15px' }}>
                    <Comment.Author style={{ fontSize: '18px' }} as="a">
                      {userName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{createdAt}</div>
                    </Comment.Metadata>
                    <Comment.Text style={{ paddingLeft: '10px' }}>
                      {userComment}
                    </Comment.Text>
                  </Comment.Content>
                </span>
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
