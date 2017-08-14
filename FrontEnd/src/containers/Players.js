import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterPlayers from '../components/FilterPlayers';
import OffPlayerTable from '../components/OffPlayerTable';
import {sortPlayers} from '../actions/actions';

class Players extends Component {

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
    const {players} = this.props;

    return (
      <div>
        <FilterPlayers />
        <h3>Players:</h3>
        <OffPlayerTable players={players} onClick={this.handleClick}/>
      </div>
    );
  }

}

// use mapStateToProps to filter/sort player list
const mapStateToProps = function(state) {
  let players;
  const flexPositions = ['WR', 'RB', 'TE'];
  const {currentPlayerFilter, sortPlayersBy, sortAscending} = state;
  switch (currentPlayerFilter) {
    case 'QB':
    case 'RB':
    case 'WR':
    case 'TE':
    case 'K':
    case 'DEF':
      players = state.players.filter(player => player.position === currentPlayerFilter);
      break;
    case 'FLEX':
      players = state.players.filter(player => flexPositions.includes(player.position));
      break;
    default:
      players = state.players.map(player => player);
  }

  return {players, sortPlayersBy, sortAscending};
}



const mapDispatchToProps = function(dispatch) {
  return {
    sortPlayers: function(sortBy, sortAscending) {
      dispatch(sortPlayers(sortBy, sortAscending));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
