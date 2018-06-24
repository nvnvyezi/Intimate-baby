let bookCategory = {
  state: {
    firstCate: '',
    secondCate: '',
    words: 0,
    sort: '',
    cid: 1
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
    changeCid (state, data) {
      state.cid = data.cid;
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
    triggerCid ({commit}, data) {
      commit('changeCid', data);
    },
  }
}

export default bookCategory