Rails.application.routes.draw do
  get '/nfl_teams/api', to: 'nfl_teams#index', as: 'nfl_teams'
  get '/nfl_teams/team_cache', to: 'nfl_teams#team_cache', as: 'team_cache'
  get '/stats_api', to: 'game_stats#index'
  get '/home_stats_api', to: 'game_stats#home_team'
  get '/away_stats_api', to: 'game_stats#away_team'
end
