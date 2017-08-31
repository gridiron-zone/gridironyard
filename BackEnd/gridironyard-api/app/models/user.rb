class User < ApplicationRecord
  has_and_belongs_to_many :players
  has_secure_password
end
