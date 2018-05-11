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
    <section class="bookBox">
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
        </div>
        <div v-else class="loading__box">
          <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        </div>
        <div class="refresh__box" @click="addrefresh">
          <span class="refresh__box--text">换一换</span>
          <span class="refresh__box--icon"></span>
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
              <span class="statNamered">{{ item.stat_name }}</span>
              <span>{{ item.class_name }}</span>
            </div>
            <div class="boy__box--text__ul--li--text">
              {{ item.introduction }}
            </div>
          </router-link>
        </ul>
      </div>
    </section>
    <section class="boy__box">
      <h3>{{ list2 }}</h3>
      <div class="boy__box--img">
        <ul class="boy__box--img__ul">
          <router-link class="boy__box--img__ul--li" v-for="(item, index) in girlResult" :key="index" to="" tag="li">
            <img :src="item.imgUrl" :alt="item.linkText">
            <span>{{ item.linkText }}</span>
          </router-link>
        </ul>
      </div>
      <div class="boy__box--text">
        <ul class="boy__box--text__ul">
          <router-link class="boy__box--text__ul--li" v-for="(item, index) in girlResult1" :key="index" to="" tag="li">
            <div class="boy__box--text__ul--li--h3">{{ item.linkText}}</div>
            <div class="boy__box--text__ul--li--tags">
              <span class="statNamered">{{ item.stat_name }}</span>
              <span>{{ item.class_name }}</span>
            </div>
            <div class="boy__box--text__ul--li--text">
              {{ item.introduction }}
            </div>
          </router-link>
        </ul>
      </div>
    </section>
    <section class="bookBox">
      <div class="book-box">
        <h3>{{ list3 }}</h3>
        <div v-if="doneJudge" class="li__box">
          <div class="li__box--ul">
            <ul>
              <li v-for="(item, index) in doneResult" :key="index">
                <router-link to="/">
                  <img :src="item.imgUrl" :alt="item.linkText">
                  <span>{{ item.linkText }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="loading__box">
          <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        </div>
        <div class="refresh__box" @click="addrefresh1">
          <span class="refresh__box--text">换一换</span>
          <span class="refresh__box--icon"></span>
        </div>
      </div>
    </section>
    <section class="bestSelling">
      <h3>{{ list4 }}</h3>
      <div class="bestSelling__ul">
        <router-link class="bestSelling__ul__li" v-for="(item, index) in bestSelResult" :key="index" to="" tag="li">
          <div v-if="index === 0" class="bestSelling__ul__li__block">
            <img class="bestSelling__ul__li__block--img" :src="item.imgUrl" :alt="item.bookName" />
            <h3 class="bestSelling__ul__li__block--title">{{ item.bookName }}</h3>
            <p class="bestSelling__ul__li__block--author">{{ item.authorName }}</p>
            <p class="bestSelling__ul__li__block--info">{{ item.introduction }}</p>
            <span class="bestSelling__ul__li__block--stat">{{ item.stat_name }}</span>
            <span class="bestSelling__ul__li__block--size">{{ item.size }}</span>
            <span class="bestSelling__ul__li__block--tag">{{ item.tag }}</span>
          </div>
          <h3 class="bestSelling__ul__li--title" v-show="index !== 0">{{ item.bookName }}</h3>
          <span class="bestSelling__ul__li--stat" v-show="index !== 0">{{ item.stat_name }}</span>
          <span class="bestSelling__ul__li--type" v-show="index !== 0">{{ item.class_name }}</span>
        </router-link>
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
      girlResult: [],
      girlResult1: [],
      doneResult: [],
      bestSelResult: [],
      list: '',
      list1: '',
      list2: '',
      list3: '',
      list4: '',
      judge: true,
      doneJudge: true,
      judge1: true,
      refreshJudge: true,
      refreshJudge1: true,
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
          let len = item.link_url.indexOf('bid:');
          let len1 = item.link_url.indexOf('});');
          obj.bid = item.link_url.slice(len + 4, len1);
          this.swipeData.push(obj);
        })
        Array.prototype.forEach.call(data.data.module[3].content, (item) => {  
          let obj = {};
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
          obj.bid = item.bid;
          this.result1.push(obj);
        })
        this.judge = true;
      })
    }
    this.getBoyGirl(function (param) {  });
    this.getBestSelling();
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
          // console.log(data, '')
          Array.prototype.forEach.call(data.data.module[0].content, (item) => {  
            let obj = {};
            obj.bid = item.bid;
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
    getDoneBook (callback) {
      const options = {
        appId: '11',
        pageId: '93',
        channelId: '',
        versionId: '',
        ver: '',
        shuqi_h5: '', 
        md5key: '',
        userId: '8000000',
        timestamp: '1526044743',
        type: '2',
        resetcache: '', 
        func_id: '19',
        orderid: '22',
        mid: '4188',
        lmkTxt: 'index',
        sign: '143E4F7C7E1421BF11E9B6A6543E2E54',
        key: 'shuqiapi',
        _: '1526044743832'
      }
      this.doneResult = [];
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          // console.log(data, '')
          Array.prototype.forEach.call(data.data.module[0].content, (item) => {  
            let obj = {};
            obj.bid = item.bid;
            obj.imgUrl = item.book_cover;
            obj.linkText = item.bookname.slice(0, 3) + '...';
            this.doneResult.push(obj);
          })
          callback();
        })
      }
    },
    addrefresh1 () {
      if (this.refreshJudge1) {
        this.refreshJudge1 = false;
        this.doneJudge  = false;
        this.getDoneBook(() => {this.doneJudge = true;});
        let refresh = document.getElementsByClassName('refresh__box--icon');
        refresh[1].classList.add('refreshing');
        setTimeout(() => {
          this.refreshJudge1 = true;
          refresh[1].classList.remove('refreshing');
        }, 1000);
      }
    },
    getBoyGirl (callback) {
      this.doneJudge = false;
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
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          // console.log(data, data.data.module[3].m_s_name)
          this.list2 = data.data.module[6].m_s_name;
          this.list1 = data.data.module[3].m_s_name;
          this.list3 = data.data.module[9].m_s_name;
          Array.prototype.forEach.call(data.data.module[3].content, (item, index) => { 
            let obj = {};
            obj.bid = item.bid;
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
          Array.prototype.forEach.call(data.data.module[6].content, (item, index) => { 
            let obj = {};
            obj.bid = item.bid;
            if (index < 4) {
              obj.imgUrl = item.book_cover;
              obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
              this.girlResult.push(obj);
            } else {
              obj.linkText = item.bookname;
              obj.stat_name = item.stat_name;
              obj.class_name = item.class_name;
              obj.introduction = item.introduction;
              this.girlResult1.push(obj);
            }
          })
          Array.prototype.forEach.call(data.data.module[9].content, (item) => {  
            let obj = {};
            obj.imgUrl = item.book_cover;
            obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
            obj.bid = item.bid;
            this.doneResult.push(obj);
          })
          this.doneJudge = true;
          callback();
        })
      }
    },
    getBestSelling () {
      const options = {
        appId: '11',
        pageId: '93',
        channelId: '',
        versionId: '',
        ver: '',
        shuqi_h5: '', 
        md5key: '',
        userId: '8000000',
        timestamp: '1526043109',
        type: '2',
        resetcache: '', 
        func_id: '33,11,33,11,19,12,33,11,19,12',
        orderid: '23,24,25,26,27,28,29,30,31,32',
        sign: '5C251E0B84037646C22B8CCE2FEEE6B0',
        key: 'shuqiapi',
        _: '1526043109522'
      }
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          // console.log(data, data.data.module[3].m_s_name)
          this.list4 = data.data.module[4].m_s_name;
          Array.prototype.forEach.call(data.data.module[4].content, (item, index) => { 
            let obj = {};
            obj.bid = item.bid;
            obj.bookName = item.bookname;
            obj.authorName = item.author_name;
            obj.size = Math.ceil(parseInt(item.size.slice(0, 3)));
            obj.stat_name = item.stat_name;
            obj.class_name = item.class_name;
            obj.introduction = item.introduction;
            obj.tag = item.tag[0];
            obj.imgUrl = item.book_cover;
            this.bestSelResult.push(obj);
          })
          // Array.prototype.forEach.call(data.data.module[6].content, (item, index) => { 
          //   let obj = {};
          //   obj.bid = item.bid;
          //   if (index < 4) {
          //     obj.imgUrl = item.book_cover;
          //     obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
          //     this.girlResult.push(obj);
          //   } else {
          //     obj.linkText = item.bookname;
          //     obj.stat_name = item.stat_name;
          //     obj.class_name = item.class_name;
          //     obj.introduction = item.introduction;
          //     this.girlResult1.push(obj);
          //   }
          // })
          // Array.prototype.forEach.call(data.data.module[9].content, (item) => {  
          //   let obj = {};
          //   obj.imgUrl = item.book_cover;
          //   obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname.slice(0, 3) + '...';
          //   obj.bid = item.bid;
          //   this.doneResult.push(obj);
          // })
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
    .sectionH3 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 0.5rem;
      font-weight: 400;
      padding: 20px 5px;
    }
    #nav2 {
      width: 100vw;
      height: 68px;
      margin-top: 0px;
      padding-top: 15px;
      background-color: white;
      display: grid;
      grid-template-columns: repeat(5, 40px);
      grid-template-rows: repeat(1, 40px);
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
    .boy__box {
      width: 100%;
      height: 34rem;
      border-bottom: 0.7rem solid #f0ebeb;
      background-color: white;
      h3 {
        .sectionH3;
      }
      .boy__box--img {
        width: 95%;
        margin: 0 auto;
        height: 10rem;
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
              width: 35%;
              .statNameG {
                height: 1rem;
                line-height: 1rem;
                padding: 0.3rem 0.5rem 0.1rem;
              }
              .statName (@fcolor: #70a7e3) {
                .statNameG;
                color: @fcolor;
                border: 0.005rem solid @fcolor;
                margin-right: 0.5rem;
                font-size: 0.7rem;
              }
              .statNamered {
                .statName(#f08300)
              }
              .statNameblue {
                .statName(#70a7e3);
              }
              span:last-child {
                .statNameG;
                color: rgb(160, 158, 158);
                border: 0.005rem solid rgb(209, 207, 207);
              }
            }
            .boy__box--text__ul--li--text {
              width: 100%;
              height: 1.8rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #a7a7a7;
              font-size: 0.7rem;
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
    .bookBox {
      width: 100vw;
      height: auto;
      background-color: white;
      position: relative;
      .book-box {
        width: 100%;
        height: 28rem;
        margin: 0 auto;
        border-bottom: 0.7rem solid #f0ebeb;
        h3 {
          .sectionH3;
        }
        .li__box {
          width: 100%;
          height: auto;
          .li__box--ul {
            width: 95%;
            margin: 0 auto;
            height: 19rem;
            border-bottom: 0.01rem solid rgb(247, 247, 247);
            ul {
              list-style-type: none;
              display: grid;
              grid-template-columns: repeat(4, 25%);
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
                img {
                  width: 100%;
                  height: 100%;
                }
                a {
                  text-decoration: none;
                  span {
                    margin-top: 20px;
                    padding-top: 20px;
                    font-size: 0.4rem;
                    font-weight: 400;
                    color: rgb(155, 155, 160);
                    transform: scale3d(0.5,0.5,0.5);
                    width: 70px;
                  }
                }
              }
            }
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
      }
      .loading__box {
        width: 100vw;
        // margin-left: -5vw;
        height: 228.11px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    .bestSelling {
      width: 100%;
      height: 32rem;
      background-color: white;
      h3 {
        .sectionH3;
      }
      .bestSelling__ul {
        width: 90%;
        height: auto;
        margin: 0 auto;
        list-style: none;
        .bestSelling__ul__li:first-child {
          width: 100%;
          height: 145/12rem;
          .bestSelling__ul__li--img {
            width: 84/12rem;
            height: 112/12rem;
            float: left;
          }
        }
        .bestSelling__ul__li {
          width: 100%;
          height: 52/12rem;
        }
      }
    }
  }
}
</style>
