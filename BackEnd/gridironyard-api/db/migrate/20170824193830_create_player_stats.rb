class CreatePlayerStats < ActiveRecord::Migration[5.1]
  def change
    create_table :player_stats do |t|
      t.text :passing
      t.text :rushing
      t.text :receiving
      t.text :defense

      t.timestamps
    end
  end
end
