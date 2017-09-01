import React, { Component } from 'react';
import { Form, Button, Header, Message } from 'semantic-ui-react';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',

    };
  }

  handleChange = (key) => (event, data) => {
    const state = this.state;
    this.setState({
      ...state,
      [key]: data.value
    })
  }

  handleSubmit = () => {
    const form = this.state;
    console.log(form);
    fetch('https://gridironyard-api.herokuapp.com/users/new/',
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      }
    )
    .catch(error => console.log(error.json()));
  }

  render() {
    const {onSubmit, error} = this.props;
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Form color='blue' onSubmit={() => onSubmit(this.state)} error={error}><Header>New Player:</Header>
          <Form.Input placeholder='Username' type='text' onChange={this.handleChange('username')}/>
          <Form.Input placeholder='Email Address' type='email' onChange={this.handleChange('email')} />
          <Form.Group widths='equal'>
            <Form.Input placeholder='Enter Password' type='password' onChange={this.handleChange('password')} />
            <Form.Input placeholder='Confirm Password' type='password' onChange={this.handleChange('password_confirmation')} />
          </Form.Group>
          <Message
            error
            header='Registration Failed'
            content="Please check your info, and make sure your passwords match."
            style={{flexGrow: '1', flexBasis: '100%'}}
          />

          <Button type="submit" color='blue'>Sign Up</Button>
        </Form>
      </div>
    );
  }

}
