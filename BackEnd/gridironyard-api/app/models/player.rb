class Player < ApplicationRecord
  serialize :stats, Array
  has_many :player_stats, dependent: :destroy
  has_and_belongs_to_many :users
end
