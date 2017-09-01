import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, dropPlayer } from '../actions/actions';
import { Table, Icon } from 'semantic-ui-react';
import { defStatCategories } from '../data/data';

class DefPlayerTable extends React.Component {
  render() {
    const {players, onClick, team, addPlayer, dropPlayer} = this.props;
    return (
      <Table celled singleLine sortable inverted size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {defStatCategories.map((stat, index) => (
              <Table.HeaderCell key={index} onClick={() => onClick(stat)} >{stat}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                {player.owner ?
                  <Icon name='minus' bordered circular color='black' inverted onClick={() => dropPlayer(player)}/> :
                  <Icon name='add' bordered circular color='black' inverted onClick={() => addPlayer(team, player)}/>}
              </Table.Cell>
              {defStatCategories.map((stat) => (
                <Table.Cell key={stat} >{player[stat] || '-'}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
    addPlayer: function(team, player) {
      dispatch(addPlayer(team, player));
    },
    dropPlayer: function(player) {
      dispatch(dropPlayer(player));
    }
  }
}
export default connect(null, mapDispatchToProps)(DefPlayerTable);
