<template>
  <div class="box">
    <div class="recommend" style="border-bottom: 0.7rem solid rgb(243, 243, 243);">
      <ul class="recommend--ul">
        <router-link tag="li" @click.native="changeInfoBook" to="bookinformation" class="recommend--ul--li" v-for="(item, index) in recommendData" :bid="item.bid" :key="index">{{ item.title }}</router-link>
      </ul>
      <div class="refresh__box" @click="addrefresh1">
        <span class="refresh__box--text">换一换</span>
        <span class="refresh__box--icon"></span>
      </div>
    </div>
    <div class="history">
      <header class="history--header">
        <h3 class="history--header--h3">搜索历史</h3>
        <span @click="clearHistory" class="history--header--delete">删除</span>
      </header>
      <ul class="history--ul">
        <router-link to="booksearchdata" @click.native="changeProp" class="history--ul--li" tag="li" v-for="(item, index) in localData" :index="index" :key="index">
          {{ item }}
          <i class="history--ul--li--cancel" @click.prevent="clearHistoryOne"></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBookSearchRecom } from "../api/api";
export default {
  name: 'bookSearch',
  data () {
    return {
      listName: '搜索',
      q: '',
      searchHistory: [],
      recommendData: [],
      refreshJudge: true,
      localData: ''
    }
  },
  created () {
    this.getrecomData();
  },
  methods: {
    changeInfoBook (e) {
      let bookName = e.currentTarget.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: bookName
      })
    },
    changeProp (e) {
      this.$store.dispatch({
        type: 'triggerSearchData',
        data: e.target.innerText
      })
      localStorage['searchData'] = e.target.innerText;
    },
    clearHistory () {
      localStorage.removeItem('searchHistory');
      this.localData = null;
    },
    clearHistoryOne (e) {
      let index = e.target.parentNode.getAttribute('index');
      let data = [];
        if (localStorage.getItem('searchHistory') !== null) {
          data = localStorage.getItem('searchHistory').split(',');
        }
        data.splice(index, 1);
        this.localData = data;
        localStorage.setItem('searchHistory', data);
    },
    addrefresh1 () {
      if (this.refreshJudge) {
        let recommendUl = document.getElementsByClassName('recommend--ul')[0];
        recommendUl.style.height = recommendUl.offsetHeight + 'px';
        this.refreshJudge = false;
        this.getrecomData();
        let refresh = document.getElementsByClassName('refresh__box--icon');
        refresh[0].classList.add('refreshing');
        setTimeout(() => {
          this.refreshJudge = true;
          refresh[0].classList.remove('refreshing');
        }, 1000);
      }
    },
    getrecomData () {
      this.recommendData = [];
      getBookSearchRecom (data => {
        data.forEach(item => {
          let obj = {};
          obj.bid = item.bookid;
          obj.title = item.title.length > 5 ? item.title.slice(0, 4) + '...' : item.title;
          this.recommendData.push(obj);
        })
      })
    }
  },
  watch: {
    '$route' (data) {
      if (data.name == 'bookSearch') {
        try {
          this.localData = localStorage.getItem('searchHistory').split(',')
        } catch (error) {
          
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(245, 243, 243);
    .recommend {
      width: 100%;
      height: auto;
      background-color: white;
      .recommend--ul {
        width: 100%;
        // height: 199.78/12rem;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        border-bottom: 0.1rem solid rgb(241, 240, 240);
        .recommend--ul--li {
          // width: 72.66/12rem;
          width: 25%;
          height: 31/12rem;
          line-height: 31/12rem;
          font-size: 1rem;
          margin: 1rem 0rem;
          border: 1px solid rgb(236, 232, 232);
          border-radius: 1.5rem;
          text-align: center;
          color: rgb(63, 57, 57);
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .refresh__box {
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .refresh__box--text {
          font-size: 1.4rem;
          letter-spacing: 1px;
          color: #333;
          display: inline-block;
        }
        .refresh__box--icon {
          width: 1.5rem;
          height: 4rem;
          background-image: url('../assets/refresh.png');
          background-repeat: no-repeat;
          background-position: 0.5rem center;
          background-size: 1rem 1rem;
        }
        .refreshing {
          transition: transform 1s ease;
          transform: rotate(360deg);
          transform-origin: 65% center;
        }
      }
    }
    .history {
      width: 100%;
      height: auto;
      background-color: white;
      // border-bottom: 5rem solid rgb(245, 243, 243);
      .history--header {
        width: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.1rem solid rgb(238, 237, 237);
        .history--header--h3 {
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 1.4rem;
          font-weight: 400;
          padding: 1rem 0 1.2rem 1rem;
          color: #333;
          position: relative;
          &::after {
            content: '';
            width: .25rem;
            height: 1.2rem;
            display: inline-block;
            background: #f08300;
            position: absolute;
            top: 1.3rem;
            left: 0;
          }
        }
        .history--header--delete {
          width: 4rem;
          color: rgb(180, 177, 177);
          font-size: 1.2rem;
          padding: 0 1rem;
          &::before {
            content: '';
            width: 1.5rem;
            height: 1rem;
            background-image: url('../assets/delete.png');
            background-size: 1rem 1rem;
            background-repeat: no-repeat;
            display: inline-block;
            // vertical-align: text-bottom;
            background-position: center center;
          }
        }
      }
      .history--ul {
        width: 90%;
        margin: 0 auto;
        list-style: none;
        .history--ul--li {
          width: 100%;
          // height: 48/12rem;
          line-height: 48/12rem;
          font-size: 1.3rem;
          border-bottom: 0.1rem solid rgb(245, 243, 243);
          display: flex;
          justify-content: space-between;
          &:last-child {
            border-bottom: none;
          }
          .history--ul--li--cancel {
            display: block;
            width: 3rem;
            height: 3.5rem;
            position: relative;
            z-index: 20;
            background-image: url('../assets/cancel.png');
            background-size: 1rem 1rem;
            background-position: center center;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
