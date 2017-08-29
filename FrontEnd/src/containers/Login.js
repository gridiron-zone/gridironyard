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
      userId: '',
      password: ''
    }
  }

  handleChange = key => event => {
    this.setState(R.assoc(key, event.target.value, this.state));
  }
  handleLogin = () => {
    const {loginUser} = this.props;
    loginUser(this.state);
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
              <Form.Input placeholder='Email' name='email' type='email' value={userId} onChange={this.handleChange} />
              <Form.Input placeholder='Password' name='password' type='password' value={password} onChange={this.handleChange} />
              <Form.Button content='Log In' />
            </Form.Group>
          </Form>
        </Segment>
        <Divider horizontal>OR SIGN UP</Divider>
        <Segment style={{alignItems: 'center'}}>
          <Register />
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
