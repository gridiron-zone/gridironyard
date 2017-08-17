import React from 'react';
import { Table } from 'semantic-ui-react';
import {kickStatCategories} from '../data/data';

export default class KickPlayerTable extends React.Component {
  render() {
    const {players, onClick} = this.props;
    return (
      <Table celled singleLine sortable inverted size='small'>
        <Table.Header>
          <Table.Row>
            {kickStatCategories.map((stat, index) => (
              <Table.HeaderCell key={index} onClick={() => onClick(stat)}>{stat}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player, index) => (
            <Table.Row key={index}>
              {kickStatCategories.map(stat => (
                <Table.Cell key={stat}>{player[stat] || '-'}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
