import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';


class League extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'leaderboard',
      menuItems: {
        league: ['scoreboard', 'leaderboard', 'messages'],
        team: ['lineup', 'players']
      }
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu attached='top' secondary>
          <Menu.Item name='scoreboard' active={activeItem === 'scoreboard'} onClick={this.handleItemClick}  />
          <Menu.Item name='leaderboard' active={activeItem === 'leaderboard'} onClick={this.handleItemClick}  />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}  />
        </Menu>
        <Segment>
          {this.props.children}
        </Segment>
      </div>
    );
  }

}

export default League;
