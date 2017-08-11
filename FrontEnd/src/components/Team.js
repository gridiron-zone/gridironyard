import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import Matchup from '../containers/Matchup';
import Roster from '../containers/Roster';

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'lineup'
    };
  }

  render() {
    const {activeItem} = this.state;
    const {pathname} = this.props.location;
    return (
      <div>
        <Menu attached='top' secondary>
          <Menu.Item as={Link} to={`${pathname}/week/1/roster`} name='lineup' active={activeItem === 'roster'} onClick={this.handleItemClick}  />
          <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handleItemClick}  />
          <Menu.Item as={Link} to={`${pathname}/week/1/matchup`} name='matchup' active={activeItem === 'matchup'} onClick={this.handleItemClick}  />
        </Menu>
        <Segment>
          <BrowserRouter>
            <Switch>
              <Route path='/:leagueId/team/:teamId/week/:weekId/roster' component={Roster} />
              <Route path='/:leagueId/team/:teamId/week/:weekId/matchup' component={Matchup} />
            </Switch>
          </BrowserRouter>
        </Segment>
        </div>
    );
  }
}

export default Team;
