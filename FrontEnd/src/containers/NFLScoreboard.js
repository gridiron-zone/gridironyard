import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class NFLScoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {},
    }
  }

  fetchScores = () => {
    fetch('http://www.nfl.com/liveupdate/scores/scores.json')
    .then(response => response.json())
    .then(scores => this.setState({scores}))
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchScores();
    this.timerId = setInterval(
      () => this.fetchScores(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { scores } = this.state;
    const games = Object.keys(scores);
    return (
      <div>
        {games.map(function(gameId, index) {
          const game = scores[gameId];
          return (
            <Table key={gameId} celled compact color={game.redzone ? 'red' : 'black'} definition fixed>
              <Table.Header>
                <Table.HeaderCell >{game.qtr === 'Final' ? game.qtr : `${game.clock} ${game.qtr}Q`}</Table.HeaderCell>
                <Table.HeaderCell width={1}>1</Table.HeaderCell>
                <Table.HeaderCell width={1}>2</Table.HeaderCell>
                <Table.HeaderCell width={1}>3</Table.HeaderCell>
                <Table.HeaderCell width={1}>4</Table.HeaderCell>
                <Table.HeaderCell width={1}>F</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{game.home.abbr}&nbsp;{game.home.abbr === game.posteam ? 'P' : ''}</Table.Cell>
                  <Table.Cell>{game.home.score['1']}</Table.Cell>
                  <Table.Cell>{game.home.score['2']}</Table.Cell>
                  <Table.Cell>{game.home.score['3']}</Table.Cell>
                  <Table.Cell>{game.home.score['4']}</Table.Cell>
                  <Table.Cell>{game.home.score['T']}</Table.Cell>
                </Table.Row>
                <Table.Row >
                  <Table.Cell>{game.away.abbr}&nbsp;{game.away.abbr === game.posteam ? 'P' : ''}</Table.Cell>
                  <Table.Cell>{game.away.score['1']}</Table.Cell>
                  <Table.Cell>{game.away.score['2']}</Table.Cell>
                  <Table.Cell>{game.away.score['3']}</Table.Cell>
                  <Table.Cell>{game.away.score['4']}</Table.Cell>
                  <Table.Cell>{game.away.score['T']}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={16}>{game.qtr && game.qtr !== 'Final' ? `${game.down} & ${game.togo}, ball on ${game.yl}` : ''}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )
        }
        )}
      </div>
    );
  }

}
