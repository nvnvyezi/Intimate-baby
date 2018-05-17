<template>
  <div class="box">
    
    <div class="recommend" style="border-bottom: 0.7rem solid rgb(243, 243, 243);">
      <ul class="recommend--ul">
        <router-link tag="li" @click.native="changeInfoBook" to="bookinformation" class="recommend--ul--li" v-for="(item, index) in recommendData" :key="index">{{ item }}</router-link>
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
        <router-link to="booksearchdata" @click.native="changeProp" class="history--ul--li" tag="li" v-for="(item, index) in localData" :key="index">{{ item }}</router-link>
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
      q: '',
      searchHistory: [],
      recommendData: [],
      refreshJudge: true,
      // localData: []
    }
  },
  created () {
    this.getrecomData();
  },
  computed: {
    localData: {
      get: function () {
        if (localStorage.getItem('searchHistory') !== null) {
          return localStorage.getItem('searchHistory').split(',');
        }
      }
    }
  },
  methods: {
    changeInfoBook (e) {
      let bookName = e.currentTarget.innerText;
      this.$store.dispatch({
        type: 'triggerInfoData',
        info: bookName
      })
    },
    changeProp (e) {
      this.$store.dispatch({
        type: 'triggerSearchData',
        data: e.target.innerText
      })
    },
    clearHistory () {
      localStorage.removeItem('searchHistory');
    },
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
            this.recommendData.push(item.title.length > 4 ? `${item.title}` : item.title);
          })
        })
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
        height: 199.78/12rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        // padding: 1.2rem 0;
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
      border-bottom: 5rem solid rgb(245, 243, 243);
      .history--header {
        width: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.1rem solid rgb(238, 237, 237);
        .history--header--h3 {
          font-size: 1.4rem;
          font-weight: 400;
          padding: 1rem 0;
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
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
