import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../containers/Login';
import League from './League';
import Team from './Team';
import Players from '../containers/Players';
import logo from '../images/gridironyard_logo.png';
import background from '../images/field.png';
import { Image, Menu, Segment } from 'semantic-ui-react';
import '../styles/App.css';

const appSubComponents = {
  league: <League />,
  team: <Team />,
  players: <Players />,
  login: <Login />
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'league',
    }
  }

  handleItemClick = (e, { name = 'login' }) => {
    console.log(name);
    this.setState({ activeItem: name });
  }

  componentDidMount() {
    fetch('/nfl_teams/api')
  }

  render() {
    const { activeItem } = this.state;
    const { user } = this.props;
    const Subview = appSubComponents[activeItem];
    return (
      <div className="App">
        <div className="App-header" style={{background: ` no-repeat top/cover url(${background})` }}>
          <Image src={logo} onClick={this.handleItemClick} />
        </div>
        <Menu attached='top' pointing tabular color='green'>
          <Menu.Item name='league' active={activeItem === 'league'} onClick={this.handleItemClick}>League</Menu.Item>
          <Menu.Item name='team' active={activeItem === 'team'} onClick={this.handleItemClick}>Team</Menu.Item>
          <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handleItemClick}>Players</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>{user.username}</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment inverted color='green'>
          {Subview}
        </Segment>
      </div>
    );
  }
}
const mapStateToProps = function(state) {
  const {userReducer} = state;
  const {loggedInUser, leagueId, teamId} = userReducer;
  return {
    user: loggedInUser,
    leagueId,
    teamId
  }
}

export default connect(mapStateToProps)(App);
