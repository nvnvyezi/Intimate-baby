const bookInfo = {
  state: {
    bookId: '',
    bookName: '',
    authorName: '',
    authorId: '',
    // 缓存页面
    includeCom: 'bookInformation'
  },
  mutations: {
    changeBookId (state, data) {
      state.bookId  = data.id;
    },
    changeBookName (state, data) {
      state.bookName  = data.name;
    },
    changeAuthor (state, data) {
      state.authorName = data.name;
      state.authorId = data.id;
    },
    changeIncludeCom (state, data) {
      state.includeCom = data;
    }
  },
  actions: {
    triggerBookId ({commit}, data) {
      commit('changeBookId', data);
    },
    triggerBookName ({commit}, data) {
      commit('changeBookName', data);
    },
    triggerAuthor ({commit}, data) {
      commit('changeAuthor', data);
    },
  }
}

export default bookInfo;