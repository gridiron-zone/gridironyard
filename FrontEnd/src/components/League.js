import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import Leaderboard from '../containers/Leaderboard';
import Scoreboard from '../containers/Scoreboard';
import Messages from './Messages';

const components = {
  leaderboard: <Leaderboard />,
  scoreboard: <Scoreboard />,
  messages: <Messages />
};

class League extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'leaderboard',
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const Subview = components[activeItem];
    return (
      <div style={{backgroundColor: 'white', border: '1px solid gray', borderRadius: '5px'}}>
        <Menu attached='top' secondary>
          <Menu.Item name='leaderboard' active={activeItem === 'leaderboard'} onClick={this.handleItemClick}  />
          <Menu.Item name='scoreboard' active={activeItem === 'scoreboard'} onClick={this.handleItemClick}  />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}  />
        </Menu>
        <Container style={{paddingBottom: '25px'}}>
          {Subview}
        </Container>
      </div>
    );
  }

}

export default League;
