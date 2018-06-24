const homeHide = {
  state: {
    type: 1,
    // moreBookTitle: '精品畅销',
    currentPage: 1,
    listName: '精品小说',
    showHeader: true,
  },
  mutations: {
    changeType (state, data) {
      state.type = data.typ;
    },
    // changeMoreBookTitle (state, data) {
    //   state.moreBookTitle = data.title;
    // },
    changeCurrentPage (state, data) {
      state.currentPage = data;
    },
    changeListName (state, data) {
      state.listName = data;
    },
    changeShowHeader (state, data) {
      state.showHeader = data;
    }
  },
  actions: {
    triggerType ({commit}, data) {
      commit('changeType', data);
    }
  }
}

module.exports = homeHide;