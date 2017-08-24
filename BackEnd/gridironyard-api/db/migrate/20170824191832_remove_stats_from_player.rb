class RemoveStatsFromPlayer < ActiveRecord::Migration[5.1]
  def change
    remove_column :players, :stats, :text
  end
end
