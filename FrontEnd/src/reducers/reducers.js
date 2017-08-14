import R from 'ramda';
// grab our fake data
import data from '../data/data';
// action import

const initialState = {
  players: data.players,
  loggedInUser: data.users[0],
  currentView: 'league',
  currentSubView: 'scoreboard',
  currentPlayerFilter: 'ALL',
  sortPlayersBy: 'rank',
  sortAscending: true,
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'FILTER_PLAYERS':
      return {
          ...state,
          currentPlayerFilter: action.payload
      }
    case 'SORT_PLAYERS':
      console.log(action);
      const sortPlayers = R.sortBy(R.propOr('', action.sortPlayersBy));
      const sorted = sortPlayers(state.players);
      return {
        ...state,
        players: action.sortAscending ? sorted : sorted.reverse(),
        sortPlayersBy: action.sortPlayersBy,
        sortAscending: action.sortAscending
      }
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.payload
      }
    case 'CHANGE_SUBVIEW':
      return {
        ...state,
        currentSubview: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
