// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWorker from 'vue-worker'

import store from './store/store'
import popup from "./components/template/popup";

Vue.use(VueWorker)
Vue.use(popup)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  let flag = sessionStorage['userName'];
  if (to.path === '/login' && !flag) {
    next()
  } else if (from.name === null && to.path === '/login' && flag) {
    next({
      path: '/'
    });
  } else if (from.path === '/' && to.path === '/login' && flag) {
    next({
      path: '/user'
    });
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})