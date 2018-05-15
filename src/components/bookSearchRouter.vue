<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <div class="form__search">
      <div class="form__search__content">
        <span class="form__search__content--icon"></span>
        <input class="form__search__content--input" type="text" name="" @input="getSearchData" placeholder="书名/作者/关键词" />
        <!-- <router-link class="form__search__content--button" to="bookSearchList" @click.native="saveHistory" tag="button">搜索</router-link> -->
      </div>
    </div>
    <div v-show="searchJudge" class="searchDataBox1">
      <ul class="searchDataBox1__ul">
        <router-link to="booksearchdata" class="searchDataBox1__ul--li" tag="li" @click.native="saveHistory" v-for="(item, index) in searchData1" :key="index">{{ item }}</router-link>
      </ul>
    </div>
      <!-- <transition-group>     -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition-group> -->
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet';
export default {
  name: 'bookSearch',
  data () {
    return {
      listName: '搜索',
      searchJudge: false,
      searchData1: [],
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
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
    saveHistory (e) {
      let str =  e.target.innerText;
      if (str!== '') {        
        let data = [];
        if (localStorage.getItem('searchHistory') !== null) {
          data = localStorage.getItem('searchHistory').split(',');
        }
        if (data.indexOf(str) === -1) {
          data.unshift(str);
          localStorage.setItem('searchHistory', data);
        }
        this.$store.dispatch({
          type: 'triggerSearchData',
          data: str
        })
        const input = document.getElementsByClassName('form__search__content--input')[0];
        input.value = '';
        this.searchJudge = false;
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
    nav {
      width: 100%;
      line-height: 45px;
      background-color: rgb(241, 157, 60);
      display: grid;
      grid-template-columns: 50px auto 50px;
      color: white;
      text-align: center;
    }
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
      // position: absolute;
      border-bottom: 0.7rem solid rgb(247, 247, 247);
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
  }
}
</style>
