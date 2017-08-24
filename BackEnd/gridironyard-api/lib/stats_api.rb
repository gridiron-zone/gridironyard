require 'httparty'

class StatsApi
  API_URL = 'http://www.nfl.com/liveupdate/game-center/2017081753/2017081753_gtd.json'

  def data_url
    response = HTTParty.get(API_URL)
    json = JSON.parse(response.body)
  end
end
