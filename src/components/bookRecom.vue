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
              <li @click="changeInfoBook" class="aaa" v-for="(item, index) in result1" :key="index">
                <router-link to="bookinformation" tag="div">
                  <img src="" v-lazyLoad="item.imgUrl" :alt="item.linkText">
                  <span :bid="item.bid">{{ item.linkText.length > 4 ? item.linkText.slice(0, 3) + '...' : item.linkText }}</span>
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
          <router-link @click.native="changeInfoBook" class="boy__box--img__ul--li  bbb" v-for="(item, index) in boyResult" :key="index" to="bookinformation" tag="li">
            <img src="" v-lazyLoad="item.imgUrl" :alt="item.linkText">
            <span :bid="item.bid">{{ item.linkText.length > 4 ? item.linkText.slice(0, 3) + '...' : item.linkText }}</span>
          </router-link>
        </ul>
      </div>
      <div class="boy__box--text">
        <ul class="boy__box--text__ul">
          <router-link @click.native="changeInfoBook" class="boy__box--text__ul--li ccc" v-for="(item, index) in boyResult1" :key="index" to="bookinformation" tag="li">
            <div class="boy__box--text__ul--li--h3" :bid="item.bid">{{ item.linkText}}</div>
            <div class="boy__box--text__ul--li--tags">
              <span v-if="item.stat_name == '连载'" class="statNameblue">{{ item.stat_name }}</span>
              <span v-else class="statNamered">{{ item.stat_name }}</span>
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
          <router-link @click.native="changeInfoBook" class="boy__box--img__ul--li bbb" v-for="(item, index) in girlResult" :key="index" to="bookinformation" tag="li">
            <img src="" v-lazyLoad="item.imgUrl" :alt="item.linkText">
            <span :bid="item.bid">{{ item.linkText.length > 4 ? item.linkText.slice(0, 3) + '...' : item.linkText }}</span>
          </router-link>
        </ul>
      </div>
      <div class="boy__box--text">
        <ul class="boy__box--text__ul">
          <router-link @click.native="changeInfoBook" class="boy__box--text__ul--li ccc" v-for="(item, index) in girlResult1" :key="index" to="bookinformation" tag="li">
            <div class="boy__box--text__ul--li--h3" :bid="item.bid">{{ item.linkText}}</div>
            <div class="boy__box--text__ul--li--tags">
              <span v-if="item.stat_name == '连载'" class="statNameblue">{{ item.stat_name }}</span>
              <span v-else class="statNamered">{{ item.stat_name }}</span>
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
              <li @click="changeInfoBook" class="aaa" v-for="(item, index) in doneResult" :key="index">
                <router-link to="bookinformation" tag="div">
                  <img src="" v-lazyLoad="item.imgUrl" :alt="item.linkText">
                  <span :bid="item.bid">{{ item.linkText.length > 4 ? item.linkText.slice(0, 3) + '...' : item.linkText }}</span>
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
        <router-link @click.native="changeInfoBook" class="bestSelling__ul__li eee" v-for="(item, index) in bestSelResult" :key="index" to="bookinformation" tag="li">
          <div v-if="index === 0" class="bestSelling__ul__li__block">
            <div class="bestSelling__ul__li__block--left">
              <img class="bestSelling__ul__li__block--left--img" src="" v-lazyLoad="item.imgUrl" :alt="item.bookName" />
              <i class="bestSelling__ul__li__block--left--icon"></i>
            </div>
            <div class="bestSelling__ul__li__block--right">
              <h3 class="bestSelling__ul__li__block--right--title" :bid="item.bid">{{ item.bookName }}</h3>
              <p class="bestSelling__ul__li__block--right--author">{{ item.authorName }}</p>
              <p class="bestSelling__ul__li__block--right--info">{{ item.introduction }}</p>
              <div class="bestSelling__ul__li__block--right--tag">
                <span class="bestSelling__ul__li__block--right--stat">{{ item.stat_name }}</span>
                <span class="bestSelling__ul__li__block--right--size">{{ item.size }}</span>
                <span class="bestSelling__ul__li__block--right--tags">{{ item.tag }}</span>
              </div>
            </div>
          </div>
          <i v-show="index !== 0" class="bestSelling__ul__li--list">{{ index + 1 }}</i>
          <h3 class="bestSelling__ul__li--title" :bid="item.bid" v-show="index !== 0">{{ item.bookName }}</h3>
          <span class="bestSelling__ul__li--stat" v-show="index !== 0">{{ item.stat_name }}</span>
          <span class="bestSelling__ul__li--type" v-show="index !== 0">{{ item.class_name }}</span>
        </router-link>
      </div>
      <router-link @click.native="changeProp" to="moreBook" tag="div" class="bestSelling__foot">
        <div class="bestSelling__foot--text">查看更多</div>
      </router-link>
    </section>
    <section class="new">
      <h3>{{ list5 }}</h3>
      <div class="new--middle">
        <ul class="new--middle__ul">
          <router-link @click.native="changeInfoBook" class="new--middle__ul__li bbb" to="bookinformation" tag="li" v-for="(item, index) in newResult" :key="index">
            <img class="new--middle__ul__li--img" src="" v-lazyLoad="item.imgUrl" :alt="item.linkText" />
            <span class="new--middle__ul__li--title" :bid="item.bid">{{ item.linkText.length > 4 ? item.linkText.slice(0, 3) + '...' : item.linkText }}</span>
          </router-link>
        </ul>
      </div>
      <router-link @click.native="changeProp" class="new--foot" to="moreBook" tag="div">
        <div class="new--foot__title">
          查看更多
        </div>
      </router-link>
    </section>
    <section class="recommend">
      <h3>{{ list6 }}</h3>
      <div class="recommend--body">
        <ul class="recommend--body--ul">
          <router-link @click.native="changeInfoBook" class="recommend--body--ul--li ddd" to="bookinformation" tag="li" v-for="(item, index) in recommendResult" :key="index">
            <div class="recommend--body--ul--li__left">
              <img class="recommend--body--ul--li__left--img" src="" v-lazyLoad="item.imgUrl" :alt="item.bookName">
            </div>
            <div class="recommend--body--ul--li__right">
              <h3 class="recommend--body--ul--li__right--title" :bid="item.bid">{{ item.bookName }}</h3>
              <p class="recommend--body--ul--li__right--author">{{ item.authorName }}</p>
              <p class="recommend--body--ul--li__right--info">{{ item.introduction }}</p>
              <div class="recommend--body--ul--li__right--tags">
                <span v-if="item.stat_name == '连载'" class="statNameblue">{{ item.stat_name }}</span>
                <span v-else class="statNamered">{{ item.stat_name }}</span>
                <span class="recommend--body--ul--li__right--tags--two">{{ item.size }}</span>
                <span class="recommend--body--ul--li__right--tags--three">{{ item.class_name }}</span>
              </div>
            </div>
          </router-link>
        </ul>
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
      swipeData: [],
      boyResult: [],
      boyResult1: [],
      girlResult: [],
      girlResult1: [],
      doneResult: [],
      bestSelResult: [],
      newResult: [],
      recommendResult: [],
      list: '',
      list1: '',
      list2: '',
      list3: '',
      list4: '',
      list5: '',
      list6: '',
      judge: true,
      doneJudge: true,
      judge1: true,
      refreshJudge: true,
      refreshJudge1: true,
      moreProp: ''
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
          obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname;
          obj.bid = item.bid;
          this.result1.push(obj);
        })
        this.judge = true;
      })
    }
    this.getBoyGirl(function (param) {  });
    this.getBestSelling();
    this.getRecommend();
  },
  methods: {
    changeInfoBook (e) {
      let bookName = '';
      let cla = e.currentTarget.getAttribute('class');
      if (cla.indexOf('aaa') !== -1) {
        bookName = e.currentTarget.firstChild.lastChild.getAttribute('bid');
      } else if (cla.indexOf('bbb') !== -1) {
        bookName = e.currentTarget.lastChild.getAttribute('bid');
      } else if (cla.indexOf('ccc') !== -1) {
        bookName = e.currentTarget.firstChild.getAttribute('bid');
      } else if (cla.indexOf('ddd') !== -1) {
        bookName = e.currentTarget.children[1].firstChild.getAttribute('bid');
      } else if (cla.indexOf('eee') !== -1) {
        bookName = e.currentTarget.children[1].getAttribute('bid');
        if (bookName == null) {
          bookName = e.currentTarget.children[0].children[1].firstChild.getAttribute('bid');
        }
      }
      // console.log(bookName)
      this.$store.dispatch({
        type: 'triggerBookId',
        id: bookName
      })
      localStorage.setItem('bookId', bookName);
      // localStorage.setItem('authorId', '');
      // localStorage.setItem('authorName', '');
    },
    changeProp (e) {
      // console.log(document.documentElement.scrollTop, document.body.scrollTop)
      switch (e.currentTarget.getAttribute('class')) {
        case 'bestSelling__foot':
          this.$store.commit({
            type: 'changeMoreBookTitle',
            title: '精品畅销'
          })
          break;
        case 'new--foot':
          this.$store.commit({
            type: 'changeMoreBookTitle',
            title: '新书潜力'
          })
          break;
        default:
          break;
      }
    },
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
            obj.linkText = item.bookname;
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
              obj.linkText = item.bookname;
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
              obj.linkText = item.bookname;
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
            obj.linkText = item.bookname;
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
          this.list5 = data.data.module[8].m_s_name;
          Array.prototype.forEach.call(data.data.module[4].content, (item, index) => { 
            let obj = {};
            obj.bid = item.bid;
            obj.bookName = item.bookname;
            obj.authorName = item.author_name;
            obj.size = item.size.slice(0, 3) + '万字';
            obj.stat_name = item.stat_name;
            obj.class_name = item.class_name;
            obj.introduction = item.introduction;
            obj.tag = item.tag[0];
            obj.imgUrl = item.book_cover;
            this.bestSelResult.push(obj);
          })
          Array.prototype.forEach.call(data.data.module[8].content, (item) => {  
            let obj = {};
            obj.imgUrl = item.book_cover;
            obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname;
            obj.bid = item.bid;
            this.newResult.push(obj);
          })
        })
      }
    },
    getRecommend () {
      const options = {
        appId: '11',
        pageId: '93',
        channelId: '',
        versionId: '',
        ver: '',
        shuqi_h5: '', 
        md5key: '',
        userId: '8000000',
        timestamp: '1526290238',
        type: '2',
        resetcache: '', 
        func_id: '33,11,28,33,12,33,11,19,33',
        orderid: '35,36,37,38,39,40,41,42,43',
        sign: '3E26701E27A6ABD551FAE9A643AF4906',
        key: 'shuqiapi',
        _: '1526290238825'
      }
      if (window.fetch) {        
        fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
          // console.log(data, data.data.module[6].m_s_name)
          this.list6 = data.data.module[6].content.title;
          Array.prototype.forEach.call(data.data.module[7].content, (item, index) => { 
            let obj = {};
            obj.bid = item.bid;
            obj.bookName = item.bookname;
            obj.authorName = item.author_name;
            obj.size = item.size.slice(0, 3) + '万字';
            obj.stat_name = item.stat_name;
            obj.class_name = item.class_name;
            obj.introduction = item.introduction;
            obj.imgUrl = item.book_cover;
            this.recommendResult.push(obj);
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  @graycolor:rgb(155, 155, 160);
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
    .borderColorG {
      height: 13/12rem;
      padding: 0.2rem 0.5rem 0.1rem;
      color: @graycolor;
      border: 0.005rem solid @graycolor;
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
      height: auto;
      border-bottom: 0.7rem solid #f0ebeb;
      background-color: white;
      padding-bottom: 1rem;
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
              grid-row-gap: 20px;
              width: 100%;
              height: auto;
              li {
                width: 4.5rem;
                height: 8rem;
                display: inline-block;
                img {
                  box-shadow: -5px 4px 2px 0px rgb(223, 220, 220);
                  transform: skewY(-4deg);
                  width: 100%;
                  height: auto;
                }
                span {
                  width: 70px;
                  height: 2rem;
                  overflow: hidden;
                  display: block;
                  margin-top: 8px;
                  font-size: 0.4rem;
                  font-weight: 400;
                  // transform: scale3d(0.9,0.9,0.9);
                  text-decoration: none;
                  -webkit-font-smoothing: antialiased;
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
      height: auto;
      background-color: white;
      border-bottom: 0.7rem solid #f0ebeb;
      h3 {
        .sectionH3;
      }
      .bestSelling__ul {
        width: 90%;
        height: auto;
        margin: 0 auto;
        list-style: none;
        .bestSellH3 {
          font-size: 1.5rem;
          font-weight: 550;
          padding: 0;
        }
        .bestSelling__ul__li:first-child {
          width: 100%;
          height: 145/12rem;
          border-top: none;
          .bestSelling__ul__li__block {
            width: 100%;
            height: auto;
            .bestSelling__ul__li__block--left {
              width: 84/12rem;
              height: 112/12rem;
              float: left;
              position: relative;
              .bestSelling__ul__li__block--left--img {
                width: 100%;
                height: auto;
              }
              .bestSelling__ul__li__block--left--icon {
                background-image: url('../assets/bestSellicon.png');
                display: inline-block;
                width: 22.5/12rem;
                height: 34.5/12rem;
                position: absolute;
                top: 0;
                z-index: 0;
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
            }
            .bestSelling__ul__li__block--right {
              width: 188/12rem;
              height: 113/12rem;
              float: right;
              .bestSelling__ul__li__block--right--title {
                .bestSellH3;
              }
              .bestSelling__ul__li__block--right--author {
                font-size: 0.7rem;
                color: @graycolor;
                margin: 0.4rem 0;
              }
              .bestSelling__ul__li__block--right--info {
                width: 100%;
                height: 3rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                color: @graycolor;
                margin: 0.5rem 0;
              }
              .bestSelling__ul__li__block--right--tag {
                .bestSelling__ul__li__block--right--stat {
                  .statNamered;
                }
                .bestSelling__ul__li__block--right--size {
                  width: 58.03/12rem;
                  .borderColorG;
                }
                .bestSelling__ul__li__block--right--tags {
                  width: 38.02/12rem;
                  margin-left: 0.3rem;
                  .borderColorG;
                }
              }
            }
          }
        }
        .bestSelling__ul__li {
          width: 100%;
          height: 52/12rem;
          border-top: 1px solid (@graycolor * 1.53);
          display: -webkit-box;
          -webkit-box-orient: horizontal;
          -webkit-box-align: center;
          .bestSelling__ul__li--list {
            .bestSellH3;
            font-size: 2rem;
            -webkit-box-flex: 1;
            color: @graycolor;
          }
          .bestSelling__ul__li--title {
            .bestSellH3;
            -webkit-box-flex: 3;
            margin-left: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .bestSelling__ul__li--stat {
            text-align: right;
            -webkit-box-flex: 2;
            .statNameblue;
          }
          .bestSelling__ul__li--type {
            .borderColorG;
          }
        }
        .bestSelling__ul__li:nth-child(2) {
          .bestSelling__ul__li--list {
            color: #FFBE73;
          }
        }
        .bestSelling__ul__li:nth-child(3) {
          .bestSelling__ul__li--list {
            color: #FFD873;
          }
        }
      }
      .bestSelling__foot {
        width: 100%;
        height: 48/12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .bestSelling__foot--text {
          font-size: 1.4rem;
          letter-spacing: 0.05rem;
        }
      }
      .bestSelling__foot:hover {
        background-color: #f7f7fa;
      }
    }
    .new {
      width: 100%;
      height: auto;
      background-color: white;
      border-bottom: 0.7rem solid #f0ebeb;
      h3 {
        .sectionH3;
      }
      .new--middle {
        width: 320/12rem;
        height: 120/12rem;
        .new--middle__ul {
          width: 90%;
          height: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 25%);
          list-style: none;
          justify-items: center;
          .new--middle__ul__li {
            width: 60/12rem;
            height: 79.98/12rem;
            .new--middle__ul__li--img {
              width: 100%;
              height: 100%;
            }
            .new--middle__ul__li--title {
              color: #a7a7a7;
            }
          }
        }
      }
      .new--foot {
        width: 100%;
        height: 48/12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .new--foot__title {
          font-size: 1.4rem;
          letter-spacing: 0.05rem;
        }
        &:hover {
          background-color: #f7f7fa;
        }
      }
    }
    .recommend {
      width: 100%;
      height: auto;
      background-color: white;
      h3 {
        .sectionH3;
      }
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
  }
}
</style>
