import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Menu, Header, Container, Image, Feed } from 'semantic-ui-react';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: null,
      gameId: ''
    };
  }

  fetchGame = (gameId) => {
    this.setState({loading: true});
    fetch(`http://www.nfl.com/liveupdate/game-center/${gameId}/${gameId}_gtd.json`)
    .then(function(response) {
      console.log(response.status);
      if (response.status === 200) return response.json();
      else throw new Error(`Responsed ${response.status}: Something wrong with that game ID`);
    })
    .then(data => {
      this.setState({gameId, game: data[gameId], loading: false});
    })
    .catch(error => console.log(error.message));
  }


  componentDidMount() {
    const {gameId} = this.props;
    this.fetchGame(gameId);
    this.timerId = setInterval(
      () => this.fetchGame(gameId),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {game, loading} = this.state;

    if (game && Object.keys(game).length > 0) {
      let lastPlay;
      if (game.qtr !== 'Pregame') {
        const lastDrive = game.drives[game.drives.crntdrv];
        lastPlay = lastDrive.plays[Object.keys(lastDrive.plays).pop()];
      } else {
        lastPlay = 'Pregame';
      }
      // const gameDate = `${gameId.slice(0,4)}-${gameId.slice(4,6)}-${gameId.slice(6,8)} GMT-0400`;
      // const gameDateObj = new Date(gameDate);
      // const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      const downString = ['', '1st', '2nd', '3rd', '4th'];

      return (
        <Segment>
          <Dimmer inverted active={loading}>
            <Loader />
          </Dimmer>
          <Menu fluid size='huge' widths={4} compact>
            <Menu.Item>
              <Header size='large'>{game.home.abbr}</Header>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.home.abbr}.png`}
                alt='home logo'
                verticalAlign='middle'
                inline />
            </Menu.Item>
            <Menu.Item>
              <Header size='huge'>{game.home.score['T']}</Header>
            </Menu.Item>
            <Menu.Item>
              <Header size='huge'>{game.away.score['T']}</Header>
            </Menu.Item>
            <Menu.Item>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.away.abbr}.png`}
                alt='away logo'
                verticalAlign='middle'
                inline />
              <Header size='large'>{game.away.abbr}</Header>
            </Menu.Item>
          </Menu>

          <Container textAlign='center'>
            <Header size='large'>{game.clock}</Header>
            <Segment vertical>
              {game.qtr && game.qtr !== 'Final' ? `${downString[game.down || 1]} & ${game.togo}, ball on ${game.yl}` : ''}
              <Header size='small'>Last Play:</Header>
              <span style={{fontWeight: 'bold'}}>{lastPlay.posteam}</span>: {lastPlay.desc}
            </Segment>
            <Segment vertical>
              <Header size='small'>Scoring Summary:</Header>
              <Feed>
              {Object.keys(game.scrsummary).map((play, idx) => {
                const drive = game.scrsummary[play];
                const { type, desc, qtr, team } = drive;
                return (
                  <Feed.Event key={idx}>
                    <Feed.Label>
                      <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${team}.png`} size='tiny' alt='logo' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User>{type}&nbsp;{team}</Feed.User> {desc}
                        <Feed.Date>{qtr} QTR</Feed.Date>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                )}
              )}
              </Feed>
            </Segment>
          </Container>
        </Segment>
      )
    } else if (loading) {
      return (
        <Loader active />
      )
    } else {
      return (
        <div>
          <Header size='medium'>Check again at game time!</Header>
        </div>
      )
    }
  }

}

export default GameBoard;
