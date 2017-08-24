import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import R from 'ramda';
import { loginUser } from '../actions/actions';


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
  handleSubmit = () => {
    const {loginUser} = this.props;
    loginUser(this.state);
  }

  render() {
    const { userId, password } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Email' name='email' type='email' value={userId} onChange={this.handleChange} />
            <Form.Input placeholder='Password' name='password' type='password' value={password} onChange={this.handleChange} />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
        <Button color='blue' onClick={onClick} >Or, Sign Up!</Button>
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
