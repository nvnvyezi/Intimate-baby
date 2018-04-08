const homeHide = {
  state: {
    hide: true
  },
  getters: {
    
  },
  mutations: {
    changeHidde (state, data) {
      state.hide = data.bool;
    }
  },
  actions: {
    hideFalse ({ commit }, data) {
      commit('changeHide', data);
    }
  }
}

module.exports = homeHide;