/*
|-------------------------------------------------------------------------------
| VUEX modules/user.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cities state
*/

export const user = {
  /*
      Defines the state being monitored for the module.
    */
  state: {
    userInfo: {},
    userInfoLoadStatus: 0,
    hasUserInfo: false
  },

  /*
      Defines the actions available on the module.
    */
  actions: {
    loadUserInfo ({ commit }, data) {
      commit('setUserInfoLoadStatus', 2)
      commit('setUserInfo', data)
    }
  },

  /*
      Defines the mutations based on the data store.
    */
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },

    setUserInfoLoadStatus (state, status) {
      state.useInforLoadStatus = status
    },

    setHasUserInfo (state, hasUserInfo) {
      state.hasUserInfo = hasUserInfo
    }
  },

  /*
      Defines the getters on the module.
    */
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getUserInfoLoadStatus (state) {
      return state.userInfoLoadStatus
    },
    getHasUserInfo (state) {
      return state.getHasUserInfo
    }
  }
}
