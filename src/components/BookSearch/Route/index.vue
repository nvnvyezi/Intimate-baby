<template>
  <div class="box">
    <div class="form__search">
      <div class="form__search__content">
        <span class="form__search__content--icon"></span>
        <input class="form__search__content--input" type="text" name="" @input="getSearchData" placeholder="书名/作者/关键词" />
        <span class="form__search__content--icon1" v-show="iconJudge" @click="deleteVal"></span>
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
import { getBookSearch } from "../../../api/api";
export default {
  name: 'bookSearch',
  data () {
    return {
      // listName: '搜索',
      searchJudge: false,
      searchData1: [],
      // input框删除所有
      iconJudge: false
    }
  },
  methods: {
    deleteVal (e) {
      let input = document.getElementsByClassName('form__search__content--input')[0];
      input.value = '';
      this.iconJudge = false;
      this.searchJudge = false;
    },
    // back () {
    //   this.$router.go(-1);
    // },
    // 模糊搜索
    getSearchData (e) {
      this.iconJudge = true;
      getBookSearch (e.target.value, data => {
        if (data.status === 1) {
          this.searchJudge = true;
          data.data.length > 4 ? this.searchData1 = data.data.slice(0,4) : this.searchData1 = data.data;
        } else {
          this.searchJudge = false;
        }
      })
    },
    saveHistory (e) {
      let str =  e.target.innerText;
      if (str!== '') {
        let data = [];
        if (localStorage.getItem('searchHistory') != null) {
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
        localStorage.setItem('searchData', str);
        let input = document.getElementsByClassName('form__search__content--input')[0];
        input.value = str;
        this.searchJudge = false;
      }
    }
  },
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  .iconG {
    width: 2rem;
    height: 2rem;
    background-size: contain;
    position: relative;
    z-index: 5;
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(245, 243, 243);
    // .box--nav {
    //   width: 100%;
    //   height: 4rem;
    //   display: flex;
    //   justify-content: center;
    //   position: relative;
    //   // align-items: center;
    //   background-color: rgb(241, 157, 60);
    //   .box--nav--header {
    //     width: 90%;
    //     line-height: 4rem;
    //     // display: grid;
    //     // grid-template-columns: 50px auto 50px;
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     color: white;
    //     text-align: center;
    //     font: 600 1.7rem '微软雅黑';
    //     .header-iconL {
    //       .iconG;
    //       background: url('../assets/返回.svg') no-repeat center;
    //     }
    //     .header-iconR {
    //       .iconG;
    //       background: url('../assets/h.svg') no-repeat center;
    //     }
    //   }
    // }
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
          background-image: url('../../../assets/search.png');
          background-size: 1rem 1rem;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .form__search__content--icon1 {
          width: 3rem;
          height: 3.5rem;
          display: block;
          // margin-right: .15rem;
          background-image: url('../../../assets/cancel.png');
          background-size: 1rem 1rem;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .form__search__content--input {
          width: 70%;
          flex: 1 1 auto;
          // height: 40px;
          background-color: white;
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
          border-bottom: 1px solid rgb(243, 241, 241);
          font-size: 1.2rem;
        }
      }
      .searchDataBox1__ul--li:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
