# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
@players = File.read("lib/players.json")
json = JSON.parse(@players)
json.each do |player|
  Player.create(
    nfl_id: player['id'],
    name: player['name']
  )
end

@all_players = Player.all
@all_players.each do |player|
  PlayerStat.create(
    player_id: player.id
  )
end
