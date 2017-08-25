import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      team: '',

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
    fetch('/users',
    {
      method: 'POST',
      headers: {
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
    return (
      <div style={{width: '50%'}}>
        <Form onSubmit={this.handleSubmit}><Header>Sign Up!</Header>
          <Form.Input label='Username' type='text' onChange={this.handleChange('username')}/>
          <Form.Group widths='equal'>
            <Form.Input label='Enter Password' type='password' onChange={this.handleChange('password')} />
            <Form.Input label='Confirm Password' type='password' onChange={this.handleChange('password_confirmation')} />
          </Form.Group>
          <Form.Input label='Team Name' type='text' onChange={this.handleChange('team')} />
          <Button type="submit" color='blue'>Submit</Button>
        </Form>
      </div>
    );
  }

}
