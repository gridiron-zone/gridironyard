export function filterPlayers(filter) {
  return {
    type: 'FILTER_PLAYERS',
    payload: filter
  }
}

export function sortPlayers(sortBy) {
  return {
    type: 'SORT_PLAYERS',
    sortPlayersBy,
    sortDirection
  }
}

export function changeView(view) {
  return {
    type: 'CHANGE_VIEW',
    payload: view
  }
}

export function changeSubview(view) {
  return {
    type: 'CHANGE_SUBVIEW',
    payload: view
  }
}
