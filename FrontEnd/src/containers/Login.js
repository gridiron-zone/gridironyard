import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Divider, Message } from 'semantic-ui-react';
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
      loginerror: false,
      registererror: false
    }
  }

  handleChange = (e, data) => {
    this.setState(R.assocPath(['user', data.name], data.value, this.state));
    this.setState({loginerror: false, registererror: false});
  }

  handleLogin = () => {
    const {loginUser} = this.props;
    const {user} = this.state;
    fetch('https://gridironyard-api.herokuapp.com/users/',
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(user => {
      if (!user.error) {
        this.setState({loginerror: false})
        loginUser(user);
      } else {
        this.setState({loginerror: true});
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({loginerror: true});
    });
  }

  handleRegister = (form) => {
    const {loginUser} = this.props;
    fetch('https://gridironyard-api.herokuapp.com/users/new/',
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        this.setState({registererror: true});
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
      if (data) loginUser(data);
      }
    )
    .catch(error => console.log(error));
  }

  render() {
    const { user, loginerror, registererror } = this.state;
    const { username, password } = user;
    // const { onClick } = this.props;
    return (
      <div style={{height: 'calc(100vh - 250px)'}}>
        <Divider horizontal>LOG IN TO YOUR TEAM</Divider>
        <Segment color='grey'>
          <div style={{width: '100%'}}>
          <Form style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}} onSubmit={this.handleLogin} error={loginerror}>
            <Form.Group>
              <Form.Input placeholder='User Name' name='username' type='text' value={username} onChange={this.handleChange} autoFocus/>
              <Form.Input placeholder='Password' name='password' type='password' value={password} onChange={this.handleChange} />
              <Form.Button content='Log In' />
            </Form.Group>
            <Message
              error
              header='Login Failed'
              content="Username and password don't match. If you don't have an account, create one below!"
              style={{flexGrow: '1', flexBasis: '100%'}}
            />
          </Form>
          </div>
        </Segment>
        <Divider horizontal>OR SIGN UP</Divider>
        <Segment color="blue" style={{alignItems: 'center'}}>
          <Register onSubmit={this.handleRegister} error={registererror}/>
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
