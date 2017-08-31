import React, { Component } from 'react';
import { Table, Button, Image } from 'semantic-ui-react';

class NFLGameSummary extends Component {
  render() {
    const {game, gameId, onClick} = this.props;
    const gameDate = `${gameId.slice(0,4)}-${gameId.slice(4,6)}-${gameId.slice(6,8)} GMT-0400`;
    const gameDateObj = new Date(gameDate);
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <Table
        celled
        color={game.redzone ? 'red' : 'black'}
        inverted
        size='small'
      >
        <Table.Header>
          <tr >
          <Table.HeaderCell as='th' style={{backgroundColor: '#333333'}}>
            {game.clock !== null ?
              <span style={{margin: '0 10px'}}>{game.qtr === 'Final' ? game.qtr : `${game.clock} ${game.qtr}Q`}</span> :
              <span style={{margin: '0 10px'}}>{game.stadium} &mdash; {`${gameDateObj.toLocaleString('en-US', options)}`}</span>
            }

            <Button compact size='mini' inverted onClick={() => onClick(gameId)} >Game Board</Button>
          </Table.HeaderCell>
          <Table.HeaderCell width={1}>1</Table.HeaderCell>
          <Table.HeaderCell width={1}>2</Table.HeaderCell>
          <Table.HeaderCell width={1}>3</Table.HeaderCell>
          <Table.HeaderCell width={1}>4</Table.HeaderCell>
          <Table.HeaderCell width={1}>F</Table.HeaderCell>
          </tr>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.home.abbr}.png`}
                alt='home logo'
                size='mini'
                verticalAlign='middle'
                inline />
              {game.home.abbr}&nbsp;{game.home.abbr === game.posteam ? '🏈' : ''}</Table.Cell>
            <Table.Cell>{game.home.score['1']}</Table.Cell>
            <Table.Cell>{game.home.score['2']}</Table.Cell>
            <Table.Cell>{game.home.score['3']}</Table.Cell>
            <Table.Cell>{game.home.score['4']}</Table.Cell>
            <Table.Cell>{game.home.score['T']}</Table.Cell>
          </Table.Row>
          <Table.Row >
            <Table.Cell>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.away.abbr}.png`}
                alt='home logo'
                size='mini'
                verticalAlign='middle'
                inline />
              {game.away.abbr}&nbsp;{game.away.abbr === game.posteam ? '🏈' : ''}</Table.Cell>
            <Table.Cell>{game.away.score['1']}</Table.Cell>
            <Table.Cell>{game.away.score['2']}</Table.Cell>
            <Table.Cell>{game.away.score['3']}</Table.Cell>
            <Table.Cell>{game.away.score['4']}</Table.Cell>
            <Table.Cell>{game.away.score['T']}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='6' width={16}>{game.qtr && game.qtr !== 'Final' ? `${game.down} & ${game.togo}, ball on ${game.yl}` : ''}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default NFLGameSummary;
