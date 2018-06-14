const mv = {
  state: {
    mvUrl: '',
    mvName: ''
  },
  mutations: {
    changeMvUrl (state, url) {
      state.mvUrl = url;
    },
    changeMvName (state, name) {
      state.mvName = name;
    }
  }
}

export default mv;