import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/gridironyard_logo.png';
import background from '../images/field.png';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'league',
      menuItems: {
        league: ['scoreboard', 'leaderboard', 'messages'],
        team: ['lineup', 'players']
      },
      leagueId: 1,
      teamId: 1
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {activeItem, leagueId, teamId } = this.state;
    return (
      <div className="App">
        <div className="App-header" style={{background: ` no-repeat top/cover url(${background})` }}>
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        </div>
          <Menu attached='top' tabular color='green'>
            <Menu.Item as={Link} to={`/${leagueId}`} name='league' active={activeItem === 'league'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to={`/${teamId}/team/${teamId}`} name='team' active={activeItem === 'team'} onClick={this.handleItemClick}   />
          </Menu>

          <Segment>
            {this.props.children}
          </Segment>


      </div>
    );
  }
}

export default App;
