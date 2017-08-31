import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, changeView } from '../actions/actions';
import Login from '../containers/Login';
import Register from '../containers/Register';
import League from './League';
import Team from './Team';
import Players from '../containers/Players';
import logo from '../images/gridironyard_logo.png';
import background from '../images/field.png';
import { Image, Menu, Segment, Button } from 'semantic-ui-react';
import '../styles/App.css';

const appSubComponents = {
  league: League,
  team: Team,
  players: Players,
  login: Login,
  register: Register
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'login',
    }
  }

  handleItemClick = (e, data) => {
    const { changeView } = this.props;
    changeView(data.name);
  }

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const {activeItem} = this.props;
    const Subview = appSubComponents[activeItem];
    console.log(activeItem);
    const { user } = this.props;
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
            <Menu.Item>{user.username || ''}</Menu.Item>
            <Menu.Item>
              <Button disabled={!user.username} onClick={this.handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment inverted color='green'>
          {user.hasOwnProperty('username') ?
            <Subview onClick={this.handleItemClick} /> :
            <Login />}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  const { userReducer } = state;
  const { loggedInUser, leagueId, teamId, currentView, currentSubview } = userReducer;
  return {
    user: loggedInUser,
    leagueId,
    teamId,
    activeItem: currentView
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    logoutUser: function() {
      dispatch(logoutUser());
    },
    changeView: function(view) {
      dispatch(changeView(view));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
