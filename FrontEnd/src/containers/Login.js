import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Segment, Divider } from 'semantic-ui-react';
import R from 'ramda';
import { loginUser } from '../actions/actions';
import Register from './Register';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e, data) => {
    this.setState(R.assoc(data.name, data.value, this.state));
  }
  handleLogin = () => {
    const {loginUser} = this.props;
    const {username} = this.state;
    loginUser({username});
  }

  handleRegister = () => {

  }

  render() {
    const { userId, password } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        <Divider horizontal>LOG IN TO YOUR TEAM</Divider>
        <Segment style={{margin: 'auto'}}>
          <Form onSubmit={this.handleLogin}>
            <Form.Group>
              <Form.Input placeholder='User Name' name='username' type='text' value={userId} onChange={this.handleChange} />
              <Form.Input placeholder='Password' name='password' type='password' value={password} onChange={this.handleChange} />
              <Form.Button content='Log In' />
            </Form.Group>
          </Form>
        </Segment>
        <Divider horizontal>OR SIGN UP</Divider>
        <Segment style={{alignItems: 'center'}}>
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
