import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Segment, Divider, Message } from 'semantic-ui-react';
import R from 'ramda';
import { loginUser } from '../actions/actions';
import Register from './Register';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      },
      error: false
    }
  }

  handleChange = (e, data) => {
    const { user } = this.state;
    this.setState(R.assocPath(['user', data.name], data.value, this.state));
    this.setState({error: false});
  }

  handleLogin = () => {
    const {loginUser} = this.props;
    const {user} = this.state;
    fetch('/users/',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(user => {
      if (!user.error) {
        this.setState({error: false})
        loginUser(user);
      } else {
        this.setState({error: true});
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
    });
  }

  handleRegister = (form) => {
    const {loginUser} = this.props;
    fetch('/users/new/',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
        loginUser(data);
      }
    )
    .catch(error => console.log(error.json()));
  }

  render() {
    const { user, error } = this.state;
    const { username, password } = user;
    const { onClick } = this.props;
    return (
      <div style={{height: 'calc(100vh - 250px)'}}>
        <Divider horizontal>LOG IN TO YOUR TEAM</Divider>
        <Segment color='grey'>
          <div style={{width: '100%'}}>
          <Form style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}} onSubmit={this.handleLogin} error={error}>
            <Form.Group>
              <Form.Input placeholder='User Name' name='username' type='text' value={username} onChange={this.handleChange} autoFocus/>
              <Form.Input placeholder='Password' name='password' type='password' value={password} onChange={this.handleChange} />
              <Form.Button content='Log In' />
            </Form.Group>
            <Message
              error
              header='Login Failed'
              content="Username and password don't match."
              style={{flexGrow: '1', flexBasis: '100%'}}
            />
          </Form>
          </div>
        </Segment>
        <Divider horizontal>OR SIGN UP</Divider>
        <Segment color="blue" style={{alignItems: 'center'}}>
          <Register onSubmit={this.handleRegister}/>
        </Segment>

      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userId, password) => dispatch(loginUser(userId, password))
  }
};

export default connect(null, mapDispatchToProps)(Login);
