const bookInfo = {
  state: {
    bookId: '',
    bookName: '',
    authorName: '',
    authorId: '',
    page: ''
  },
  mutations: {
    changeBookId (state, data) {
      state.bookId  = data.id;
    },
    changeBookName (state, data) {
      state.bookName  = data.name;
    },
    changePage (state, data) {
      state.page  = data.page;
    },
    changeAuthor (state, data) {
      state.authorName = data.name;
      state.authorId = data.id;
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
    triggerPage ({commit}, data) {
      commit('changePage', data);
    }
  }
}

export default bookInfo;