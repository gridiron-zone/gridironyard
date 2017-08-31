import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { positionsObj } from '../data/data';
import { filterPlayers } from '../actions/actions';


class FilterPlayers extends Component {
  render() {
    const {currentPlayerFilter} = this.props;
    return (
      <div className='filter-container'>
        <Dropdown placeholder='Filter by Position'
          className='icon'
          icon='filter'
          button
          inline
          floating
          compact
          selection
          labeled
          header='Filter By Position'
          onChange={(event, data) => this.props.filterPlayers(data.value)}
          options={positionsObj}
          defaultValue={currentPlayerFilter}
          style={{color: 'black'}}
        />

      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  currentPlayerFilter: state.playerReducer.currentPlayerFilter
});

const mapDispatchToProps = function(dispatch) {
    return {
      filterPlayers: function(filter) {
        dispatch(filterPlayers(filter));
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPlayers);
