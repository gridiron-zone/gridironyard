import React from 'react';
import { Table } from 'semantic-ui-react';

export default class OffPlayerTable extends React.Component {
  render() {
    const {players} = this.props;
    return (
      <Table celled singleLine sortable inverted size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>PassYd</Table.HeaderCell>
            <Table.HeaderCell>PassTD</Table.HeaderCell>
            <Table.HeaderCell>PassINT</Table.HeaderCell>
            <Table.HeaderCell>Recs</Table.HeaderCell>
            <Table.HeaderCell>RecYds</Table.HeaderCell>
            <Table.HeaderCell>RecTDs</Table.HeaderCell>
            <Table.HeaderCell>RushYds</Table.HeaderCell>
            <Table.HeaderCell>RushTDs</Table.HeaderCell>
            <Table.HeaderCell>RetYds</Table.HeaderCell>
            <Table.HeaderCell>RetTDs</Table.HeaderCell>
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
              <Table.Cell>{player.passInt || '0'}</Table.Cell>
              <Table.Cell>{player.recs || '0'}</Table.Cell>
              <Table.Cell>{player.recYds || '0'}</Table.Cell>
              <Table.Cell>{player.recTds || '0'}</Table.Cell>
              <Table.Cell>{player.ruYds || '0'}</Table.Cell>
              <Table.Cell>{player.ruTds || '0'}</Table.Cell>
              <Table.Cell>{player.retYds || '0'}</Table.Cell>
              <Table.Cell>{player.retTds || '0'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
