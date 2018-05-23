const homeHide = {
  state: {
    hide: true,
    type: 1,
    moreBookTitle: '精品畅销'
  },
  mutations: {
    changeHide (state, data) {
      state.hide = data.bool;
    },
    changeType (state, data) {
      state.type = data.typ;
    },
    changeMoreBookTitle (state, data) {
      state.moreBookTitle = data.title;
    }
  },
  actions: {
    hideFalse ({ commit }, data) {
      commit('changeHide', data);
    },
    triggerType ({commit}, data) {
      commit('changeType', data);
    }
  }
}

module.exports = homeHide;