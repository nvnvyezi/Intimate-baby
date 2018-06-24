import Vue from 'vue'
import Router from 'vue-router'

import lazyLoad from '../wheel/lazyLoad'

Vue.use(Router)
Vue.use(lazyLoad)

// import HelloWorld from '@/login/HelloWorld'
const HelloWorld = () => import ( /*webpackChunkName: "HelloWorld"*/'@/login/HelloWorld');
// import loading from '@/components/loading'
const home = () => import ( /*webpackChunkName: "footNav"*/'@/components/footNav');
const book = () => import ( /*webpackChunkName: "book"*/'@/components/book');
const recom = () => import ( /*webpackChunkName: "bookRecom"*/'@/components/bookRecom');
const moreBook = () => import ( /*webpackChunkName: "moreBook"*/'@/components/templateMoreBook');

const cate = () => import ( /*webpackChunkName: "cate"*/'@/components/cate');
const category = () => import ( /*webpackChunkName: "bookCategory"*/'@/components/bookCategory');
const list = () => import ( /*webpackChunkName: "bookList"*/'@/category/bookList');
const cateHome = () => import ( /*webpackChunkName: "bookHome"*/'@/category/bookHome');

const seniority = () => import ( /*webpackChunkName: "seniority"*/'@/components/seniority');
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
// const musicPlayer = () => import ( /*webpackChunkName: "musicPlayer"*/'@/components/musicPlayer');

const userRouter = () => import ( /*webpackChunkName: "userRouter"*/'@/components/userRouter');
const user = () => import ( /*webpackChunkName: "user"*/'@/components/user');

const takePicture = () => import ( /*webpackChunkName: "takePicture"*/'@/components/template/takePicture/takePicture');

const musicMvRouter = () => import ( /*webpackChunkName: "musicMvRouter"*/'@/components/musicMvRouter');
const musicMv = () => import ( /*webpackChunkName: "musicMv"*/'@/components/musicMv');
const musicMvPlay = () => import ( /*webpackChunkName: "musicMvPlay"*/'@/components/musicMvPlay');
const swipe = () => import ( /*webpackChunkName: "swipe"*/'@/components/template/swipe/swipe');
const nav = () => import ( /*webpackChunkName: "nav"*/'@/components/template/leftNav/nav');

export default new Router({
  base: '/intimateBaby/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/login',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: swipe
    },
    {
      path: '/nav',
      name: 'nav',
      component: nav
    },
    {
      path: '/user',
      name: 'userRouter',
      component: userRouter,
      children: [
        {
          path: '/',
          component: user,
          name: 'user'
        }
      ]
    },
    {
      path: '/musicmv',
      component: musicMvRouter,
      name: 'musicMvRouter',
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: '/',
          name: 'musicMv',
          component: musicMv
        },
        {
          path: '/mvplay',
          name: 'musicMvPlay',
          component: musicMvPlay
        }
      ]
    },
    {
      path: '/picture',
      name: 'takePicture',
      component: takePicture
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true
      },
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
                showFooter: false
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
          name: 'cate',
          component: cate,
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
          name: 'seniority',
          component: seniority,
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
          children: [
            {
              path: '/',
              name: 'bookInformation',
              component: bookInformation,
            },
            {
              path:'/bookinformatecatelog',
              name: 'bookinformationcatelog',
              component: bookInformationCatelog,
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
