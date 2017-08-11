// grab our fake data
import data from '../data/data';
// action import
import { FILTER_PLAYERS,
  filterPlayers } from '../actions/actions';

const initialState = {
  players: data.players,
  loggedInUser: data.users[0],
  currentFilter: ''
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case FILTER_PLAYERS:
      return {
          ...state,
          currentFilter: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
