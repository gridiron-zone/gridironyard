class PlayerStat < ApplicationRecord
  serialize :passing, Hash
  serialize :rushing, Hash
  serialize :receiving, Hash
  serialize :defense, Hash
  belongs_to :player
end
