import weatherApi from '@/http/weather.js'
import cityApi from '@/http/city.js'
// import { FLY_CONFIG } from '@/config'
// console.log(FLY_CONFIG)
export const weather = {
  namespaced: true,

  state: {
    city: '',
    cityLoadStatus: 0,
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
        })
        .catch(err => {
          console.log(err)
          commit('setWeatherLoadStatus', 3)
        })
    },
    loadCity ({ commit }, data) {
      commit('setCityLoadStatus', 1)
      cityApi
        .getCityByGPS(data.latitude, data.longitude)
        .then(res => {
          console.log(res)
          commit('setCityLoadStatus', 2)
        })
        .catch(err => {
          console.log(err)
          commit('setCityLoadStatus', 3)
        })
    }
  },

  mutations: {
    setWeather (state, weather) {
      state.weather = weather
    },
    setWeatherLoadStatus (state, status) {
      state.status = status
    },
    setCity (state, city) {
      state.city = city
    },
    setCityLoadStatus (state, status) {
      state.cityLoadStatus = status
    }
  },

  getters: {
    getWeather (state) {
      return state.weather
    },
    getWeatherLoadStatus (state) {
      return state.weatherLoadStatus
    },
    getCity (state) {
      return state.city
    },
    getCityLoadStatus (state) {
      return state.cityLoadStatus
    }
  }
}
