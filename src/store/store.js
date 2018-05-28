import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home'
import bookSearch from './book-search'
import bookInfo from './book-info'
import bookCategory from './book-category'
import bookChapter from './book-chapter'

const store = new Vuex.Store({
  modules: {
      home,
      bookSearch,
      bookInfo,
      bookCategory,
      bookChapter
  }
})

export default store;