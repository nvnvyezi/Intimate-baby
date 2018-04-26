import Vue from 'vue'
import Router from 'vue-router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


import HelloWorld from '@/components/HelloWorld'
import loading from '@/components/loading'
import home from '@/components/home'
import recommend from '@/components/recommend'

import book from '@/components/book'
import recom from '@/components/recom'
import category from '@/components/category'

import list from '@/category/list'
import cateHome from '@/category/home'

Vue.use(Router)
Vue.use(MintUI)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/show',
    //   name: 'loading',
    //   component: loading
    // },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        // {
        //   path: '/',
        //   name: 'recommend',
        //   component: recommend
        // },
        {
          path: '/',
          name: 'book',
          component: book,
          children: [
            {
              path: '/',
              name: 'recom',
              component: recom
            },
            {
              path: '/cate',
              name: 'category',
              component: category,
              children: [
                {
                  path: '/',
                  name: 'cateHome',
                  component: cateHome
                },
                {
                  path: '/cater',
                  name: 'list',
                  component: list
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
