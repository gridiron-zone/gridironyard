class AddPlayerStatsToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_reference :player_stats, :player, foreign_key: true
  end
end
