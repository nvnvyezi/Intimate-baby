import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import homeHide from './home-hide'

const homeHide = {
    state: {
      hide: true
    },
    getters: {
      
    },
    mutations: {
      changeHide (state, data) {
        state.hide = data.bool;
      }
    },
    actions: {
      hideFalse ({ commit }, data) {
        commit('changeHide', data);
      }
    }
  }

const store = new Vuex.Store({
  modules: {
      a: homeHide
  }
})

console.log(store.state.a.hide);

export default store;