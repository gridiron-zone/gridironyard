class Player < ApplicationRecord
  serialize :stats, Array
  has_many :player_stats, dependent: :destroy
end
