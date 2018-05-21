let bookCategory = {
  state: {
    firstCate: '',
    secondCate: '',
    words: '',
    sort: '' || 'monthHot',
    page: 1
  },
  mutations: {        //变化
    changeFirst (state, data) {
      state.firstCate = data.firstCate;
    },
    changeSecond (state, data) {
      state.secondCate = data.secondCate;
    },
    changeWords (state, data) {
      state.words = data.words;
    },
    changeSort (state, data) {
      state.sort = data.sort;
    },
    changePage (state, data) {
      state.page = data.firstCate;
    }
  },
  actions: {
    triggerFirst ({commit}, data) {
      commit('changeFirst', data);
    },
    triggerSecond ({commit}, data) {
      commit('changeSecond', data);
    },
    triggerWords ({commit}, data) {
      commit('changeWords', data);
    },
    triggerSort ({commit}, data) {
      commit('changeSort', data);
    },
    triggerPage ({commit}, data) {
      commit('changePage', data);
    },
  }
}

export default bookCategory