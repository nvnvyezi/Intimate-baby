const bookSearch = {
  state: {
    searchData: '',
    infoBookName: ''
  },
  mutations: {
    changeSearchData (state, data) {
      state.searchData = data.data;
    },
    changeInfoData (state, data) {
      state.infoBookName = data.info;
    }
  },
  getters: {

  },
  actions: {
    triggerSearchData ({ commit }, data) {
      commit('changeSearchData', data);
    },
    triggerInfoData ({ commit }, data) {
      commit('changeInfoData', data);
    }
  }
}

export default bookSearch;