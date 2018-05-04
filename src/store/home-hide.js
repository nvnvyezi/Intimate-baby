const homeHide = {
  state: {
    hide: true,
    index: 0,
    page: 1
  },
  // getters: {
  // },
  mutations: {
    changeHide (state, data) {
      state.hide = data.bool;
    },
    changeIndex (state, data) {
      state.index = data.num;
    },
    page (state, data) {
      state.page = data.page;
    }
  },
  actions: {
    hideFalse ({ commit }, data) {
      commit('changeHide', data);
    },
    changeNum ({ commit }, data) {
      commit('changeIndex', data);
    },
    changePage ({ commit }, data) {
      commit('page', data);
    }
  }
}

module.exports = homeHide;