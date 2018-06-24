//推荐主页面
<template>
  <div class="recomBox">
    <!-- <div class="swipe__box">
      <div class="swipe__box-out">
        <div class="swipe--container" v-for="(item, index) in swipeData" :bid="item.bid" @click.native="changeInfoBook1" :key="index">
          <img :src="item.imgUrl" :alt="item.linkText" />
        </div>
      </div>
    </div> -->
    <!-- <swipe :swipeData="swipeData"></swipe> -->
    <nav id="nav2">
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
            <ul class="bookBox--a">
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
            <ul class="bookBox--b">
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
      <h3 class="bestSelling--h3">{{ list4 }}</h3>
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
      <h3 class="recommend--h3">{{ list6 }}</h3>
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
import { getBookData, getBookRecom, getBookBoyGirl, getBookDone, getBookBestSell, getBookInterest } from "../api/api";
import swipe from './template/swipe/swipe';
export default {
  components: {
    swipe
  },
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
    getBookData (data => {
      // console.log(data)
      this.list = data.module[3].m_s_name;
      data.module[0].content.forEach(item => {  
        let obj = {};
        obj.imgUrl = item.image_url;
        obj.linkText = item.link_text;
        let len = item.link_url.indexOf('bid:');
        let len1 = item.link_url.indexOf('});');
        obj.bid = item.link_url.slice(len + 4, len + 11);
        // console.log()
        this.swipeData.push(obj);
      })
      data.module[3].content.forEach(item => {  
        let obj = {};
        obj.imgUrl = item.book_cover;
        obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname;
        obj.bid = item.bid;
        this.result1.push(obj);
      })
      this.judge = true;
      this.getBoyGirl();
    })
  },
  computed: {
    // hide () {
    //   return this.$store.state.home.hide;
    // }
  },
  // mounted () {
  //   if (this.$route.path === '/') {
  //     let recomBox = document.getElementsByClassName('recomBox')[0];
  //     recomBox.addEventListener('touchstart', this.start, false);
  //     recomBox.addEventListener('touchend', this.end, false);
  //   }
  // },
  methods: {
    changeInfoBook (e) {
      let id = '';
      let cla = e.currentTarget.getAttribute('class');
      if (cla.indexOf('aaa') !== -1) {
        id = e.currentTarget.firstChild.lastChild.getAttribute('bid');
      } else if (cla.indexOf('bbb') !== -1) {
        id = e.currentTarget.lastChild.getAttribute('bid');
      } else if (cla.indexOf('ccc') !== -1) {
        id = e.currentTarget.firstChild.getAttribute('bid');
      } else if (cla.indexOf('ddd') !== -1) {
        id = e.currentTarget.children[1].firstChild.getAttribute('bid');
      } else if (cla.indexOf('eee') !== -1) {
        id = e.currentTarget.children[1].getAttribute('bid');
        if (id == null) {
          id = e.currentTarget.children[0].children[1].firstChild.getAttribute('bid');
        }
      }
      this.$store.dispatch({
        type: 'triggerBookId',
        id: id
      })
      localStorage.setItem('bookId', id);
    },
    changeInfoBook1 (e) {
      let id = e.currentTarget.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: id
      })
      localStorage.setItem('bookId', id);
      this.$router.push('bookinformation');
    },
    changeProp (e) {
      switch (e.currentTarget.getAttribute('class')) {
        case 'bestSelling__foot':
          this.$store.commit('changeListName', '精品畅销榜')
          this.$store.dispatch({
            type: 'triggerType',
            typ: 1
          })
          localStorage.getItem('listName', '精品畅销榜');
          localStorage.setItem('seniorityType', 1);
          break;
        case 'new--foot':
          this.$store.commit('changeListName', '新书潜力榜');
          this.$store.dispatch({
            type: 'triggerType',
            typ: 6
          })
          localStorage.setItem('seniorityType', 6);
          localStorage.getItem('listName', '新书潜力榜');
          break;
        default:
          break;
      }
    },
    getRecom (callback) {
      getBookRecom (data => {
        data.forEach(item => {  
          let obj = {};
          obj.bid = item.bid;
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname;
          this.result1.shift();
          this.result1.push(obj);
        })
        // callback();
      })
    },
    addrefresh () {
      if (this.refreshJudge) {
        let h = document.getElementsByClassName('bookBox--a')[0];
        h.style.height = h.offsetHeight + 'px';
        this.refreshJudge = false;
        // this.judge  = false;
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
      getBookDone (data => {
        callback();
        data.forEach(item => {  
          let obj = {};
          obj.bid = item.bid;
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname.slice(0, 3) + '...';
          this.doneResult.shift();
          this.doneResult.push(obj);
        })
      })
    },
    addrefresh1 () {
      let h = document.getElementsByClassName('bookBox--b')[0];
        h.style.height = h.offsetHeight + 'px';
      if (this.refreshJudge1) {

        this.refreshJudge1 = false;
        // this.doneJudge  = false;
        this.getDoneBook(() => {this.doneJudge = true;});
        let refresh = document.getElementsByClassName('refresh__box--icon');
        refresh[1].classList.add('refreshing');
        setTimeout(() => {
          this.refreshJudge1 = true;
          refresh[1].classList.remove('refreshing');
        }, 1000);
      }
    },
    getBoyGirl () {
      this.doneJudge = false;
      getBookBoyGirl (data => {
        this.list2 = data.module[6].m_s_name;
        this.list1 = data.module[3].m_s_name;
        this.list3 = data.module[9].m_s_name;
        data.module[3].content.forEach((item, index) => { 
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
            obj.introduction = item.introduction.trim();
            this.boyResult1.push(obj);
          }
        })
        data.module[6].content.forEach((item, index) => { 
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
            obj.introduction = item.introduction.trim();
            this.girlResult1.push(obj);
          }
        })
        data.module[9].content.forEach((item) => {  
          let obj = {};
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname;
          obj.bid = item.bid;
          this.doneResult.push(obj);
        })
        this.doneJudge = true;
        this.getBestSelling();
      })
    },
    getBestSelling () {
      getBookBestSell (data => {
        this.list4 = data.module[4].m_s_name;
        this.list5 = data.module[8].m_s_name;
        data.module[4].content.forEach((item, index) => { 
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
        data.module[8].content.forEach((item) => {  
          let obj = {};
          obj.imgUrl = item.book_cover;
          obj.linkText = item.bookname.length < 5 ? item.bookname : item.bookname;
          obj.bid = item.bid;
          this.newResult.push(obj);
        })
        this.getRecommend();
      })
    },
    getRecommend () {
      getBookInterest (data => {
        this.list6 = data.module[6].content.title;
        // this.list6 = 'sd';
        data.module[7].content.forEach((item, index) => { 
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
    },
    // start (e) {
    //   this.startx = e.touches[0].pageX;
    //   this.starty = e.touches[0].pageY;
    // },
    // end (e) {
    //   let endx, endy;
    //   endx = e.changedTouches[0].pageX;
    //   endy = e.changedTouches[0].pageY;
    //   let direction = this.getDirection(this.startx, this.starty, endx, endy);
    //   switch (direction) {
    //     case 0:
    //       // console.log('为华东');
    //       break;
    //     case 1:
    //       // console.log('向上');
    //       this.hideChange(1);
    //       break;
    //     case 2:
    //       // console.log('下');
    //       this.hideChange(2);
    //       break;
    //     case 3:
    //       // console.log('坐');
    //       break;
    //     case 4:
    //       // console.log('有');
    //       break;
    //     default:
    //       break;
    //   }
    // },
    // hideChange (num) {
    //   if (num === 2) {
    //     nav1.classList.add('aniContrary');
    //     nav1.classList.remove('ani');
    //   }
    //   if (num === 1) {
    //     nav1.classList.remove('aniContrary');
    //     nav1.classList.add('ani');
    //   }
    // },
    // getAngle (angx, angy) {                               //获得角度
    //   return Math.atan2(angy, angx) * 180 / Math.PI;
    // },
    // getDirection (startx, starty, endx, endy) {                                       //返回方向
    //   let angx = endx - startx;
    //   let angy = endy - starty;
    //   let res = 0;
    //   let angle = this.getAngle(angx, angy);
    //   if (angle >= -170 && angle <= -10) {
    //     res = 1;
    //   } else if (angle > 10 && angle < 170) {
    //     res = 2;
    //   } else if ((angle >= 170 && angle <= 180) || (angle >= -180 && angle < -170)) {
    //     res = 3;
    //   } else if (angle >= -10 && angle <= 10) {
    //     res = 4;
    //   }
    //   return res;
    // }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  @graycolor:rgb(155, 155, 160);
  @bottomColor: #F0F0F2;
  .ani {
    transition: all 1s ease 0s;
    transform: translateY(9vh);
  }
  .aniContrary {
    transition: all 1s ease 0s;
    transform: translateY(0vh);
  }
  .recomBox {
    width: 100vw;
    height: auto;
    background-color: rgb(238, 237, 237);
    .sectionH3 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 1.4rem;
      font-weight: 400;
      padding: 1rem 0 1.2rem 1rem;
      color: #333;
      &::after {
        content: '';
        width: .28rem;
        height: 1.35rem;
        display: inline-block;
        background: #f08300;
        position: absolute;
        top: 1.3rem;
        left: 0;
      }
    }
    .statNameG {
      // height: 1rem;
      line-height: 1rem;
      font-size: 1.2rem;
      padding: 0.3rem 0.5rem 0.1rem;
    }
    .statName (@fcolor: #70a7e3) {
      .statNameG;
      color: @fcolor;
      border: 1px solid @fcolor;
      margin-right: 0.3rem;
    }
    .statNamered {
      .statName(#f08300)
    }
    .statNameblue {
      .statName(#499fff);
    }
    .borderColorG {
      height: 13/12rem;
      padding: 0.3rem 0.5rem 0.1rem;
      font-size: 1.2rem;
      color: @graycolor;
      border: 1px solid @graycolor;
    }
    .swipe__box {
      width: 100%;
      height: 181/12rem;
      position: relative;
      .swipe__box-out {
        width: 5 * 100%;
        height: 100%;
        position: absolute;
        .swipe--container {
          display: inline-block;
          width: 100% / 5;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    #nav2 {
      width: 100%;
      height: auto;
      padding-top: 15/12rem;
      background-color: white;
      // display: grid;
      // grid-template-columns: repeat(5, 43/12rem);
      // grid-template-rows: repeat(1, 43/12rem);
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 3rem;
      div{
        // width: 44/12rem;
        // height: 44/12rem;
        width: 13%;
        height: 0;
        padding-bottom: 13%;
        flex: 0 1 auto;
        border-radius: 16px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover cover;
        position: relative;
        span{
          width: 100%;
          display: inline-block;
          text-align: center;
          position: absolute;
          bottom: -2rem;
          font-size: 1.3rem;
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
      color: #333;
      position: relative;
      h3 {
        .sectionH3;
      }
      .boy__box--img {
        width: 100%;
        // height: 10rem;
        height: auto;
        .boy__box--img__ul {
          width: 100%;
          display: inline-block;
          // display: grid;
          // grid-template-columns: repeat(4, 17%);
          // grid-template-rows: 8rem;
          // justify-items: space-around;
          // justify-content: space-around;
          padding: .5rem 0 1rem;
          display: flex;
          justify-content: center;
          list-style: none;
          .boy__box--img__ul--li {
            flex: 0 1 auto;
            width: 25%;
            height: auto;
            text-align: center;
            img {
              display: block;
              margin: 0 auto;
              width: 70%;
              height: auto;
            }
            span {
              display: inline-block;
              font-size: 1.2rem;
              color: #333;
              padding: 0.8rem 0;
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
            // height: 6rem;
            height: auto;
            margin: 0 auto;
            border-top: 1px solid rgb(240, 236, 236);
            padding: 1rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            .boy__box--text__ul--li--h3 {
              // width: 60%;
              font-size: 1.5rem;
              font-weight: 400;
              padding-bottom: .7rem;
              font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
            }
            .boy__box--text__ul--li--tags {
              // width: 100/12rem;
              span:last-child {
                .statNameG;
                color: rgb(160, 158, 158);
                border: 1px solid rgb(209, 207, 207);
              }
            }
            .boy__box--text__ul--li--text {
              width: 100%;
              // height: 1.8rem;
              height: auto;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #a7a7a7;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    .bookBox {
      width: 100%;
      height: auto;
      background-color: white;
      position: relative;
      .book-box {
        width: 100%;
        height: auto;
        border-bottom: 0.7rem solid @bottomColor;
        h3 {
          .sectionH3;
        }
        .li__box {
          width: 100%;
          height: auto;
          border-bottom: 0.01rem solid rgb(247, 247, 247);
          .li__box--ul {
            width: 100%;
            height: auto;
            // margin-bottom: 1rem;
            ul {
              list-style: none;
              // display: grid;
              display: flex;
              // grid-template-columns: repeat(4, 16%);
              justify-content: space-around;
              flex-wrap: wrap;
              // grid-row-gap: 24/12rem;
              width: 100%;
              height: auto;
              text-align: center;
              li {
                // width: 4.5rem;
                width: 25%;
                // height: 8rem;
                height: auto;
                display: block;
                // display: flex;
                // justify-content: center;
                text-align: center;
                img {
                  display: block;
                  margin: 0 auto;
                  box-shadow: -5px 4px 2px 0px rgb(223, 220, 220);
                  transform: skewY(-4deg);
                  width: 70%;
                  height: auto;
                }
                span {
                  display: inline-block;
                  margin: 2rem 0;
                  font-size: 1.2rem;
                }
              }
            }
          }
        }
        .refresh__box {
          width: 100%;
          // height: 4rem;
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
      position: relative;
      .bestSelling--h3 {
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
          // height: 145/12rem;
          height: auto;
          padding-bottom: 1.5rem;
          border-top: none;
          .bestSelling__ul__li__block {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-between;
            .bestSelling__ul__li__block--left {
              width: 84px;
              height: 112px;
              margin-right: 16px;
              position: relative;
              .bestSelling__ul__li__block--left--img {
                width: 100%;
                height: 100%;
              }
              .bestSelling__ul__li__block--left--icon {
                background-image: url('../assets/bestSellicon.png');
                display: inline-block;
                width: 22.5/12rem;
                height: 34.5/12rem;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
            }
            .bestSelling__ul__li__block--right {
              width: calc(100% - 100px);
              // flex: 1 1 auto;
              height: 112px;
              position: relative;
              // border-left: 1.4rem solid white;
              .bestSelling__ul__li__block--right--title {
                width: 100%;
                height: auto;
                line-height: 1.8rem;
                font: 400 1.5rem/1.8rem "微软雅黑";
              }
              .bestSelling__ul__li__block--right--author {
                font-size: 1.2rem;
                padding: .5rem 0;
                color: @graycolor;
              }
              .bestSelling__ul__li__block--right--info {
                width: 100%;
                height: 3rem;
                line-height: 1.6rem;
                font-size: 1.2rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                color: @graycolor;
              }
              .bestSelling__ul__li__block--right--tag {
                position: absolute;
                bottom: 0;
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
          vertical-align: middle;
          .bestSelling__ul__li--list {
            .bestSellH3;
            font-size: 2rem;
            font-weight: 600;
            -webkit-box-flex: 1;
            color: @graycolor;
            vertical-align: middle;
          }
          .bestSelling__ul__li--title {
            font-size: 1.5rem;
            font-weight: 400;
            -webkit-box-flex: 3;
            margin-left: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
          }
          .bestSelling__ul__li--stat {
            text-align: right;
            -webkit-box-flex: 2;
            .statNameblue;
          }
          .bestSelling__ul__li--type {
            .borderColorG;
            font-size: 1.2rem;
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
      position: relative;
      h3 {
        .sectionH3;
      }
      .new--middle {
        width: 100%;
        height: auto;
        .new--middle__ul {
          width: 100%;
          height: auto;
          // display: grid;
          // grid-template-columns: repeat(4, 16%);
          // justify-content: space-around;
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          .new--middle__ul__li {
            // width: 60/12rem;
            // width: 100%;
            // height: 79.98/12rem;
            width: 25%;
            height: auto;
              text-align: center;
            .new--middle__ul__li--img {
              width: 80%;
              height: auto;
              display: block;
              margin: 0 auto;
            }
            .new--middle__ul__li--title {
              color: #333;
              font-size: 1.2rem;
              display: inline-block;
              padding: .5rem 0;
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
      position: relative;
      .recommend--h3 {
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
              width: 84px;
              height: 112px;
              margin-right: 16px;
              .recommend--body--ul--li__left--img {
                width: 100%;
                height: 100%;
              }
            }
            .recommend--body--ul--li__right {
              width: calc(100% - 100px);
              height: 112px;
              position: relative;
              .recommend--body--ul--li__right--title {
                font-size: 1.5rem;
                width: 100%;
                font-weight: 400;
                line-height: 1.6rem;
                display: block;
                list-style: none;
                overflow: hidden;
                text-overflow: ellipsis;
                // padding-bottom: .5rem;
                font-family: "Helvetica Neue",Helvetica,STHeiTi,sans-serif;
              }
              .recommend--body--ul--li__right--author {
                display: block;
                font-size: 1.2rem;
                color: rgb(170, 169, 169);
                margin-top: 10px;
              }
              .recommend--body--ul--li__right--info {
                width: 100%;
                height: 3.2rem;
                font-size: 1.2rem;
                line-height: 1.6rem;
                color: rgb(170, 169, 169);
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                margin-top: 8px;
                -webkit-box-orient: vertical;
              }
              .recommend--body--ul--li__right--tags {
                // margin-top: 0.2rem;
                position: absolute;
                bottom: 0;
                .recommend--body--ul--li__right--tags--two,
                .recommend--body--ul--li__right--tags--three {
                  height: 13/12rem;
                  font-size: 1.2rem;
                  padding: 0.3rem 0.4rem 0.1rem;
                  color: rgb(145, 141, 141);
                  border: 1px solid rgb(224, 222, 222);
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
