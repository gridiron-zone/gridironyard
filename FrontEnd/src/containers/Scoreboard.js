import React, { Component } from 'react';
import { Button, Table, Transition, Header } from 'semantic-ui-react';
import {schedule} from '../data/data';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: 0,
      scores: [
        [0, 0, true, true],
        [0, 0, true, true],
        [0, 0, true, true],
        [0, 0, true, true],
        [0, 0, true, true]
      ],
    }
  }

  handleClick = (key) => (event) => {
    const {week} = this.state;
    switch(key) {
      case 'inc':
         if (week < schedule.length - 1) this.setState({week: week + 1});
        break;
      case 'dec':
        if (week > 0) this.setState({week: week - 1});
        break;
      default:
        break;
    }
  }

  toggleVisibility = (row, team) => {
    const { scores } = this.state;
    scores[row][team] = !this.state.scores[row][team];
    this.setState({ ...this.state, scores })
  }

  randomScoreChange = (event) => {
    const { scores } = this.state;
    const row = Math.floor(Math.random() * scores.length);
    const team = Math.round(Math.random());
    scores[row][team] += 1;
    this.setState({
      ...this.state,
      scores
    });
    this.toggleVisibility(row, (team + 2));
  }

  render() {
    const { week, scores } = this.state;
    return (
      <div className='scoreboard'>
        <Header size='large' style={{color: 'black'}}>League Name Scoreboard:</Header>
        <Button onClick={this.handleClick('dec')} size='tiny' icon='arrow left' />
        Week {week + 1}
        <Button onClick={this.handleClick('inc')} size='tiny' icon='arrow right' />
        {schedule[week].map((matchup, index) => (
          <Table basic celled key={index} color='black' inverted>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={8}>{matchup[0]}</Table.Cell>
                <Table.Cell style={{padding: '0px'}} textAlign='center' className='two wide'>
                  <Transition
                    animation='flash'
                    duration={1000}
                    visible={scores[index][2]}>
                    <span className='score-box'>{scores[index][0]}</span>
                  </Transition>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{matchup[1]}</Table.Cell>
                <Table.Cell style={{padding: '0px'}} textAlign='center' >
                  <Transition
                    animation='flash'
                    duration={1000}
                    visible={scores[index][3]}>
                    <div className='score-box'>{scores[index][1]}</div>
                  </Transition>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))}
        <Button onClick={this.randomScoreChange} size='tiny' icon='random' />
      </div>
    );
  }

}

export default Scoreboard;
