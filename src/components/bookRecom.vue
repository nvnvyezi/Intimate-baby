//推荐主页面
<template>
  <div class="box">
    <!-- <h3>强推</h3> -->
    <mt-swipe :auto="4000" class="swipe__box">
        <mt-swipe-item><img src="../assets/swipe.jpg" alt="" srcset=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe2.jpg" alt="" srcset=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe3.jpg" alt="" srcset=""></mt-swipe-item>
    </mt-swipe>
    <nav id="nav2">
      <!-- <span to="/" tag="div"><span>强推</span></span> -->
      <router-link to="cate" tag="div"><span>分类</span></router-link>
      <router-link to="seniority" tag="div"><span>排行</span></router-link>
      <router-link to="booksearch" tag="div"><span>搜索</span></router-link>
      <router-link to="" tag="div"><span>女频</span></router-link>
      <router-link to="" tag="div"><span>完本</span></router-link>
    </nav>
    <section>
      <div class="book-box">
        <h3>推荐书籍</h3>
        <div v-if="judge" class="li__box">
          <ul>
            <li v-for="(item, index) in result1" :key="index"><router-link to="/"><img :src="item" :alt="index"><span>{{ index }}</span></router-link></li>
          </ul>
        </div>
        <div v-else class="loading__box">
          <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        </div>
      </div>
    </section>
    <section>
      <div class="book__box">
        <h3>书籍列表</h3>
        <ul v-if="judge1">
          <router-link to="/" tag="li" v-for="(item, index) in result" :key="index">
            <strong>{{ item.sort  }}</strong>
            <span>{{ item.bookName }}</span>
            <span class="r">{{ item.typ }}</span>
          </router-link>
        </ul>
        <div v-else class="loading__box">
          <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import fetchGet from '../wheel/fetchGet'
import loading from './loadingImg'
export default {
  name: 'recom',
  data () {
    return {
      result: {},
      result1: {},
      judge: true,
      judge1: true
    }
  },
  created () {
    this.judge = false;
    this.judge1 = false;
    let that = this;
    if (window.fetch) {
      fetchGet('http://'+ window.location.hostname +':3000/bookRec', {}, 'get', (data) => {
        // console.log(data, '')
        that.result = data.result;
        that.judge = true;
      })
      fetchGet('http://'+ window.location.hostname +':3000/bookRem', {}, 'get', (data) => {
        // console.log(data, '')
        that.result1 = data.result;
        that.judge1 = true;
      })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(238, 237, 237);
    .swipe__box {
      width: 100vw;
      height: 30vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
      #nav2 {
        width: 100vw;
        height: 68px;
        margin-top: 0px;
        padding-top: 15px;
        // margin-bottom: 20px;
        background-color: white;
        // background-color: rgb(153, 161, 158);
        // background-color: paleturquoise;
        // position: fixed;
        // bottom: 0;
        // left: 0;
        display: grid;
        grid-template-columns: repeat(5, 40px);
        grid-template-rows: repeat(1, 40px);
        // justify-items: end;
        // grid-gap: 10px 20px;
        grid-column-gap: 20px;
        grid-row-gap: 10px;
        justify-content: center;
        div{
          width: 100%;
          height: 100%;
          justify-items: center;
          // background-color: red;
          display: inline-block;
          border-radius: 16px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover cover;
          span{
            position: relative;
            top: 46px;
            left: 8px;
            font-size: 0.4rem;
            color: rgb(175, 172, 172);
          }
        }
        div:nth-child(1) {
          background-image: url('../assets/推荐位.png');
          background-color: rgb(238, 134, 93);
        }
        div:nth-child(2) {
          background-image: url('../assets/分类.png');
          background-color: rgb(152, 88, 235);
        }
        div:nth-child(3) {
          background-image: url('../assets/排行榜.png');
          background-color: rgb(245, 179, 57);
        }
        div:nth-child(4) {
          background-image: url('../assets/男.png');
          background-color: rgb(60, 180, 250);
        }
        div:nth-child(5) {
          background-image: url('../assets/女.png');
          background-color: rgb(37, 194, 37);
        }
        div:nth-child(6) {
          background-image: url('../assets/完成.png');
          background-color: rgb(64, 238, 238);
        }
      }
    section {
      width: 100vw;
      height: auto;
      background-color: white;
      position: relative;
      .book-box {
        width: 90%;
        height: auto;
        margin: 5px auto;
        padding-bottom: 40px;
        // background-color: green;
        h3 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 0.5rem;
          font-weight: 400;
          padding: 20px 5px;
        }
      }
        .loading__box {
          width: 100vw;
          margin-left: -5vw;
          height: auto;
          img {
            width: 100%;
            height: auto;
          }
        }
        .li__box {
          ul {
            list-style-type: none;
            display: grid;
            grid-template-columns: repeat(3, 33.5%);
            // grid-column-gap: 10px;
            justify-items: center;
            grid-row-gap: 40px;
            li {
              width: 65px;
              height: 100px;
              display: inline-block;
              box-shadow: -5px 4px 2px 0px rgb(223, 220, 220);
              transform: skewY(-4deg);
              // overflow-x: hidden;
              // background-color: red;
              img {
                width: 100%;
                height: 100%;
              }
              a {
                // width: 70px;
                text-decoration: none;
                // overflow: hidden;
                // text-overflow: ellipsis;
                span {
                  margin-top: 20px;
                  padding-top: 20px;
                  font-size: 0.7rem;
                  font-weight: 400;
                  color: rgb(155, 155, 160);
                  transform: scale3d(0.5,0.5,0.5);
                  width: 70px;
                  text-align: left;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
    }
    section h3 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 0.5rem;
      font-weight: 400;
      padding: 20px 5px;
    }
    .book__box {
      width: 90vw;
      margin: 5px auto;
      background-color: white;
      ul {
        li {
          list-style-type: none;
          display: inline-block;
          width: 100%;
          line-height: 50px;
          border-bottom: 1px solid rgb(228, 223, 223);
          strong {
            color: rgb(216, 212, 212);
            font-size: 1rem;
            padding-right: 10px;
          }
          span {
            font-size: 0.5rem;
            font-weight: normal;
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            letter-spacing: 1px;
          }
          .r {
            // width: 70px;
            // line-height: 20px;
            float: right;
            direction: rtl;
            // border: 1px solid red;
          }
        }
        li:nth-child(odd) {
          // color: rgb(241, 180, 10);
          // border-bottom: none;
          // background-color: aqua;
        }
        li:nth-child(even) {
          color: rgb(33, 90, 247);
          // border-bottom: none;
        }
        li:first-child {
          strong {
            color: red;
          }
        }
        li:last-child {
          border-bottom: none;
        }
        li:nth-child(2) {
          strong {
            color: rgb(21, 255, 0);
          }
        }
        li:nth-child(3) {
          strong {
            color: rgb(247, 190, 3);
          }
        }
      }
    }
  }
}
</style>
