import { combineReducers } from 'redux';
import R from 'ramda';
// grab our fake data
import data from '../data/data';
// action import

const initialPlayerState = {
  players: data.players,
  currentView: 'league',
  currentSubView: 'leaderboard',
  currentPlayerFilter: 'OFFENSE',
  sortPlayersBy: 'rank',
  sortAscending: true
}
const initialUserState = {
  loggedInUser: {},
  leagueId: 1,
  teamId: 1
}

const userReducer = function(state = initialUserState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return R.assoc('loggedInUser', action.userId, state);
    default:
      return state;
  }
}

const playerReducer = function(state = initialPlayerState, action) {
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

const reducer = combineReducers({
  userReducer,
  playerReducer
})

export default reducer;
