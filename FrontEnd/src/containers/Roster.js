import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Label } from 'semantic-ui-react';
import data from '../data/data';
import { addPlayer, dropPlayer, sortPlayers } from '../actions/actions';
import OffPlayerTable from '../components/OffPlayerTable';
import DefPlayerTable from '../components/DefPlayerTable';
import KickPlayerTable from '../components/KickPlayerTable';

class Roster extends Component {
  handleClick = (key) => {
    const { sortPlayers, sortPlayersBy, sortAscending} = this.props;
    console.log(key);
    if (key !== sortPlayersBy) {
      sortPlayers(key, true);
    } else {
      sortPlayers(key, !sortAscending);
    }
  }

  render() {
    const { players, user } = this.props;
    const offensePositions = ['QB', 'RB', 'WR', 'TE'];
    const offense = players.filter(player => offensePositions.includes(player.position));
    const defense = players.filter(player => player.position === 'DEF');
    const kicker = players.filter(player => player.position === 'K');

    return (
      <div className='scoreboard'>
        <h1>Roster</h1>
        <Segment.Group>
          <Segment padded>
            <Label attached='top' color='black' size='large'>Offense</Label>
            <OffPlayerTable players={offense} onClick={this.handleClick} team={user.username}/>
          </Segment>
          <Segment padded>
            <Label attached='top' color='black' size='large'>Defense</Label>
            <DefPlayerTable players={defense} onClick={this.handleClick} team={user.username}/>
          </Segment>
          <Segment padded>
            <Label attached='top' color='black' size='large'>Kicker</Label>
            <KickPlayerTable players={kicker} onClick={this.handleClick} team={user.username}/>
          </Segment>
        </Segment.Group>
      </div>
    );
  }

}

const mapStateToProps = function(state) {
  const {playerReducer, userReducer} = state;
  const {loggedInUser} = userReducer;
  const {players, addPlayer, dropPlayer} = playerReducer;
  return {
    players: players.filter(player => player.owner === loggedInUser.username),
    addPlayer,
    dropPlayer,
    user: loggedInUser
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
    sortPlayers: function(sortBy, sortAscending) {
      dispatch(sortPlayers(sortBy, sortAscending));
    },
    addPlayer: function(team, player) {
      dispatch(addPlayer(team, player));
    },
    dropPlayer: function(player) {
      dispatch(dropPlayer(player));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
