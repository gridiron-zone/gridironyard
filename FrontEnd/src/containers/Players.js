import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterPlayers from '../components/FilterPlayers';
import OffPlayerTable from '../components/OffPlayerTable';
import DefPlayerTable from '../components/DefPlayerTable';
import KickPlayerTable from '../components/KickPlayerTable';
import {sortPlayers, addPlayer, dropPlayer} from '../actions/actions';

// import { playerScraper } from '../data/scraper';

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

  showPlayers = () => {
    const {players, currentPlayerFilter, user} = this.props;
    if (currentPlayerFilter === 'DEF') {
      return <DefPlayerTable players={players} onClick={this.handleClick} team={user.username}/>
    } else if (currentPlayerFilter === 'K') {
      return <KickPlayerTable players={players} onClick={this.handleClick} team={user.username}/>
    } else {
      return <OffPlayerTable players={players} onClick={this.handleClick} team={user.username}/>
    }
  }

  componentDidMount() {
    // let allPlayers = [];
    fetch('/players_api')
    .then(response => response.json())
    .then(data => console.log(data));

    /*
    fetch('http://www.nfl.com/liveupdate/scores/scores.json')
    .then(response => response.json())
    .then(games => {
      Promise.all(Object.keys(games).map(gameId => {
        return fetch(`http://www.nfl.com/liveupdate/game-center/${gameId}/${gameId}_gtd.json`)
        .then(response => response.json());
      })).then(data => {
        data.forEach(game => {
          const {nextupdate, ...data} = game;
          allPlayers = allPlayers.concat(playerScraper(game[Object.keys(game)[0]]));
        });
      });
    }).then(() => console.log(JSON.stringify(allPlayers)));
    */
  }

  render() {
    return (
      <div>
        <FilterPlayers />
        <h3>Players:</h3>
        {this.showPlayers()}
      </div>
    );
  }

}

// use mapStateToProps to filter/sort player list
const mapStateToProps = function(state) {
  let players;
  const flexPositions = ['WR', 'RB', 'TE'];
  const offensePositions = ['QB', 'RB', 'WR', 'TE'];
  const {currentPlayerFilter, sortPlayersBy, sortAscending} = state.playerReducer;
  const {loggedInUser} = state.userReducer;
  switch (currentPlayerFilter) {
    case 'QB':
    case 'RB':
    case 'WR':
    case 'TE':
    case 'K':
    case 'DEF':
      players = state.playerReducer.players.filter(player => player.position === currentPlayerFilter);
      break;
    case 'FLEX':
      players = state.playerReducer.players.filter(player => flexPositions.includes(player.position));
      break;
    case 'OFFENSE':
      players = state.playerReducer.players.filter(player => offensePositions.includes(player.position));
      break;
    default:
      players = state.playerReducer.players.map(player => player);
  }

  return {players, currentPlayerFilter, sortPlayersBy, sortAscending, user: loggedInUser};
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

export default connect(mapStateToProps, mapDispatchToProps)(Players);
