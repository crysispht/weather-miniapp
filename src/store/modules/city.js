// import cityApi from '@/http/city.js'
import { FLY_CONFIG } from '@/config'

import QQMapWX from '@/lib/qqmap/qqmap-wx-jssdk'
// const QQMapWX = require('@/lib/qqmap/qqmap-wx-jssdk')

// import { FLY_CONFIG } from '@/config'
// console.log(FLY_CONFIG)
export const city = {
  namespaced: true,

  state: {
    city: {},
    cityLoadStatus: 0
  },

  actions: {
    loadCity ({ commit }, data) {
      commit('setCityLoadStatus', 1)
      //   cityApi
      //     .getCityByGPS(data.latitude, data.longitude)
      //     .then(res => {
      //       console.log(res)
      //       commit('setCityLoadStatus', 2)
      //     })
      //     .catch(err => {
      //       console.log(err)
      //       commit('setCityLoadStatus', 3)
      //     })
      let qqmapsdk = new QQMapWX({
        key: FLY_CONFIG.TENCENT_MAPS_JS_API_KEY
      })
      qqmapsdk.reverseGeocoder({
        success: res => {
          if (res.status === 0) {
            commit('setCity', res.result.address_component)
          }
          commit('setCityLoadStatus', 2)
        },
        fail: err => {
          console.log(err)
          commit('setCityLoadStatus', 3)
        }
      })
    }
  },

  mutations: {
    setCity (state, city) {
      state.city = city
    },
    setCityLoadStatus (state, status) {
      state.cityLoadStatus = status
    }
  },

  getters: {
    getCity (state) {
      return state.city
    },
    getCityLoadStatus (state) {
      return state.cityLoadStatus
    }
  }
}
