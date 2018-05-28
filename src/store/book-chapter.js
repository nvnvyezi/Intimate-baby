const bookChapter = {
  state: {
    size: 0,
    page: ''
  },
  mutations: {
    changeSize (state, data) {
      state.size = data.size;
    },
    changePage (state, data) {
      state.page  = data.page;
    },
  },
  actions: {
    triggerSize ({commit}, data) {
      commit('changSize', data);
    },
    triggerPage ({commit}, data) {
      commit('changePage', data);
    }
  }
}

export default bookChapter;