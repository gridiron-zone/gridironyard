json.players @players do |player|
  json.id player.id
  json.name player.name
  json.position player.position
  json.nfl_id player.nfl_id

  json.stats player.player_stats do |stat|
    json.passing stat.passing
    json.rushing stat.rushing
    json.receiving stat.rushing
    json.defense stat.defense
  end
end
