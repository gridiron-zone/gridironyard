const fs = require('fs');
const playerData = fs.readFileSync('./Basic_Stats.csv', { encoding: 'utf8'});

const players = playerData.split('\n');
const playerKeys = players.shift().split(',');
const BasicPlayerData = players.map(function(player, index) {
  const thisPlayerData = player.split(',');
  const aPlayer = {}
  thisPlayerData.forEach((item, idx) => aPlayer[playerKeys[idx]] = thisPlayerData[idx].trim());
  return aPlayer;
});
const ActivePlayerData = BasicPlayerData.filter(player => player.Status === 'Active');
fs.writeFileSync('./BasicPlayerData.json', JSON.stringify(ActivePlayerData));

/*
export function playerScraper(game = {}) {
  let teamPlayers = [];
	if (Object.keys(game).length === 0) return [];
  Object.keys(game.home.stats).forEach(function(category) {
    Object.keys(game.home.stats[category]).forEach(function(player) {
      if (teamPlayers.findIndex(function(item) { return item.id ===  player }) ===  -1) {
        teamPlayers.push({
          id: player,
          name: game.home.stats[category][player].name,
          team: game.home.abbr
        });
      }
    });
  });
  Object.keys(game.away.stats).forEach(function(category) {
    Object.keys(game.away.stats[category]).forEach(function(player) {
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
*/
