<template>
  <div class="box">
    <header class="catelog--header">
      <div class="catelog--header--list" @click="show">{{ cateList}}</div>
      <i class="catelog--header--icon" @click="reversal"></i>
    </header>
    <div class="catelog--list">
      <ul class="catelog--list__ul">
        <router-link class="catelog--list__ul__li" to="bookchapter" tag="li" v-for="(item, index) in catelogResult1" @click.native="showChapter" :index="item.i" :key="index">{{ item.chapterName }}</router-link>
      </ul>
    </div>
    <section class="catelogBox"  @click="triggerMaskG" id="maskList" v-show="maskJudge">
      <div class="catelogBox--mask"></div>
      <div class="catelogBox--content">
        <div class="catelogBox--content__list" v-for="(item, index) in catelogBox" :key="index" :index="index">{{ item }}<i></i></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'bookInformationCatelog',
  data () {
    return {
      cateList: '' || "1~100章",
      maskJudge: false,
      range: 0,
      catelogResult: [],
      catelogResult1: [],
      len: 0                  //多少张
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
      for (let i = 0, len = this.catelogResult.length; i < len; i++) {
        if (i === len - 1) {
          arr.push(`${i * 100 + 1}~${this.len - 1}章`);
        } else {
          arr.push(`${i * 100 + 1}~${(i + 1) * 100}章`);
        }
      }
      return arr;
    }
  },
  mounted () {
    let arr = JSON.parse(localStorage['bookCatelog']);
    this.len = arr.length;
    let obj = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i != 0 && (i % 100 == 0 || i == len - 1)) {
        this.catelogResult.push(obj);
        obj = [];
      }
      arr[i].i = i;
      obj.push(arr[i]);
    }
    // console.log(arr, this.catelogResult);
    this.catelogResult1 = this.catelogResult[0];
    // console.log(this.catelogResult);
  },
  methods: {
    reversal () {
      this.catelogResult1.reverse();
    },
    // 进入相应章节
    showChapter (e) {
      let index = parseInt(e.currentTarget.getAttribute('index'));
      console.log(index)
      this.$store.dispatch({
        type: 'triggerPage',
        page: index
      })
      localStorage.setItem('chapterPage', index);
    },
    show () {
      this.maskJudge = true;
    },
    triggerMaskG (e) {
      if (e.target.className == "catelogBox--content__list") {
        e.target.classList.add('maskG');
        let node = e.target.parentNode.children;
        this.cateList = e.target.innerText;
        let num = e.target.getAttribute('index');
        num = Number(num);
        this.catelogResult1 = this.catelogResult[num];
        let mask = document.getElementsByClassName('catelogBox--content__list');
        for (let i = 0, len = node.length; i < len; i++) {
          if (i != num) {
            if (node[i].classList.contains('maskG')) {
              node[i].classList.remove('maskG');
            }
          }
        }
      }
      this.maskJudge = false;
    },
  },
  watch: {
    maskJudge (str) {
      let body = document.getElementsByTagName('body')[0];
      if (str) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'visible';
      }
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
      background-image: url('../../../assets/mask.png');
      background-size: 1rem 1rem;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: white;
    overflow-x: hidden;
    .catelog--header {
      width: 100%;
      height: 48.5/12rem;
      border-bottom: 0.1rem solid @bottomColor;
      .catelog--header--list {
        width: 150/12rem;
        line-height: 48.5/12rem;
        font-size: 1.4rem;
        margin-left: 1.3rem;
        color: @wordColor;
        position: relative;
        &::after {
          content: '';
          width: 2rem;
          height: 0.8rem;
          display: inline-block;
          background: url('../../../assets/dayu.png') no-repeat center center;
          background-size: .65rem 1rem;
          transform: rotateZ(90deg);
          // position: absolute;
          // margin-top: 1.5rem;
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
        background: url('../../../assets/reverse.png') no-repeat center;
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
        list-style: none;
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
        // margin-top: -30vh;
        margin-left: -40%;
        width: 80%;
        transform: translateY(-50%);
        // height: 60vh;
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
