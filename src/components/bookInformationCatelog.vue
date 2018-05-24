<template>
  <div class="box">
    <header class="catelog--header">
      <div class="catelog--header--list" @click="show">{{ cateList}}</div>
      <i class="catelog--header--icon" @click="reversal"></i>
    </header>
    <div class="catelog--list">
      <ul class="catelog--list__ul">
        <router-link class="catelog--list__ul__li" to="bookchapter" tag="li" v-for="(item, index) in catelogResult" @click.native="showChapter" :index="index" :key="index" v-if="rangeJudge(index)">{{ item.chapterName }}</router-link>
      </ul>
    </div>
    <section class="catelogBox" id="maskList" v-show="maskJudge">
      <div class="catelogBox--mask"></div>
      <div class="catelogBox--content">
        <div class="catelogBox--content__list" @click="triggerMaskG" v-for="(item, index) in catelogBox" :key="index" :index="index">{{ item }}<i></i></div>
      </div>
    </section>
  </div>
</template>

<script>
import md5 from '../encryption/md5'
import { bookCatelog } from "../api/api";
export default {
  name: 'bookInformationCatelog',
  data () {
    return {
      catelogResult: [],
      user_id: 8000000,
      encryptKey: '37e81a9d8f02596e1b895d07c171d5c9',
      catelogList: '',
      cateList: '' || "1~100章",
      maskJudge: false,
      range: 0
    }
  },
  computed: {
    bookId () {
      let id = this.$store.state.bookInfo.bookId
      if (!id) {
        id = localStorage.getItem('bookId');
      }
      return id;
    },
    timestamp () {
      return Date.now();
    },
    catelogBox () {
      let arr = [];
      for (let i = 0, len = this.catelogResult.length/100; i < len; i++) {
        if (i === len - 1) {
          arr.push(`${i * 100 + 1}~${this.catelogResult.length}章`);
        } else {
          arr.push(`${i * 100 + 1}~${(i + 1) * 100}章`);
        }
      }
      return arr;
    }
  },
  mounted () {
    this.$store.dispatch({
      type: 'hideFalse',
      bool: false
    })
    this.getCatelog();
  },
  methods: {
    reversal () {
      // this.catelogResult.reverse();
    },
    showChapter (e) {
      let index = parseInt(e.currentTarget.getAttribute('index'));
      this.$store.dispatch({
        type: 'triggerPage',
        page: index + 9
      })
      localStorage.setItem('chapterPage', index + 9);
    },
    rangeJudge (index) {
      if (index >= this.range * 100 && index < (this.range + 1) * 100) {
        return true;
      }
      return false;
    },
    show () {
      this.maskJudge = true;
    },
    triggerMaskG (e) {
      e.target.classList.add('maskG');
      let node = e.target.parentNode.children;
      this.cateList = e.currentTarget.innerText;
      let num = e.currentTarget.getAttribute('index');
      this.range = Number(num);
      let mask = document.getElementsByClassName('catelogBox--content__list');
      for (let i = 0, len = node.length; i < len; i++) {
        if (i != num) {
          if (node[i].classList.contains('maskG')) {
            node[i].classList.remove('maskG');
          }
        }
      }
      this.maskJudge = false;
    },
    getCatelog () {
      let sign = md5(this.bookId + "" + this.timestamp + this.user_id + this.encryptKey);
      bookCatelog (this.bookId, this.user_id, sign, this.timestamp, data => {
        data.forEach(item => {
          item.volumeList.forEach(item => {
            let obj = {};
            obj.chapterName = item.chapterName;
            obj.contUrlSuffix = item.contUrlSuffix;
            this.catelogResult.push(obj);
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  @hoverColor: #f08300;
  @bottomColor: #f3f3f3;
  @wordColor: #585757;
  .maskG {
    color: @hoverColor;
    i {
      width: 1rem;
      height: 1rem;
      display: inline-block;
      position: relative;
      left: 60%;
      background-image: url('../assets/mask.png');
      background-size: 1rem 1rem;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: white;
    .catelog--header {
      width: 100%;
      height: 48.5/12rem;
      border-bottom: 0.1rem solid @bottomColor;
      .catelog--header--list {
        width: 80/12rem;
        line-height: 48.5/12rem;
        font-size: 1.4rem;
        margin-left: 1rem;
        color: @wordColor;
        &::after {
          content: '';
          width: 2rem;
          height: 0.8rem;
          display: inline-block;
          background: url('../assets/dayu.png') no-repeat center center;
          background-size: .65rem 1rem;
          transform: rotateZ(90deg);
          // background-repeat: no-repeat;

        }
      }
      .catelog--header--icon {
        width: 3rem;
        height: 3rem;
        display: block;
        float: right;
        position: relative;
        margin-right: .7rem;
        margin-top: -3.4rem;
        background: url('../assets/reverse.png') no-repeat center;
        background-size: 1.8rem 1.4rem;
        &::after {
          content: '';
          clear: both;
        }
      }
    }
    .catelog--list {
      width: 100%;
      height: auto;
      .catelog--list__ul {
        width: 100%;
        height: auto;
        .catelog--list__ul__li {
          width: 100%;
          line-height: 48.5/12rem;
          border-bottom: 0.1rem solid @bottomColor;
          border-left: 3rem solid transparent;
          font-size: 1.35rem;
          color: @wordColor;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    .catelogBox {
      width: 100%;
      height: auto;
      position: fixed;
      top: 0;
      left: 0;
      .catelogBox--mask {
        width: 100%;
        height: 100vh;
        opacity: 0.9;
        background-color: rgba(0,0,0,.5);
      }
      .catelogBox--content {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -30vh;
        margin-left: -40%;
        width: 80%;
        height: 60vh;
        background-color: white;
        overflow-y: auto;
        overflow-x: hidden;
        .catelogBox--content__list {
          width: 90%;
          line-height: 49/12rem;
          margin: 0 auto;
          font-size: 1.35rem;
          // color: @wordColor;
          border-left: 2rem solid transparent;
          border-bottom: 0.1rem solid @bottomColor;
        }
      }
    }
  }
}
</style>
