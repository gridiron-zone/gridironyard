class CreateNflPlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :nfl_players do |t|
      t.string :name
      t.string :position
      t.string :jersey
      t.text :stats

      t.timestamps
    end
  end
end
