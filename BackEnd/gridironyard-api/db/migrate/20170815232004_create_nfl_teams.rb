class CreateNflTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :nfl_teams do |t|
      t.string :name
      t.string :short_name
      t.text :schedule

      t.timestamps
    end
  end
end
