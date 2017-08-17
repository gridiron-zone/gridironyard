import React from 'react';
import { Table } from 'semantic-ui-react';
import {offStatCategories} from '../data/data';

export default class OffPlayerTable extends React.Component {
  render() {
    const {players, onClick} = this.props;
    return (
      <Table celled singleLine sortable inverted size='small'>
        <Table.Header>
          <Table.Row>
            {offStatCategories.map((stat, index) => (
              <Table.HeaderCell key={index} onClick={() => onClick(stat)}>{stat}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player, index) => (
            <Table.Row key={index}>
              {offStatCategories.map((stat, index) => (
                <Table.Cell key={index} >{player[stat] || '-'}</Table.Cell>
              ))}

            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
