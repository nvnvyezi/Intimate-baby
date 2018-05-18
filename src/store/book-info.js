const bookInfo = {
  state: {
    bookId: '',
    userId: 8000000,
    authorName: '',
    authorId: ''
  },
  mutations: {
    changeBookId (state, data) {
      state.bookId  = data.id;
    },
    changeAuthor (state, data) {
      state.authorName = data.name;
      state.id = id;
    }
  },
  actions: {
    triggerBookId ({commit}, data) {
      commit('changeBookId', data);
    },
    triggerAuthor ({commit}, data) {
      commit('changeAuthor', data);
    }
  }
}

export default bookInfo;