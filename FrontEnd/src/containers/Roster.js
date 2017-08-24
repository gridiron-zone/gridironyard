import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import data from '../data/data'

class Roster extends Component {
  render() {
    const { roster } = data;
    return (
      <div className='scoreboard'>
        <h1>Roster</h1>
        <Table celled inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Position</Table.HeaderCell>
              <Table.HeaderCell >Player Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Points</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {roster.map((pos, index) => (
              <Table.Row key={index}>
                <Table.Cell className='header-text' textAlign='center' width={2}>{pos.position}</Table.Cell>
                <Table.Cell width={14}>{pos.name}</Table.Cell>
                <Table.Cell width={2} textAlign='center'>{pos.points || '0'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

}

export default Roster;
