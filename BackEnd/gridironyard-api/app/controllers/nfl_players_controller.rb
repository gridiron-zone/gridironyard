require 'players_api'

class NflPlayersController < ApplicationController
  attr_accessor :stats_api
  def index
    set_api
    render json: @stats_api
  end

  def home_team
    set_api
    render json: @home
  end

  def away_team
    set_api
    render json: @away
  end

  private
    def set_api
      api = PlayersApi.new()
      stats = api.data_url
      @stats_api = stats['2017081753']
      @away = @stats_api['away']['stats']
      @home = @stats_api['home']['stats']
    end
end
