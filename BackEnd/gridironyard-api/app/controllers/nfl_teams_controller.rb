class NflTeamsController < ApplicationController
  def team_cache
    @teams = NflData::API::Team.get_all_with_schedule(2017)
    json = JSON.parse(@teams)
    json.each do |team|
      NflTeam.create(
        name: team['name'],
        short_name: team['short_name'],
        schedule: team['schedule'].each do |week|
          week
        end
      )
    end
  end

  def index
    @teams = NflTeam.all
    render json: @teams
  end
end
