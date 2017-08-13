// grab our fake data
import data from '../data/data';
// action import


const initialState = {
  players: data.players,
  loggedInUser: data.users[0],
  currentView: 'league',
  currentSubView: 'scoreboard',
  currentPlayerFilter: 'ALL',
  
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'FILTER_PLAYERS':
      return {
          ...state,
          currentPlayerFilter: action.payload
      }
    case 'SORT_PLAYERS':
      return {
        ...state,
        sortPlayersBy,
        sortDirection
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
