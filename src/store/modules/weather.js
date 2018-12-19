import weatherApi from '@/http/weather.js'
// import { FLY_CONFIG } from '@/config'
// console.log(FLY_CONFIG)
export const weather = {
  namespaced: true,

  state: {
    weather: {},
    weatherLoadStatus: 0
  },

  actions: {
    loadWeather ({ commit }, city) {
      commit('setWeatherLoadStatus', 1)
      weatherApi
        .getWeather(city)
        .then(res => {
          let dataStr = JSON.stringify(res.data)
          let weather = JSON.parse(
            dataStr.replace(/<!\[CDATA\[(.{3,10})\]\]>/g, '$1')
          )
          console.log(res, weather, dataStr)
          commit('setWeather', weather)
          commit('setWeatherLoadStatus', 2)
          wx.stopPullDownRefresh()
        })
        .catch(err => {
          console.log(err)
          commit('setWeatherLoadStatus', 3)
        })
    }
  },

  mutations: {
    setWeather (state, weather) {
      state.weather = weather
    },
    setWeatherLoadStatus (state, status) {
      state.status = status
    }
  },

  getters: {
    getWeather (state) {
      return state.weather
    },
    getWeatherLoadStatus (state) {
      return state.weatherLoadStatus
    }
  }
}
