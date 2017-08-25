Rails.application.routes.draw do
  get '/nfl_teams/api', to: 'nfl_teams#index', as: 'nfl_teams'
  get '/nfl_teams/team_cache', to: 'nfl_teams#team_cache', as: 'team_cache'
  get '/stats_api', to: 'game_stats#index'
  get '/home_stats_api', to: 'game_stats#home_team_stats'
  get '/away_stats_api', to: 'game_stats#away_team_stats'
  get 'players_cache', to: 'players#player_cache'
  get '/players_api', to: 'players#index', as: 'players', format: 'json'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup'=> 'users#new'
  post '/users' => 'users#create'
end
