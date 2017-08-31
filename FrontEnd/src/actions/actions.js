export function loginUser(user, password) {
  return {
    type: 'LOGIN_USER',
    user,
    password
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
