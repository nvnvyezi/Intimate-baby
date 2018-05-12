const homeHide = {
  state: {
    hide: true,
    index: 0,
    page: 1,
    dateNum: 0,
    moreBookTitle: '畅销榜'
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
    },
    changeDateNum (state, data) {
      state.dateNum = data.num;
    },
    changeMoreBookTitle (state, data) {
      state.moreBookTitle = data.title;
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
    },
    changeDate ({ commit }, data) {
      commit('changeDateNum', data);
    }
  }
}

module.exports = homeHide;