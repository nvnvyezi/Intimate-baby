<template>
  <div class="box">
    <section class="cover--header">
      <div class="cover--header--img">
        <img class="cover--header--img--photo" src="" v-lazyLoad="bookData.imgUrl" alt="">
      </div>
      <div class="cover--header--info">
        <h1 class="cover--header--info--title">{{ bookData.title }}</h1>
        <router-link class="cover--header--info--author" to="" >{{ bookData.author }}</router-link>
        <p class="cover--header--info--tags"><span>{{ bookData.category }}</span><span>{{ bookData.words }}</span></p>
        <p class="cover--header--info--stat" v-if="bookData.status == 1">已完结</p>
        <p class="cover--header--info--stat" v-else>连载中</p>
      </div>
    </section>
    <section class="cover--buttons">
      <router-link class="cover--buttons--button" to="bookChapter" tag="button">开始阅读</router-link>
      <button class="cover--buttons--button">加书架</button>
      <button class="cover--buttons--button">离线下载</button>
    </section>
    <section class="cover--info">
      <div class="cover--info--text">
        <p class="cover--info--text--p poff">{{ bookData.info }}</p>
        <span class="cover--info--text--icon"><i class="ir" @click="showP"></i></span>
      </div>
      <router-link class="cover--info--text--new" to="" tag="div"><i class="li"></i><span class="ltext">最新</span><span class="ctext">{{ bookData.lastet_chapter }}</span><i class="ri"></i></router-link>
      <router-link class="cover--info--text--new" @click.native="propCatelog" to="bookinformatecatelog" tag="div"><i class="li2"></i><span class="ltext">目录</span><span class="ctext">点一下</span><i class="ri"></i></router-link>
    </section>
    <section class="comments">
      <h3 class="comments--header">精华评论</h3>
      <ul class="comments--ul">
        <li class="comments--ul__li" v-for="(item, index) in commentData" :key="index">
          <div>
            <div class="comments--ul__li--header">
              <img class="comments--ul__li--header--photo" src="" v-lazyLoad="item.userPhoto" alt="">
              <span class="comments--ul__li--header--name">{{ item.nickName }}</span>
            </div>
            <div class="comments--ul__li--text">
              {{ item.text }}
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="bookBox">
      <div class="book-box">
        <h3>看过这本书的人还在看</h3>
        <div class="li__box">
          <div class="li__box--ul">
            <ul>
              <li @click="changeInfoBook" v-for="(item, index) in result1" :key="index" :bid="item.bid">
                  <img src="" v-lazyLoad="item.imgUrl" :alt="item.linkText">
                  <span>{{ item.linkText }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="refresh__box" @click="addrefresh">
          <span class="refresh__box--text">换一换</span>
          <span class="refresh__box--icon"></span>
        </div>
      </div>
    </section>
    <section class="otherBooks">
      <h3>作者的所有作品</h3>
      <ul class="box__ul">
        <router-link class="box__ul__li" to="bookinformation" tag="li" v-for="(item, index) in arrResult" :key="index">
          <div class="box__ul__li--imgBox">
            <img class="box__ul__li--imgBox--img" src="" v-lazyLoad="item.imgUrl" :alt="item.author">
          </div>
          <div class="box__ul__li--right">
            <div class="box__ul__li--right--title">
              <h3 class="box__ul__li--right--title--h3">{{ item.title}}</h3>
            </div>
            <div class="box__ul__li--right--author">
              <p class="box__ul__li--right--author--author">{{ item.author}}</p>
            </div>
            <div class="box__ul__li--right--tags">
              <span v-if="item.status == 1" class="statNameblue">连载</span>
              <span v-else class="statNamered">完结</span>
              <span class="box__ul__li--right--tags--words">{{ item.words }}</span>
              <span class="box__ul__li--right--tags--one">{{ item.tags }}</span>
            </div>
          </div>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import { bookInfo, bookComments, bookRecom, otherBooks } from "../api/api";
import md5 from '../encryption/md5'
export default {
  name: 'bookInformation',
  data () {
    return {
      bookData: {},
      commentData: [],
      result1: [],
      arrResult: [],
      refreshJudge: true,
      user_id: 8000000,
      encryptKey: '37e81a9d8f02596e1b895d07c171d5c9'
    }
  },
  computed: {
    bookId: {
      get: function () {        
        let id = this.$store.state.bookInfo.bookId;
        if (!id) {
          id = localStorage.getItem('bookId');
        }
        return id;
      },
      set: function (newVal) {
        this.$store.dispatch({
          type: 'triggerBookId',
          id: newVal
        })
        localStorage.setItem('bookId', newVal);
        document.documentElement.scrollTop = 0;
        this.getBookInfo();
      }
    },
    bookName () {
      let name = this.$store.state.bookInfo.bookName;
      if (!name) {
        name = localStorage.getItem('bookName');
      }
      return name;
    },
    authorId: {
      get () {
        let id = this.$store.state.bookInfo.authorId;
        if (!id) {
          id = localStorage.getItem('authorId');
        }
        return id;
      }
    },
    authorName: {
      get () {
        let name = this.$store.state.bookInfo.authorName;
        if (!name) {
          name = localStorage.getItem('authorName');
        }
        return name;
      }
    },
    timestamp () {
      return Date.now();
    }
  },
  methods: {
    propCatelog () {
      this.$store.dispatch({
        type: 'triggerBookId',
        id: this.bookId
      })
    },
    changeInfoBook (e) {
      let bookId = e.currentTarget.getAttribute('bid');
      this.bookId = bookId;
      localStorage.setItem('bookId', bookId);
    },
    showP (e) {
      e.currentTarget.parentNode.parentNode.firstChild.classList.toggle('poff');
      e.currentTarget.parentNode.parentNode.firstChild.classList.toggle('pshow');
      e.target.classList.toggle('ir');
      e.target.classList.toggle('il');
    },
    getBookInfo () {
      if (window.fetch) {
        let sign = md5(this.bookId + "" + this.timestamp + this.user_id + this.encryptKey);
        bookInfo (this.bookId, this.user_id, sign, this.timestamp, item => {
          let obj = {};
          obj.imgUrl = item.imgUrl;
          obj.title = item.bookName;
          obj.author = item.authorName;
          obj.authorId = item.authorId;
          obj.category = item.className;
          obj.words = item.wordCount+ '万字';
          obj.chapterId = item.firstChapter.chapterId;
          obj.status = item.state;
          obj.info = item.desc;
          obj.lastet_chapter = item.lastChapter.chapterName;

          localStorage.setItem('authorId', item.authorId);
          localStorage.setItem('authorName', item.authorName);
          localStorage.setItem('bookName', item.bookName);
          this.$store.dispatch({
            type: 'triggerAuthor',
            id: item.authorId,
            name: item.authorName
          })
          this.$store.dispatch({
            type: 'triggerBookName',
            name: item.bookName
          })
          this.bookData = obj;
          this.getComments();
          this.getRecom();
          this.getData();
        })
      }
    },
    getComments () {
      this.commentData = [];
      bookComments (this.authorId, this.bookId, data =>  {
        data.forEach(item => {
          let obj = {};
          obj.userPhoto = item.userPhoto;
          obj.nickName = item.nickName;
          obj.text = item.text;
          this.commentData.push(obj);
        })
      })
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
    getRecom () {
      this.result1 = [];
      if (window.fetch) {
        bookRecom(this.bookName, this.authorName, data => {
          data.forEach((item) => {  
            let obj = {};
            obj.bid = item.id;
            obj.imgUrl = item.cover;
            obj.linkText = item.bookname.slice(0, 3) + '...';
            this.result1.push(obj);
          })
        })
      }
    },
    getData () {
      this.arrResult = [];
      otherBooks(this.authorId, data => {
        data.forEach(item => {
            let obj = {};
            obj.imgUrl = item.cover;
            obj.title = item.title;
            obj.author = item.author;
            obj.bid = item.bid;
            obj.status = item.status;
            obj.words = (item.words/10000).toFixed(1) + '万字';
            obj.tags = item.category;
            this.arrResult.push(obj);
        })
      })
    }
  },
  mounted () {
    this.getBookInfo();
  },
}
</script>

<style lang="less" scoped>
 @media screen and(max-width: 720px) {
   @wordColor: #999;
   @borderColor: #f08300;
   @bottomColor: #f2f2f2;
   .infoG {
      display: inline-block;
      font-size: 1.4rem;
      color: @wordColor;
      width: 100%;
      display: inline-block;
      text-decoration: none;
   }
   .afterG {
    content: '';
    width: 18/12rem;
    height: 28/12rem;
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
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
    .titleH3 {
      font-size: 1.7rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
   .sectionH3 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 0.5rem;
      font-weight: 400;
      padding: 20px 5px;
    }
   .box {
     width: 100vw;
     height: auto;
     background-color: white;
    .cover--header {
      width: 100%;
      height: auto;
      display: flex;
      padding: 2rem 0.6rem;
      justify-content: space-around;
      align-items: center;
      .cover--header--img {
        width: 98/12rem;
        height: 130/12rem;
        .cover--header--img--photo {
          width: 100%;
          height: 100%;
        }
      }
      .cover--header--info {
        width: 174/12rem;
        height: 130/12rem;
        .cover--header--info--title {
          line-height: 23/12rem;
          font-size: 1.8rem;
          font-weight: 400;
        }
        .cover--header--info--author {
          .infoG;
          padding: 1.3rem 0 0.4rem;
        }
        .cover--header--info--tags {
          .infoG;
          padding: 0.7rem 0 1rem;
        }
        .cover--header--info--stat {
          .infoG;
          padding: 0 0 0.7rem;
        }
      }
    }
    .cover--buttons {
      width: 95%;
      margin: 0 auto;
      height: auto;
      display: flex;
      justify-content: space-around;
      padding: 0 0 1.2rem;
      .cover--buttons--button {
        width: 27%;
        height: 41/12rem;
        border: 0.1rem solid @borderColor;
        background-color: @borderColor;
        color: white;
        border-radius: 5px;
        &:first-child {
          background-color: white;
          color: @borderColor;
        }
        &:hover {
          outline: none;
        }
      }
    }
    .cover--info {
      width: 100%;
      height: auto;
      position: relative;
      border-bottom: 0.7rem solid @bottomColor;
      .cover--info--text {
        width: 90%;
        margin: 0 auto;
        .cover--info--text--p {
          width: 100%;
          font-size: 1.4rem;
          color: @wordColor;
          white-space: pre-line;
        }
        .pshow {
          height: auto;
        }
        .poff {
          height: 84/12rem;
          overflow: hidden;
        }
        .cover--info--text--icon {
          display: inline-block;
          width: 73/12rem;
          height: 22/12rem;
          position: absolute;
          right: 6%;
          margin-top: -1.7rem;
          // background-color: red;
          background: linear-gradient(to right, transparent 0%, white 80%);
          .iG {
            width: 2rem;
            height: 1.8rem;
            display: inline-block;
            float: right;
            background-image: url('../assets/dayu.png');
            background-size: .5rem .8rem;
            background-repeat: no-repeat;
            background-position: center center;
            transition-duration: .5s;
          }
          .ir {
            .iG;
            transform: rotateZ(90deg);
          }
          .il {
            .iG;
            transform: rotateZ(-90deg);
          }
        }
      }
      .cover--info--text--new {
        width: 90%;
        height: 54/12rem;
        line-height: 54/12rem;
        margin: 0 auto;
        border-bottom: 0.1rem solid @bottomColor;
        display: flex;
        align-items: center;
        &:last-child {
          border-bottom: none;
        }
        .liG {
          width: 25/12rem;
          height: 18/12rem;
          display: inline-block;
          background-size: 18/12rem;
          background-position: 0 0.1rem;
          background-repeat: no-repeat;
        }
        .li {
          .liG;
          background-image: url('../assets/new.png');
        }
        .li2 {
          .liG;
          background-image: url('../assets/catalog.png');
        }
        .ltext {
          font-size: 1.4rem;
        }
        .ctext {
          font-size: 1.2rem;
          width: 60%;
          // height: 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0.2rem 0 0 2rem;
          color: @wordColor;
        }
        .ri {
          width: 2rem;
          height: 1.8rem;
          display: inline-block;
          position: absolute;
          right: 6%;
          vertical-align: middle;
          background-image: url('../assets/dayu.png');
          background-size: .5rem .8rem;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }
    .comments {
      width: 100vw;
      height: auto;
      border-bottom: 0.7rem solid @bottomColor;
      .comments--header {
        font-size: 1.5rem;
        font-weight: 400;
        padding: 1rem 0;
        border-bottom: 0.1rem solid @bottomColor;
      }
      .comments--ul {
        width: 90%;
        margin: 0 auto;
        list-style: none;
        .comments--ul__li {
          width: 100%;
          height: auto;
          padding: 2rem 0 0.5rem;
          border-bottom: 0.1rem solid @bottomColor;
          &:last-child {
            border-bottom: none;
          }
          .comments--ul__li--header {
            width: 100%;
            line-height: 1rem;
            .comments--ul__li--header--photo {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
            }
            .comments--ul__li--header--name {
              display: inline-block;
              height: 2rem;;
              color: @wordColor;
              padding-left: 1rem;
              vertical-align: middle;
            }
          }
          .comments--ul__li--text {
            width: 80%;
            height: 44/12rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.4rem;
            padding: 0 0 0 3rem;
          }
        }
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
    }
    .otherBooks{
      width: 100vw;
      height: auto;
      background-color: white;
      .box__ul {
        list-style: none;
        width: 85%;
        margin: 0 auto;
        .box__ul__li {
          width: 100%rem;
          height: auto;
          padding: 1.8rem 0;
          display: -webkit-box;
          -webkit-box-orient: horizontal;
          // border-bottom: 0.08rem solid @borderColor;
          .box__ul__li--imgBox {
            width: 56/12rem;
            height: 74/12rem;
            position: relative;
            .box__ul__li--imgBox--img {
              width: 100%;
              height: 100%;
            }
          }
          .box__ul__li--right {
            width: 200/12rem;
            height: 76/12rem;
            margin: 0 0 0 1.3rem;
            .box__ul__li--right--title {
              width: 100%;
              line-height: 18/12rem;
              .box__ul__li--right--title--h3 {
                .titleH3;
              }
            }
            .box__ul__li--right--author {
              width: 100%;
              height: 16/12rem;
              display: -webkit-box;
              -webkit-box-orient: horizontal;
              -webkit-box-align: center;
              -webkit-box-pack: end;
              margin: 0.9rem 0;
              color: @wordColor;
              .box__ul__li--right--author--author {
                display: block;
                -webkit-box-flex: 1;
              }
            }
            .box__ul__li--right--tags {
              width: 100%;
              height: 20/12rem;
              color: @wordColor;
              text-align: left;
              .box__ul__li--right--tags--words,
              .box__ul__li--right--tags--one {
                border: 1px solid @bottomColor;
                padding: 0.3rem 0.3rem 0.1rem 0.3rem;
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
   }
 }
</style>
