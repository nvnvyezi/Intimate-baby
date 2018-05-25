const homeHide = {
  state: {
    type: 1,
    moreBookTitle: '精品畅销'
  },
  mutations: {
    changeType (state, data) {
      state.type = data.typ;
    },
    changeMoreBookTitle (state, data) {
      state.moreBookTitle = data.title;
    }
  },
  actions: {
    triggerType ({commit}, data) {
      commit('changeType', data);
    }
  }
}

module.exports = homeHide;