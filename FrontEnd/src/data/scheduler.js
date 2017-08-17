/*
makeSchedule() takes an array of teams and integer number of games
to generate an array of round-robin style matchups. As of now, requires an even
number of teams.
 */
export default function makeSchedule(teams, numGames) {
  if (teams.length % 2 !== 0) throw Error('makeSchedule requires an even number of items in the teams array');
  const schedule = [];
  let home = teams.slice(0, teams.length/2);
  let away = teams.splice(teams.length/2);
  away.reverse();
  for (let n = 0; n < numGames; n++) {
    const matchups = home.map(function(team, idx) { return [team, away[idx]] });
    schedule.push(matchups);
    let homePop = home.pop();
    away.push(homePop);
    let nextHome = away.shift();
    home.splice(1, 0, nextHome);
  }
  return schedule;
}
