class AddNflIdToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :nfl_id, :string
  end
end
