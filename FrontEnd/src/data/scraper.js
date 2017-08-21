export function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType === 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType === 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) === "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) === "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

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
