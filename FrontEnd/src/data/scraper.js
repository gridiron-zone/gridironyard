
export function playerScraper(game = {}) {
  let teamPlayers = [];
	if (Object.keys(game).length === 0) return [];
  Object.keys(game.home.stats).map(function(category) {
    Object.keys(game.home.stats[category]).map(function(player) {
      if (teamPlayers.findIndex(function(item) { return item.id ===  player }) ===  -1) {
        teamPlayers.push({
          id: player,
          name: game.home.stats[category][player].name,
          team: game.home.abbr
        });
      }
    });
  });
  Object.keys(game.away.stats).map(function(category) {
    Object.keys(game.away.stats[category]).map(function(player) {
      if (teamPlayers.findIndex(function(item) { return item.id ===  player }) ===  -1) {
        teamPlayers.push({
          id: player,
          name: game.away.stats[category][player].name,
          team: game.away.abbr
        });
      }
    });
  });
  return teamPlayers;
}
