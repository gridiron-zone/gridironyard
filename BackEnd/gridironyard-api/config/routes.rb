Rails.application.routes.draw do
  get '/nfl_teams/api', to: 'nfl_teams#index', as: 'nfl_teams'
  get '/nfl_teams/team_cache', to: 'nfl_teams#team_cache', as: 'team_cache'
  get '/nfl_teams/stats_cache', to: 'nfl_teams#stats_cache'
  root 'nfl_teams#index'
end
