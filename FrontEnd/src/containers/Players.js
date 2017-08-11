import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Rating } from 'semantic-ui-react';


class Players extends Component {

  render() {
    const {players} = this.props;

    return (
      <div>
        <h3>Players:</h3>
        <Table celled padded inverted size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {players.map(player => (
              <Table.Row>
                <Table.Cell>{player.jersey_number}</Table.Cell>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.team}</Table.Cell>
                <Table.Cell><Rating icon='star' defaultRating={5} maxRating={5}/></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

}

// use mapStateToProps to filter player list
const mapStateToProps = function(state) {
  let players;
  const {currentFilter} = state;
  switch (currentFilter) {
    case 'QB':
    case 'RB':
    case 'WR':
    case 'TE':
    case 'K':
    case 'DEF':
      players = state.players.filter(player => player.position === currentFilter);
    default:
      players = state.players.map(player => player);
  }
  return {players};
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Players);
