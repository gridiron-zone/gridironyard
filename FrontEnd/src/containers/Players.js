import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Rating } from 'semantic-ui-react';
import FilterPlayers from '../components/FilterPlayers';
import sortPlayers from '../actions/actions';

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortPlayersBy: null,
      sortDirection: null,
      sortType: 'alpha'
    }
  }
  handleClick = (key, order) => {
    const {sortPlayersBy, sortDirection} = this.state;
    if (key !== sortPlayersBy) {
      sortPlayers(sortPlayersBy, order);
    } else {
      sortPlayers(sortPlayersBy, order === 'ascending' ? 'descending' : 'ascending');
    }
  }

  render() {
    const {players} = this.props;

    return (
      <div>
        <FilterPlayers />
        <h3>Players:</h3>
        <Table celled singleLine sortable inverted size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>PassYd</Table.HeaderCell>
              <Table.HeaderCell>PassTD</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {players.map((player, index) => (
              <Table.Row key={index}>
                <Table.Cell>{player.position}</Table.Cell>
                <Table.Cell>#{player.jersey_number}&nbsp;{player.name}</Table.Cell>
                <Table.Cell>{player.team}</Table.Cell>
                <Table.Cell>{player.owner || 'FA'}</Table.Cell>
                <Table.Cell>{player.passYds || '0'}</Table.Cell>
                <Table.Cell>{player.passTDs || '0'}</Table.Cell>
                <Table.Cell><Rating icon='star' defaultRating={5} maxRating={5}/></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

}

// use mapStateToProps to filter/sort player list
const mapStateToProps = function(state) {
  let players;
  const {currentPlayerFilter} = state;
  switch (currentPlayerFilter) {
    case 'QB':
    case 'RB':
    case 'WR':
    case 'TE':
    case 'K':
    case 'DEF':
      players = state.players.filter(player => player.position === currentPlayerFilter);
      break;
    default:
      players = state.players.map(player => player);
  }

  return {players};
}

const mapDispatchToProps = function(dispatch) {
  return {
    sortPlayers: function(sortBy) {
      dispatch(sortPlayers(sortBy, sortDirection));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
