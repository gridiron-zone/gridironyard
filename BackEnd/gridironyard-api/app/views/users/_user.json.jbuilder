json.extract! user, :id, :username, :email, :password, :picture, :created_at, :updated_at
json.url users_url(user, format: :json)
