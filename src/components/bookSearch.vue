<template>
  <div class="box">
    <div class="form__search">
      <div class="form__search__content">
        <span class="form__search__content--icon"></span>
        <input class="form__search__content--input" type="text" name="" @input="getSearchData" placeholder="书名/作者/关键词" />
        <!-- <router-link class="form__search__content--button" to="bookSearchList" @click.native="saveHistory" tag="button">搜索</router-link> -->
      </div>
    </div>
    <div v-show="searchJudge" class="searchDataBox1">
      <ul class="searchDataBox1__ul">
        <router-link to="" class="searchDataBox1__ul--li" tag="li" @click.native="saveHistory" v-for="(item, index) in searchData1" :key="index">{{ item }}</router-link>
      </ul>
    </div>
    <div class="recommend" style="border-bottom: 0.7rem solid rgb(243, 243, 243);">
      <ul class="recommend--ul">
        <li class="recommend--ul--li" v-for="(item, index) in recommendData" :key="index">{{ item }}</li>
      </ul>
      <div class="refresh__box" @click="addrefresh1">
        <span class="refresh__box--text">换一换</span>
        <span class="refresh__box--icon"></span>
      </div>
    </div>
    <div class="history">
      <header class="history--header">
        <h3 class="history--header--h3">搜索历史</h3>
        <span class="history--header--delete">删除</span>
      </header>
      <ul class="history--ul">
        <router-link to="" class="history__ul--li" tag="li" v-for="(item, index) in localData" :key="index">{{ item }}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'bookSearch',
  data () {
    return {
      listName: '搜索',
      searchJudge: false,
      searchData1: [],
      q: '',
      searchHistory: [],
      recommendData: [],
      refreshJudge: true,
      localData: []
    }
  },
  created () {
    this.getrecomData();
  },
  mounted () {
    if (localStorage.getItem('searchHistory') !== null) {
      this.localData = localStorage.getItem('searchHistory').split(',');
    }
  },
  methods: {
    addrefresh1 () {
      if (this.refreshJudge) {
        this.refreshJudge = false;
        this.judge  = false;
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
      if (window.fetch) {
        const options = {
          do: 'is_payreco',
          id: '8000000',
          qtf: 'shuqiApp',
          qtn: 'cpSearchReplace_sug',
          nums: 9,
          shuqi_h5: '',
          _: '1526306009274'
        }
        this.recommendData = [];
        fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
          Array.prototype.forEach.call(data.data, (item) => {
            this.recommendData.push(item.title.length > 4 ? `${item.title.slice(0, 3)}...` : item.title);
          })
        })
      }
    },
    getSearchData (e) {
      this.q = e.target.value;
      if (window.fetch) {
        fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php?do=is_pay_sugs&q', {q: e.target.value}, 'get', (data) => {
          // console.log(data);
          if (data.status === 1) {
            this.searchJudge = true;
            if (data.data.length > 4) {
              this.searchData1 = data.data.slice(0,4);
            } else {
              this.searchData1 = data.data;
            }
          } else {
            this.searchJudge = false;
          }
        })
      }
    },
    saveHistory () {
      if (this.q !== '') {        
        let data = [];
        if (localStorage.getItem('searchHistory') !== null) {
          data = localStorage.getItem('searchHistory').split(',');
        }
        data.push(this.q);
        localStorage.setItem('searchHistory', data);
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
    .form__search {
      width: 100vw;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .form__search__content {
        width: 90%;
        // height: 3.5rem;
        background-color: white;
        display: flex;
        // justify-content: center;
        align-content: center;
        .form__search__content--icon {
          width: 3rem;
          height: 3.5rem;
          display: block;
          margin-right: .15rem;
          background-image: url('../assets/search.png');
          background-size: 1rem 1rem;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .form__search__content--input {
          width: 70%;
          // height: 40px;
          border: none;
          outline: none;
        }
      }
    }
    .searchDataBox1 {
      width: 100vw;
      height: auto;
      margin: 0 auto;
      background-color: white;
      position: absolute;
      .searchDataBox1__ul {
        list-style: none;
        width: 90%;
        margin: 0 auto;
        .searchDataBox1__ul--li {
          width: 100%;
          line-height: 4rem;
          border-bottom: 2px solid rgb(243, 241, 241);
          font-size: 1rem;
        }
      }
      .searchDataBox1__ul--li:last-child {
        border-bottom: none;
      }
    }
    .recommend {
      width: 100%;
      height: auto;
      background-color: white;
      .recommend--ul {
        width: 100%;
        height: 199.78/12rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        padding: 1.2rem 0;
        border-bottom: 0.1rem solid rgb(241, 240, 240);
        .recommend--ul--li {
          width: 72.66/12rem;
          height: 31/12rem;
          line-height: 31/12rem;
          margin: 1rem 1rem;
          border: 1px solid rgb(236, 232, 232);
          border-radius: 40%;
          text-align: center;
          color: rgb(63, 57, 57);
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
      .history--header {
        width: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        .history--header--h3 {
          font-size: 1.4rem;
          font-weight: 400;
          padding: 1rem 0;
        }
        .history--header--delete {
          width: 3rem;
          color: rgb(180, 177, 177);
          font-size: 1.2rem;
          padding: 0 1rem;
          &::before {
            content: '';
            width: 4rem;
            height: 1rem;
            background-image: url('../assets/delete.png');
            background-size: 1rem 1rem;
            background-repeat: no-repeat;
            display: block;
            background-position: left center;
          }
        }
      }
    }
  }
}
</style>
