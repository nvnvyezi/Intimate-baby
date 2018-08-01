import Vue from 'vue'
import Router from 'vue-router'

import lazyLoad from '../wheel/lazyLoad'

Vue.use(Router)
Vue.use(lazyLoad)

// import HelloWorld from '@/login/HelloWorld'
const HelloWorld = () => import ( /*webpackChunkName: "HelloWorld"*/'@/components/Login/HelloWorld');
// import loading from '@/components/loading'
const home = () => import ( /*webpackChunkName: "footNav"*/'@/components/footNav');
const book = () => import ( /*webpackChunkName: "book"*/'@/components/book');
const recom = () => import ( /*webpackChunkName: "bookRecom"*/'@/components/BookRecom/Info/index');
const moreBook = () => import ( /*webpackChunkName: "moreBook"*/'@/components/Common/MoreBook/index');

const cate = () => import ( /*webpackChunkName: "cate"*/'@/components/BookRecom/Route/index');
const category = () => import ( /*webpackChunkName: "bookCategory"*/'@/components/BookCategory/Router/index');
const list = () => import ( /*webpackChunkName: "bookList"*/'@/components/BookCategory/List/index');
const cateHome = () => import ( /*webpackChunkName: "bookHome"*/'@/components/BookCategory/Home/index');

const bookSeniorityRouter = () => import ( /*webpackChunkName: "bookSeniorityRouter"*/'@/components/BookSeniority/Router/index');
const bookSeniorityHome = () => import ( /*webpackChunkName: "bookSeniorityHome"*/'@/components/BookSeniority/Home/index');
// const bookSeniorityList = () => import ( /*webpackChunkName: "bookSeniorityList"*/'@/components/bookSeniorityList');

const bookSearchRouter = () => import ( /*webpackChunkName: "bookSearchRouter"*/'@/components/BookSearch/Route/index');
const bookSearch = () => import ( /*webpackChunkName: "bookSearch"*/'@/components/BookSearch/Home/index');
const bookSearchData = () => import ( /*webpackChunkName: "bookSearchData"*/'@/components/BookSearch/List/index');

const bookInformationRouter = () => import ( /*webpackChunkName: "bookInformationRouter"*/'@/components/BookInformation/Route/index');
const bookInformation = () => import ( /*webpackChunkName: "bookInformation"*/'@/components/BookInformation/Info/index');
const bookInformationCatelog = () => import ( /*webpackChunkName: "bookInformationCatelog"*/'@/components/BookInformation/Catelog/index');

const bookChapterRouter = () => import ( /*webpackChunkName: "bookChapterRouter"*/'@/components/BookChapter/Route/index');
const bookChapter = () => import ( /*webpackChunkName: "bookChapter"*/'@/components/BookChapter/Info/index');
// const musicPlayer = () => import ( /*webpackChunkName: "musicPlayer"*/'@/components/musicPlayer');

const userRouter = () => import ( /*webpackChunkName: "userRouter"*/'@/components/User/Route/index');
const user = () => import ( /*webpackChunkName: "user"*/'@/components/User/Home/index');
const userChange = () => import ( /*webpackChunkName: "userChange"*/'@/components/User/ChangeInfo/index');

const takePicture = () => import ( /*webpackChunkName: "takePicture"*/'@/components/template/takePicture/takePicture');

const musicMvRouter = () => import ( /*webpackChunkName: "musicMvRouter"*/'@/components/Music/Route/index');
const musicMv = () => import ( /*webpackChunkName: "musicMv"*/'@/components/Music/Home/index');
const musicMvPlay = () => import ( /*webpackChunkName: "musicMvPlay"*/'@/components/Music/MvPlay/index');
const swipe = () => import ( /*webpackChunkName: "swipe"*/'@/components/template/swipe/swipe');
const nav = () => import ( /*webpackChunkName: "nav"*/'@/components/template/leftNav/nav');
const NotFound = () =>import ( /*webpackChunkName: "nav"*/'@/components/NotFound/NotFound')
const Activate = () =>import ( /*webpackChunkName: "nav"*/'@/components/Activate/index')

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
        },
        {
          path: '/user/change',
          component: userChange,
          name: 'userChange'
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
              path: '/bookinformatecatelog',
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
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
