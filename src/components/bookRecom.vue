//推荐主页面
<template>
  <div class="box">
    <!-- <h3>强推</h3> -->
    <mt-swipe :auto="4000" class="swipe__box">
        <mt-swipe-item v-for="(item, index) in swipeData" :key="index"><img :src="item.imgUrl" :alt="item.linkText" srcset=""></mt-swipe-item>
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
        <h3>{{ list }}</h3>
        <div v-if="judge" class="li__box">
          <div class="li__box--ul">
            <ul>
              <li v-for="(item, index) in result1" :key="index">
                <router-link to="/">
                  <img :src="item.imgUrl" :alt="item.linkText">
                  <span>{{ item.linkText }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="refresh__box" @click="addrefresh">
            <span class="refresh__box--text">换一换</span>
            <span class="refresh__box--icon"></span>
          </div>
        </div>
        <div v-else class="loading__box">
          <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        </div>
      </div>
    </section>
    <section class="boy__box">
      <h3>{{ list1 }}</h3>
      <div class="boy__box--img">
        <ul class="boy__box--img__ul">
          <router-link class="boy__box--img__ul--li" v-for="(item, index) in boyResult" :key="index" to="" tag="li">
            <img :src="item.imgUrl" :alt="item.linkText">
            <span>{{ item.linkText }}</span>
          </router-link>
        </ul>
      </div>
      <div class="boy__box--text">
        <ul class="boy__box--text__ul">
          <router-link class="boy__box--text__ul--li" v-for="(item, index) in boyResult1" :key="index" to="" tag="li">
            <div class="boy__box--text__ul--li--h3">{{ item.linkText}}</div>
            <div class="boy__box--text__ul--li--tags">
              <span>{{ item.stat_name }}</span>
              <span>{{ item.class_name }}</span>
            </div>
            <div>
              <!-- <p>{{ item.introduction }}</p> -->
              <p>sdsadadadadasd</p>
            </div>
          </router-link>
        </ul>
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
      result1: [],
      boyResult: [],
      boyResult1: [],
      list: '',
      list1: '',
      judge: true,
      judge1: true,
      refreshJudge: true,
      swipeData: []
    }
  },
  created () {
    this.judge = false;
    this.judge1 = false;
    let that = this;
    const options = {
      appId: '11',
      pageId: '93',
      channelId: '',
      versionId: '',
      ver: '',
      shuqi_h5: '', 
      md5key: '',
      userId: '8000000',
      timestamp: '1525940277',
      type: '2',
      resetcache: '', 
      func_id: '20,24,11,19,33',
      orderid: '1,2,3,4,5',
      sign: '9B93AB56366DAE9AED3D183070247587',
      key: 'shuqiapi',
      _: '1525940277318'
    }
    if (window.fetch) {
      fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
        // console.log(data, '')
        this.list = data.data.module[3].m_s_name;
        Array.prototype.forEach.call(data.data.module[0].content, (item) => {  
          let obj = {};
          obj.imgUrl = item.image_url;
          obj.linkText = item.link_text;
          this.swipeData.push(obj);
        })
        Array.prototype.forEach.call(data.data.module[3].content, (item) => {  
          let obj = {};
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
          this.result1.push(obj);
        })
        this.judge = true;
      })
    }
    this.getBoyGirl(function (param) {  })
  },
  methods: {
    getRecom (callback) {
      const options = {
        appId: '11',
        pageId: '93',
        channelId: '',
        versionId: '',
        ver: '',
        shuqi_h5: '', 
        md5key: '',
        userId: '8000000',
        timestamp: '1525944067',
        type: '2',
        resetcache: '', 
        func_id: '19',
        orderid: '4',
        mid: '1388',
        lmkTxt: 'index',
        sign: 'C6FDEED1E0EC0DAD42F1BB3D660783DF',
        key: 'shuqiapi',
        _: '1525944067034'
      }
      this.result1 = [];
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          console.log(data, '')
          Array.prototype.forEach.call(data.data.module[0].content, (item) => {  
            let obj = {};
            obj.imgUrl = item.book_cover;
            obj.linkText = item.bookname.slice(0, 3) + '...';
            this.result1.push(obj);
          })
          callback();
        })
      }
    },
    addrefresh () {
      if (this.refreshJudge) {
        this.refreshJudge = false;
        this.judge  = false;
        this.getRecom(() => {this.judge = true;});
        let refresh = document.getElementsByClassName('refresh__box--icon');
        refresh[0].classList.add('refreshing');
        setTimeout(() => {
          this.refreshJudge = true;
          refresh[0].classList.remove('refreshing');
        }, 1000);
      }
    },
    getBoyGirl (callback) {
      const options = {
        appId: '11',
        pageId: '93',
        channelId: '',
        versionId: '',
        ver: '',
        shuqi_h5: '', 
        md5key: '',
        userId: '8000000',
        timestamp: '1525953643',
        type: '2',
        resetcache: '', 
        func_id: '11,33,11,19,33,11,19,33,11,19',
        orderid: '6,7,8,9,12,14,15,18,21,22',
        sign: '37A3933CC42B68590B8E534EBF7B2283',
        key: 'shuqiapi',
        _: '1525953643514'
      }
      this.result1 = [];
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          // console.log(data, data.data.module[3].m_s_name)
          this.list1 = data.data.module[3].m_s_name;
          Array.prototype.forEach.call(data.data.module[3].content, (item, index) => { 
            let obj = {};
            if (index < 4) {
              obj.imgUrl = item.book_cover;
              obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
              this.boyResult.push(obj);
            } else {
              obj.linkText = item.bookname;
              obj.stat_name = item.stat_name;
              obj.class_name = item.class_name;
              obj.introduction = item.introduction;
              this.boyResult1.push(obj);
            }
          })
          callback();
        })
      }
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
    .boy__box {
      width: 100%;
      height: 35.2rem;
      .boy__box--img {
        width: 100%;
        height: 12rem;
        .boy__box--img__ul {
          width: 100%;
          display: inline-block;
          display: grid;
          grid-template-columns: repeat(4, 25%);
          grid-template-rows: 8rem;
          justify-items: center;
          list-style: none;
          .boy__box--img__ul--li {
            width: 5rem;
            height: auto;
            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
      .boy__box--text {
        width: 100vw;
        height: auto;
        .boy__box--text__ul {
          width: 100%;
          list-style: none;
          .boy__box--text__ul--li {
            width: 90%;
            height: 6rem;
            margin: 0 auto;
            border-top: 1px solid rgb(240, 236, 236);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            .boy__box--text__ul--li--h3 {
              width: 60%;
              font-size: 1.45rem;
              font-weight: 400;
              font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
            }
            .boy__box--text__ul--li--tags {
              width: 30%;
              .statName (@fcolor: #70a7e3) {
                span:first-child {
                  color: @fcolor;
                }
              } 
              span {
                height: 1rem;
                line-height: 1rem;
                padding: 0.21rem;
                border: 0.005rem solid rgb(209, 207, 207);
              }
              span:last-child {
                color: rgb(160, 158, 158);
              }
            }
          }
        }
      }
    }
    .swipe__box {
      width: 100vw;
      height: 26vh;
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
        width: 100%;
        height: 28rem;
        margin: 5px auto;
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
        width: 100%;
        height: auto;
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
            // &::after {
            //   content: '  ';
            //   width: 1rem;
            //   height: 4rem;
            //   display: block;
            //   float: right;
            //   background-image: url('../assets/refresh.png');
            //   background-size: 1rem 1rem;
            //   background-repeat: no-repeat;
            //   background-position: center center;
            //   margin-left: 0.5rem;
            // }
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
        .li__box--ul {
          width: 100vw;
          height: 19rem;
          border-bottom: 0.01rem solid rgb(223, 220, 220);
          ul {
            list-style-type: none;
            display: grid;
            grid-template-columns: repeat(4, 25%);
            // grid-column-gap: 10px;
            justify-items: center;
            grid-row-gap: 40px;
            width: 100%;
            height: auto;
            li {
              width: 4rem;
              height: 6rem;
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
                  font-size: 0.4rem;
                  font-weight: 400;
                  color: rgb(155, 155, 160);
                  transform: scale3d(0.5,0.5,0.5);
                  width: 70px;
                  // text-align: left;
                  // white-space: nowrap;
                  // overflow: hidden;
                  // text-overflow: ellipsis;
                }
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
