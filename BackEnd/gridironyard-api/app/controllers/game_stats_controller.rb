require 'stats_api'

class GameStatsController < ApplicationController
  attr_accessor :stats_api
  def index
    set_api
    render json: @stats_api
  end

  def home_team_stats
    set_api
    @home = @stats_api['home']['stats']
    passing(@home)
    rushing(@home)
    receiving(@home)
    defense(@home)
    redirect_to players_path
  end

  def away_team_stats
    set_api
    @away = @stats_api['away']['stats']
    passing(@away)
    rushing(@away)
    receiving(@away)
    defense(@away)
    redirect_to players_path
  end

  private
    def set_api
      api = StatsApi.new()
      stats = api.data_url
      @stats_api = stats['2017081753']
    end

    def passing(api)
      @passing = api['passing']
      @passing.each do |player|
        @player = Player.find_by_nfl_id(player[0])
        @stats = PlayerStat.find_by_player_id(@player.id)
        @stats.update(
          :passing => player[1].except('name')
        )
      end
    end

    def rushing(api)
      @rushing = api['rushing']
      @rushing.each do |player|
        @player = Player.find_by_nfl_id(player[0])
        @stats = PlayerStat.find_by_player_id(@player.id)
        @stats.update(
          :rushing => player[1].except('name')
        )
      end
    end

    def receiving(api)
      @receiving = api['receiving']
      @receiving.each do |player|
        @player = Player.find_by_nfl_id(player[0])
        @stats = PlayerStat.find_by_player_id(@player.id)
        @stats.update(
          :receiving => player[1].except('name')
        )
      end
    end

    def defense(api)
      @defense = api['defense']
      @defense.each do |player|
        @player = Player.find_by_nfl_id(player[0])
        @stats = PlayerStat.find_by_player_id(@player.id)
        @stats.update(
          :defense => player[1].except('name')
        )
      end
    end
end
