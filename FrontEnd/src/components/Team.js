import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import Matchup from '../containers/Matchup';
import Roster from '../containers/Roster';

const subviewComponents = {
  roster: <Roster />,
  matchup: <Matchup />
}

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'roster'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {activeItem} = this.state;
    const Subview = subviewComponents[activeItem];
    return (
      <div style={{backgroundColor: 'white'}}>
        <Menu attached='top' secondary>
          <Menu.Item name='roster' active={activeItem === 'roster'} onClick={this.handleItemClick}  />
          <Menu.Item name='matchup' active={activeItem === 'matchup'} onClick={this.handleItemClick}  />
        </Menu>
        <Container style={{paddingBottom: '25px'}}>
          {Subview}
        </Container>
      </div>
    );
  }
}

export default Team;
