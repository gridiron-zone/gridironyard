import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { positionsObj } from '../data/data';
import { filterPlayers } from '../actions/actions';


class FilterPlayers extends Component {
  render() {

    return (
      <div className='filter-container'>
        <Dropdown placeholder='Filter by Position'
          icon='filter'
          className='icon'
          fluid
          compact
          selection
          onChange={(event, data) => this.props.filterPlayers(data.value)}
          options={positionsObj} />

      </div>
    );
  }

}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = function(dispatch) {
    return {
      filterPlayers: function(filter) {
        dispatch(filterPlayers(filter));
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPlayers);
