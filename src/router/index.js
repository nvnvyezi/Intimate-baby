import Vue from 'vue'
import Router from 'vue-router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import lazyLoad from '../wheel/lazyLoad'

Vue.use(Router)
Vue.use(MintUI)
Vue.use(lazyLoad)

// import HelloWorld from '@/login/HelloWorld'
const HelloWorld = () => import ( /*webpackChunkName: "HelloWorld"*/'@/login/HelloWorld');
// import loading from '@/components/loading'
const home = () => import ( /*webpackChunkName: "footNav"*/'@/components/footNav');
const book = () => import ( /*webpackChunkName: "book"*/'@/components/book');
const recom = () => import ( /*webpackChunkName: "bookRecom"*/'@/components/bookRecom');
const moreBook = () => import ( /*webpackChunkName: "moreBook"*/'@/components/templateMoreBook');

const category = () => import ( /*webpackChunkName: "bookCategory"*/'@/components/bookCategory');
const list = () => import ( /*webpackChunkName: "bookList"*/'@/category/bookList');
const cateHome = () => import ( /*webpackChunkName: "bookHome"*/'@/category/bookHome');

const bookSeniorityRouter = () => import ( /*webpackChunkName: "bookSeniorityRouter"*/'@/components/bookSeniorityRouter');
const bookSeniorityHome = () => import ( /*webpackChunkName: "bookSeniorityHome"*/'@/components/bookSeniorityHome');
// const bookSeniorityList = () => import ( /*webpackChunkName: "bookSeniorityList"*/'@/components/bookSeniorityList');

const bookSearchRouter = () => import ( /*webpackChunkName: "bookSearchRouter"*/'@/components/bookSearchRouter');
const bookSearch = () => import ( /*webpackChunkName: "bookSearch"*/'@/components/bookSearch');
const bookSearchData = () => import ( /*webpackChunkName: "bookSearchData"*/'@/components/bookSearchData');

const bookInformationRouter = () => import ( /*webpackChunkName: "bookInformationRouter"*/'@/components/bookInformationRouter');
const bookInformation = () => import ( /*webpackChunkName: "bookInformation"*/'@/components/bookInformation');
const bookInformationCatelog = () => import ( /*webpackChunkName: "bookInformationCatelog"*/'@/components/bookInformationCatelog');

const bookChapterRouter = () => import ( /*webpackChunkName: "bookChapterRouter"*/'@/components/bookChapterRouter');
const bookChapter = () => import ( /*webpackChunkName: "bookChapter"*/'@/components/bookChapter');

export default new Router({
  base: '/intimateBaby/',
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
        {
          path: '/',
          name: 'book',
          component: book,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/',
              name: 'recom',
              component: recom,
              meta: {
                keepAlive: true,
                showFooter: true
              },
            },
            {
              path: '/moreBook',
              name: 'moreBook',
              component: moreBook,
              meta: {
                keepAlive: false
              },
            }
          ]
        },
        {
          path: '/cate',
          name: 'book',
          component: book,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/',
              name: 'category',
              component: category,
              meta: {
                keepAlive: true
              },
              children: [
                {
                  path: '/',
                  name: 'cateHome',
                  component: cateHome,
                  meta: {
                    keepAlive: true
                  }
                },
                {
                  path: '/cater',
                  name: 'list',
                  component: list,
                  meta: {
                    keepAlive: false
                  }
                }
              ]
            }
          ]
        },
        {
          path: '/seniority',
          name: 'book',
          component: book,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/',
              name: 'bookSeniorityRouter',
              component: bookSeniorityRouter,
              meta: {
                keepAlive: true
              },
              children: [
                {
                  path: '/',
                  name: 'bookSeniorityHome',
                  component: bookSeniorityHome,
                  meta: {
                    keepAlive: true
                  }
                },
                {
                  path: '/seniorityList',
                  name: 'moreBook',
                  component: moreBook,
                  meta: {
                    keepAlive: false
                  }
                },
              ]
            },
          ]
        },
        {
          path: '/booksearch',
          name: 'bookSearchRouter',
          component: bookSearchRouter,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/',
              name: 'bookSearch',
              component: bookSearch,
              meta: {
                keepAlive: true
              }
            },
            {
              path: '/booksearchdata',
              name: 'bookSearchData',
              component: bookSearchData,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        {
          path: '/bookinformation',
          name: 'bookInformationRouter',
          component: bookInformationRouter,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/',
              name: 'bookInformation',
              component: bookInformation
            },
            {
              path:'/bookinformatecatelog',
              name: 'bookinformationcatelog',
              component: bookInformationCatelog
            }
          ]
        },
        {
          path: '/bookchapter',
          name: 'bookChapterRouter',
          component: bookChapterRouter,
          meta: {
            keepAlive: false
          },
          children: [
            {
              path: '/',
              name: 'bookChapter',
              component: bookChapter
            }
          ]
        }
      ]
    }
  ]
})
