import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Header, Container, Segment, Icon, Feed, Form, TextArea, Button } from 'semantic-ui-react';
import moment from 'moment';
import { addMessage } from '../actions/actions';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBody: ''
    }
  }

  handleChange = (event, data) => {
    this.setState({messageBody: data.value});
  }

  handleSubmit = () => {
    const { user, addMessage, messages } = this.props;
    const {messageBody} = this.state;
    const message = {};
    message.body = messageBody;
    message.user = user;
    message.date = moment();
    addMessage(message);
    this.setState({messageBody: ''});
  }

  componentDidMount () {
    // here, fetch the messages from the server
  }

  render() {
    const { messageBody } = this.state;
    const { user, messages } = this.props;
    return (
      <Container>
        <Header>Messages</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>New Message</label>
            <TextArea value={messageBody} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Button content='Submit' />
        </Form>
        <Feed>
          {messages.map((message, idx) => (
            <Feed.Event key={idx}>
              <Feed.Label><Icon name='user circle' /></Feed.Label>
              <Feed.Content date={message.date.fromNow()} summary={message.body} />
              <Feed.Meta>Posted By: <Feed.User>{message.user.username}</Feed.User></Feed.Meta>
            </Feed.Event>
          ))}
        </Feed>

      </Container>
    );
  }

}

const mapStateToProps = function(state) {
  const { userReducer, leagueReducer } = state;
  const { loggedInUser, leagueId, teamId } = userReducer;
  const { messages } = leagueReducer;
  return {
    user: loggedInUser,
    leagueId,
    teamId,
    messages
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addMessage: function(message) {
      dispatch(addMessage(message));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
