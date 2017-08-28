import React, { Component } from 'react';
import { Segment, Table, Dimmer, Loader, Menu, Header, Container, Image, Feed } from 'semantic-ui-react';

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
    .then(response => response.json())
    .then(data => {
      this.setState({gameId, game: data[gameId], loading: false});
    })
    .catch(error => console.log(error));
  }


  componentDidMount() {
    const {gameId} = this.props;
    console.log(`Fetching game details for ${gameId}...`);
    this.fetchGame(gameId);
  }

  render() {
    const {game, loading, gameId} = this.state;
    if (game) {
      let downString;
      switch(game.down) {
        case '1':
          downString = '1st';
          break;
        case '2':
          downString = '2nd';
          break;
        case '3':
          downString = '3rd';
          break;
        case '4':
          downString = '4th';
          break;
        default:
          downString = '';
      }
      return (
        <Segment>
          <Dimmer active={loading}>
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
          <Table
            celled
            size='small'
          >
            <Table.Header>
              <tr >
              <Table.HeaderCell as='th' width={3}/>
              <Table.HeaderCell width={1}>1</Table.HeaderCell>
              <Table.HeaderCell width={1}>2</Table.HeaderCell>
              <Table.HeaderCell width={1}>3</Table.HeaderCell>
              <Table.HeaderCell width={1}>4</Table.HeaderCell>
              <Table.HeaderCell width={1}>F</Table.HeaderCell>
              </tr>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{game.home.abbr}&nbsp;{game.home.abbr === game.posteam ? '🏈' : ''}</Table.Cell>
                <Table.Cell>{game.home.score['1']}</Table.Cell>
                <Table.Cell>{game.home.score['2']}</Table.Cell>
                <Table.Cell>{game.home.score['3']}</Table.Cell>
                <Table.Cell>{game.home.score['4']}</Table.Cell>
                <Table.Cell>{game.home.score['T']}</Table.Cell>
              </Table.Row>
              <Table.Row >
                <Table.Cell>{game.away.abbr}&nbsp;{game.away.abbr === game.posteam ? '🏈' : ''}</Table.Cell>
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
          <Segment vertical>
            {game.qtr && game.qtr !== 'Final' ? `${downString} & ${game.togo}, ball on ${game.yl}` : ''}
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
    } else {
      return (
        <Loader active />
      )
    }
  }

}

export default GameBoard;
