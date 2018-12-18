/*
|-------------------------------------------------------------------------------
| VUEX modules/cuonter.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cities state
*/

export const counter = {
  namespaced: true,
  /*
    Defines the state being monitored for the module.
  */
  state: {
    count: 0,
    countLoadStatus: 0
  },

  /*
    Defines the actions available on the module.
  */
  actions: {
    loadCount ({ commit }, data) {
      // commit('setCountLoadStatus', 1)
      commit('setCount', data)
      commit('setCountLoadStatus', 2)
    }
  },

  /*
    Defines the mutations based on the data store.
  */
  mutations: {
    setCount (state, count) {
      state.count = count
    },

    setCountLoadStatus (state, status) {
      state.countLoadStatus = status
    },

    increment: state => {
      const obj = state
      obj.count += 1
    },
    decrement: state => {
      const obj = state
      obj.count -= 1
    }
  },

  /*
    Defines the getters on the module.
  */
  getters: {
    getCount (state) {
      return state.count
    },
    getCountStatus (state) {
      return state.countLoadStatus
    }
  }
}
