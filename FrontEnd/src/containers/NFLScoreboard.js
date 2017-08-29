import React, { Component } from 'react';
import { Container, Accordion } from 'semantic-ui-react';
import NFLGameSummary from './NFLGameSummary';
import GameBoard from './GameBoard';

export default class NFLScoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {},
      activeGames: 0,
      selectedGame: null
    }
  }

  fetchScores = () => {
    console.log('Fetching scores...');
    fetch('http://www.nfl.com/liveupdate/scores/scores.json')
    .then(response => response.json())
    .then(scores => {
      const activeGames = Object.keys(scores).reduce((total, game) => {
        if (scores[game].qtr !== null && scores[game].qtr !== 'Pregame' && scores[game].qtr !== 'Final') total++;
        return total;
      }, 0)
      this.setState({scores, activeGames});
    })
    .catch(error => console.log(error));
  }

  selectGame = (id) => {
    console.log(id);
    this.setState({selectedGame: id });
  }

  componentDidMount() {
    this.fetchScores();
    this.timerId = setInterval(
      () => this.fetchScores(),
      this.state.activeGames > 0 ? 5000 : 60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let { scores, selectedGame } = this.state;
    const games = Object.keys(scores);

    return (
      <div>
        <h1>NFL Games this week:</h1>
          {games.map((gameId, index) =>
            (
              <Accordion key={gameId}>
                <Accordion.Title>
                <NFLGameSummary
                  game={scores[gameId]}
                  gameId={gameId}
                  onClick={this.selectGame}/>
                </Accordion.Title>
                <Accordion.Content>
                  <GameBoard gameId={gameId} />
                </Accordion.Content>
              </Accordion>
            )
          )}

      </div>
    );
  }

}
