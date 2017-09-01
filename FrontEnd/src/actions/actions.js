export function loginUser(user) {
  return {
    type: 'LOGIN_USER',
    user
  }
}

export function logoutUser() {
  return {
    type: 'LOGOUT_USER',
    payload: {}
  }
}

export function filterPlayers(filter) {
  return {
    type: 'FILTER_PLAYERS',
    payload: filter
  }
}

export function sortPlayers(sortPlayersBy, sortAscending) {
  return {
    type: 'SORT_PLAYERS',
    sortPlayersBy,
    sortAscending
  }
}

export function addPlayer(team, player) {
  return {
    type: 'ADD_PLAYER',
    team,
    player
  }
}

export function dropPlayer(player) {
  return {
    type: 'DROP_PLAYER',
    player
  }
}

export function changeView(view) {
  return {
    type: 'CHANGE_VIEW',
    view
  }
}

export function changeSubview(view) {
  return {
    type: 'CHANGE_SUBVIEW',
    view
  }
}

export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message
  }
}
