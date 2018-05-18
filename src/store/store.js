import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import homeHide from './home-hide'
import bookSearch from './book-search'
import bookInfo from './book-info'
const store = new Vuex.Store({
  modules: {
      a: homeHide,
      bookSearch,
      bookInfo
  }
})

export default store;