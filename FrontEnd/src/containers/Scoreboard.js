import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import {schedule} from '../data/data';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: 0
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

  render() {
    const {week} = this.state;
    return (
      <div className='scoreboard'>
        <h1 style={{color: 'black'}}>League Name Scoreboard:</h1>
        <Button onClick={this.handleClick('dec')} size='tiny' icon='arrow left' />
        Week {week + 1}
        <Button onClick={this.handleClick('inc')} size='tiny' icon='arrow right' />
        {schedule[week].map((matchup, index) => (
          <Table basic celled key={index} color='black' inverted>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={8}>{matchup[0]}</Table.Cell>
                <Table.Cell width={4}>0</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{matchup[1]}</Table.Cell>
                <Table.Cell>0</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))}
      </div>
    );
  }

}

export default Scoreboard;
