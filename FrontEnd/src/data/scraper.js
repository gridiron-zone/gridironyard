const fs = require('fs');
const playerData = require('./Basic_Stats.csv');

const players = playerData.split('\n');
const playerKeys = players[0].split(',');

console.log(playerKeys);


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
