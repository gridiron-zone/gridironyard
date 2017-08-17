import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import data from '../data/data'

class Roster extends Component {
  render() {
    const { roster } = data;
    return (
      <div className='scoreboard'>
        <h1>Roster</h1>
        <Table>
          <Table.Header>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Player Name</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
          </Table.Header>

            {roster.map((pos, index) => (
              <Table.Row key={index}>
                <Table.Cell>{pos.position}</Table.Cell>
                <Table.Cell>{pos.name}</Table.Cell>
                <Table.Cell>{pos.points || '0'}</Table.Cell>
              </Table.Row>
            ))}

        </Table>
      </div>
    );
  }

}

export default Roster;
