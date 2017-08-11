export const FILTER_PLAYERS = "FILTER_PLAYERS";

const makeActionCreator = function (actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload
    }
  }
}

export const filterPlayers = makeActionCreator(FILTER_PLAYERS);
