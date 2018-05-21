//分类的书单
<template>
  <div class="bookList">
    <header class="header">
      <section class="header--list">
        <ul class="header--list__ul">
          <li v-if="index === 0" class="header--list__ul__li hoverG" @click="changeProp" v-for="(item, index) in headerList" :key="index" :name="item.relatedName">{{ item.name }}</li>
          <li v-if="index !== 0" class="header--list__ul__li" @click="changeProp" v-for="(item, index) in headerList" :key="index" :name="item.relatedName">{{ item.name }}</li>
        </ul>
      </section>
      <section class="header--list">
        <ul class="middle--list__ul">
          <li v-if="index === 0" class="middle--list__ul__li hoverG" @click="changeProp" v-for="(item, index) in middleList" :key="index" :words="item.words">{{ item.name }}</li>
          <li v-if="index !== 0" class="middle--list__ul__li" @click="changeProp" v-for="(item, index) in middleList" :key="index" :words="item.words">{{ item.name }}</li>
        </ul>
      </section>
      <section class="header--list">
        <ul class="middle--list__ul">
          <li v-if="index === 0" class="middle--list__ul__li hoverG" @click="changeProp" v-for="(item, index) in footList" :key="index" :sort="item.sort">{{ item.name }}</li>
          <li v-if="index !== 0" class="middle--list__ul__li" @click="changeProp" v-for="(item, index) in footList" :key="index" :sort="item.sort">{{ item.name }}</li>
        </ul>
      </section>
    </header>
    <section v-if="judge" class="recommend">
      <div class="recommend--body">
        <ul class="recommend--body--ul">
          <router-link @click.native="changeInfoBook" class="recommend--body--ul--li ddd" to="bookinformation" tag="li" v-for="(item, index) in list" :key="index">
            <div class="recommend--body--ul--li__left">
              <img class="recommend--body--ul--li__left--img" src="" v-lazyLoad="item.imgUrl" :alt="item.bookName">
            </div>
            <div class="recommend--body--ul--li__right">
              <h3 class="recommend--body--ul--li__right--title" :bid="item.bid">{{ item.bookName }}</h3>
              <p class="recommend--body--ul--li__right--author">{{ item.authorName }}</p>
              <p class="recommend--body--ul--li__right--info">{{ item.introduction }}</p>
              <div class="recommend--body--ul--li__right--tags">
                <span v-if="item.status == 0" class="statNameblue">连载</span>
                <span v-else class="statNamered">完结</span>
                <span class="recommend--body--ul--li__right--tags--two">{{ item.size }}</span>
                <span class="recommend--body--ul--li__right--tags--three">{{ item.class_name }}</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </section>
    <loading v-else></loading>
    <footer class="bookList--footer">
      <div v-if="loadJudge" class="bookList--footer--text">
        加载更多
      </div>
      <div v-else class="bookList--footer--textend">
        没有更多
      </div>
    </footer>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
import { categoryList, categoryContent } from '../api/api'
import loading from '../components/loadingImg'
export default {
  components: {
    loading
  },
  name: 'list',
  data () {
    return {
      list: [],
      nameFrontNode: null,
      wordsFrontNode: null,
      sortFrontNode: null,
      headerList: [],
      middleList: [
        {
          words: '',
          name: '全部'
        },
        {
          words: '1',
          name: '20万字'
        },
        {
          words: '2',
          name: '20-100万字'
        },
        {
          words: '3',
          name: '100万字以上'
        }
      ],
      footList: [
        {
          sort: 'monthHot',
          name: '最热'
        },
        {
          sort: 'updateTime',
          name: '最新'
        },
        {
          sort: '',
          name : '完结'
        }
      ],
      page: 1,
      judge: false,
      loadJudge: true
    }
  },
  computed: {
    firstCate: {
      get: function () {
        let firstCate = this.$store.state.bookCategory.firstCate;
        if (!firstCate) {
          firstCate = localStorage.getItem('firstCate');
        }
        return firstCate;
      }
    },
    secondCate: {
      get: function () {
        let secondCate = this.$store.state.bookCategory.secondCate;
        if (!secondCate) {
          secondCate = localStorage.getItem('secondCate');
        }
        return secondCate;
      },
      set: function (newVal) {
        this.$store.dispatch({
          type: 'triggerSecond',
          secondCate: newVal
        })
        localStorage['secondCate'] = newVal;
      }
    },
    words: {
      get: function () {
        let words = this.$store.state.bookCategory.words;
        if (!words) {
          words = localStorage.getItem('words');
        }
        return words;
      },
      set: function (newVal) {
        this.$store.dispatch({
          type: 'triggerWords',
          words: newVal
        })
        localStorage['words'] = newVal;
      }
    },
    sort: {
      get: function () {
        let sort = this.$store.state.bookCategory.sort;
        if (!sort) {
          sort = localStorage.getItem('sort');
        }
        return sort;
      },
      set: function (newVal) {
        this.$store.dispatch({
          type: 'triggerSort',
          sort: newVal
        })
        localStorage['sort'] = newVal;
      }
    }
  },
  created () {
    localStorage.setItem('secondCate', '');
    localStorage.setItem('words', '');
    localStorage.setItem('sort', 'monthHot');
    this.getHeader();
    this.getList();
  },
  mounted () {
    let bookList = document.getElementsByClassName('bookList');
    bookList[0].addEventListener('touchstart', this.showFooter, false);
    bookList[0].addEventListener('touchmove', this.showFooter, false);
    bookList[0].addEventListener('touchend', this.showFooter, false);
  },
  methods: {
    showFooter () {
      let header = document.getElementsByClassName('header');
      let footer = document.getElementsByClassName('bookList--footer');
      let li = document.getElementsByTagName('li');
      let liBottom = li[li.length-1].getBoundingClientRect().bottom;
      let screenHeight = document.documentElement.clientHeight;
      if (liBottom - screenHeight < 120 && (footer[0].style.display == '' || footer[0].style.display == 'none')) {
        footer[0].style.display = 'block';
        // console.log(1)
        footer[0].scrollIntoView(true);
        setTimeout(() => {
          this.page++;
          this.getList();
        }, 300); 
      }
      if (liBottom - screenHeight > 150 && footer[0].style.display == 'block') {
        footer[0].style.display = 'none';
      }
    },
    changeInfoBook (e) {
      let bookName = e.currentTarget.children[1].firstChild.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: bookName
      })
      localStorage.setItem('bookId', bookName);
    },
    selectColor (num, e) {
      let node = null;
      switch (num) {
          case 0:
            node = this.nameFrontNode;
            break;
          case 1:
            node = this.wordsFrontNode;
            break;
          case 2:
            node = this.sortFrontNode;
            break;
        }
      if (node == null) {
        e.target.parentNode.firstChild.classList.remove('hoverG');
        e.target.classList.add('hoverG');
        switch (num) {
          case 0:
            this.nameFrontNode = e.target;
            break;
          case 1:
            this.wordsFrontNode = e.target;
            break;
          case 2:
            this.sortFrontNode = e.target;
            break;
        }
      } else {
        if (node != e.target) {
          node.classList.remove('hoverG');
          switch (num) {
            case 0:
              this.nameFrontNode = e.target;
              break;
            case 1:
              this.wordsFrontNode = e.target;
              break;
            case 2:
              this.sortFrontNode = e.target;
              break;
          }
          e.target.classList.add('hoverG');
        }
      }
    },
    changeProp (e) {
      this.judge = false;
      this.page = 1;
      let name = e.target.getAttribute('name');
      let words = e.target.getAttribute('words');
      let sort = e.target.getAttribute('sort');
      if (name || name == '') {
        this.secondCate = name;
        this.selectColor(0, e);
      }
      if (words || words == '') {
        this.words = words;
        this.selectColor(1, e);
      }
      if (sort || sort == '') {
        this.sort = sort;
        this.selectColor(2, e);
      }
      this.list = [];
      this.getList();
    },
    getList () {
      if (window.fetch) {
        categoryContent(this.page, this.words, this.firstCate, this.secondCate, this.sort, data => {
          if (data.length == 0) {
            this.loadJudge = false;
            return ;
          }
          Array.prototype.forEach.call(data, (item) => {
            let obj = {};
            obj.imgUrl = item.cover;
            obj.bid = item.bid;
            obj.bookName = item.title;
            obj.authorName = item.author;
            obj.introduction = item.desc;
            obj.status = item.status;
            obj.size = `${(item.words/1000).toFixed(1)}万字`;
            obj.class_name = item.category;
            this.list.push(obj);
          })
          this.judge = true;
        })
      }
    },
    getHeader () {
      categoryList((data) => {
        this.headerList.push({
          name: '全部',
          relatedName: ''
        })
        data.class.forEach(item => {
          let obj = {};
          obj.id = item.id;
          obj.name = item.name;
          obj.relatedName = item.relatedName;
          this.headerList.push(obj);
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @media screen and(max-width:720px){
    @bottomColor: #f3f3f3;
    .statNameG {
      height: 1rem;
      line-height: 1rem;
      padding: 0.2rem 0.5rem 0.1rem;
    }
    .statName (@fcolor: #70a7e3) {
      .statNameG;
      color: @fcolor;
      border: 0.005rem solid @fcolor;
      margin-right: 0.3rem;
      font-size: 0.7rem;
    }
    .statNamered {
      .statName(#f08300)
    }
    .statNameblue {
      .statName(#499fff);
    }
    .hoverG {
      color: #f08300;
    }
    .bookList {
      width: 100vw;
      height: 100vh;
      background-color: white;
      margin-top: 45/12rem;
      .recommend {
        width: 100%;
        height: auto;
        background-color: white;
        .recommend--body {
          width: 90%;
          margin: 0 auto;
          .recommend--body--ul {
            width: 100%;
            list-style: none;
            .recommend--body--ul--li {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: space-between;
              padding: 1.3rem 0;
              border-bottom: 0.1rem solid #f0ebeb;
              .recommend--body--ul--li__left {
                width: 84/12rem;
                height: 112/12rem;
                .recommend--body--ul--li__left--img {
                  width: 100%;
                  height: 100%;
                }
              }
              .recommend--body--ul--li__right {
                width: 188/12rem;
                height: 113/12rem;
                .recommend--body--ul--li__right--title {
                  font-size: 1.5rem;
                  width: 100%;
                  height: 19/12rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding: 0;
                  font-family: "Helvetica Neue",Helvetica,STHeiTi,sans-serif;
                }
                .recommend--body--ul--li__right--author {
                  font-size: 0.7rem;
                  color: rgb(170, 169, 169);
                  padding: 0.5rem 0;
                }
                .recommend--body--ul--li__right--info {
                  width: 100%;
                  height: 3rem;
                  color: rgb(170, 169, 169);
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                }
                .recommend--body--ul--li__right--tags {
                  margin-top: 0.7rem;
                  .recommend--body--ul--li__right--tags--two,
                  .recommend--body--ul--li__right--tags--three {
                    height: 13/12rem;
                    padding: 0.2rem 0.4rem 0.1rem;
                    color: rgb(145, 141, 141);
                    border: 0.005rem solid rgb(224, 222, 222);
                  }
                }
              }
            }
          }
        }
      }
      .header {
        width: 100%;
        height: auto;
        .header--list {
          padding-bottom: 1rem;
          border-bottom: 0.1rem solid @bottomColor;
          .header--list__ul {
            width: 90%;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .header--list__ul__li {
              padding: .8rem 1rem 0;
              font-size: 1.4rem;
            } 
          }
          .middle--list__ul {
            width: 90%;
            list-style: none;
            .middle--list__ul__li {
              display: inline-block;
              font-size: 1.4rem;
              padding: .8rem 1rem 0;
            }
          }
        }
      }
      .bookList--footer {
        width: 100%;
        line-height: 50/12rem;
        display: none;
        transform: height 1s ease;
        .bookList--footer--text {
          font-size: 1.4rem;
          text-align: center;
          &::before {
            content: '';
            width: 2rem;
            height: 1.2rem;
            display: inline-block;
            vertical-align: middle;
            background: url('../assets/load.gif') center center no-repeat;
            background-size: 1.4rem 1.4rem;
          }
        }
        .bookList--footer--textend {
          font-size: 1.4rem;
          text-align: center;
        }
      }
    }
  }
</style>
