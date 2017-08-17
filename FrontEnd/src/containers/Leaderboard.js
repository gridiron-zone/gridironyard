import React, { Component } from 'react';
import { Table, Header, Icon } from 'semantic-ui-react';
import data from '../data/data';


class Leaderboard extends Component {
  render() {
    const {users} = data;
    return (
      <div>
        <h1 style={{color: 'black'}}>League Name Standings</h1>
        <Table celled singleLine sortable inverted size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>Record</Table.HeaderCell>
              <Table.HeaderCell>Points</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Header as='h4' style={{color: 'white'}}>
                    <Icon name='empty star' size='tiny' />
                    <Header.Content>{user.team || `${user.username}'s Team`}</Header.Content>
                    <Header.Subheader  style={{color: 'gray'}}>{user.username}</Header.Subheader>
                  </Header>
                </Table.Cell>
                <Table.Cell>{user.record || '0 - 0'}</Table.Cell>
                <Table.Cell>{user.points || '0'}</Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table>
      </div>
    );
  }

}

export default Leaderboard;
