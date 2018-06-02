<template>
  <div class="chapterR">
    <section class="chapterR--hint" v-show="hintJudge">{{ hint }}</section>
    <header class="chapterR--header topAni">
      <nav class="chapterR--header--nav">
        <ul class="chapterR--header__ul">
          <router-link to="bookinformatecatelog" tag="li" class="chapterR--header__ul--left"><span class="chapterR--header__ul--Lspan">目录</span></router-link>
          <li class="chapterR--header__ul--middle">{{ chapterName }}</li>
          <li class="chapterR--header__ul--right"><span class="chapterR--header__ul--Rspan">书架</span></li>
        </ul>
      </nav>
    </header>
    <transition>
      <router-view ref="bookChapter" @reduction="reduction" @showWrong="showWrong" :sizeFont="fontSize" :color="color"></router-view>
    </transition>
    <section v-show="colorJudge" class="chapterR--setUp">
      <div class="chapterR--setUp__content">
        <div class="chapterR--setUp__content--font">
          <ul class="chapterR--setUp__content--font__ul">
            <li @click="subFont">Aa-</li>
            <li @click="addFont">Aa+</li>
            <li>左右翻页</li>
            <li>上下翻页</li>
          </ul>
        </div>
        <div class="chapterR--setUp__content--color">
          <ul class="chapterR--setUp__content--color__ul">
            <li class="chapterR--setUp__content--color__ul__li selectColor" @click="changeColor" data-color="D5EFD2"></li>
            <li class="chapterR--setUp__content--color__ul__li" @click="changeColor" data-color="F5E6CE"></li>
            <li class="chapterR--setUp__content--color__ul__li" @click="changeColor" data-color="F4F4F4"></li>
            <li class="chapterR--setUp__content--color__ul__li" @click="changeColor" data-color="CDE4FD"></li>
            <li class="chapterR--setUp__content--color__ul__li" @click="changeColor" data-color="0A0A0A"></li>
          </ul>
        </div>
      </div>
    </section>
    <footer class="chapterR--footer bottomAni">
      <nav>
        <ul class="chapterR--footer__ul">
          <li @click="left" class="chapterR--footer__ul--li"><span class="chapterR--footer__ul--span">上章</span></li>
          <li @click="right" class="chapterR--footer__ul--li"><span class="chapterR--footer__ul--span">下章</span></li>
          <li @click="setUp" class="chapterR--footer__ul--li"><span class="chapterR--footer__ul--span">设置</span></li>
          <router-link to="bookinformation" tag="li" class="chapterR--footer__ul--li"><span class="chapterR--footer__ul--span">封面</span></router-link>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'chapterRouter',
  data () {
    return {
      hint: '',
      hintJudge: false,
      timeId: null,
      color: 'D5EFD2',
      colorJudge: false,
      fontSize: 2,
      // 请求上一章下一章
      clickJudge: false
    }
  },
  mounted () {
    let chapter = document.getElementsByClassName('chapterR')[0];
    chapter.addEventListener('touchstart', this.handleStart, false);
    chapter.addEventListener('touchend', this.handleEnd, false);
  },
  computed: {
    chapterName () {
      let name = this.$store.state.bookInfo.bookName;
      if (!name) {
        name = localStorage['bookName'];
      }
      return name;
    }
  },
  methods: {
    subFont () {
      if (this.fontSize.toFixed(1) == 1) {
        let str = "当前已经是最小字体";
        this.showWrong(str);
      } else {
        this.fontSize -= 0.2;
      }
    },
    addFont () {
      if (this.fontSize.toFixed(1)== 2) {
        let str = "当前已经是最大字体";
        this.showWrong(str);
      } else {
        this.fontSize += 0.2;
      }
    },
    changeColor (e) {
      let li = document.getElementsByClassName('chapterR--setUp__content--color__ul__li');
      for (let i = 0, len = li.length; i < len; i++) {
        if (li[i].classList.contains('selectColor')) {
          li[i].classList.remove('selectColor');
        }
      }
      e.target.classList.add('selectColor');
      let col = e.target.getAttribute('data-color');
      this.color = col;
    },
    setUp () {
      this.colorJudge = !this.colorJudge;
    },
    // changeCatelog (str) {
    //   this.chapterName = str;
    // },
    showWrong (str) {
      this.hintJudge = true;
      this.hint = str;
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.hintJudge = false;
        this.timeId = null;
      }, 1000);
    },
    // 恢复点击上下章
    reduction () {
      this.clickJudge = false;
    },
    left () {
      if (!this.clickJudge) {
        // console.log(this.$refs.bookChapter)
        this.clickJudge = true;
        let page = this.$store.state.bookChapter.page;
        // console.log(page);
        if (page <= 0) {
          page = 0;
          this.$store.dispatch({
            type: 'triggerPage',
            page
          })
          localStorage.setItem('chapterPage', page);
          let str = '当前已经是第一章';
          this.showWrong(str);
        } else {
          page--;
          this.$store.dispatch({
            type: 'triggerPage',
            page
          })
          localStorage.setItem('chapterPage', page);
          this.$refs.bookChapter.getChapter(page);
        }
      }
    },
    right () {
      if (!this.clickJudge) {
        this.clickJudge = true;
        let page = this.$store.state.bookChapter.page;
        if (page < this.len) {
          page = this.len;
          this.$store.dispatch({
            type: 'triggerPage',
            page
          })
          localStorage.setItem('chapterPage', page);
          let str = '当前已经是最后一章';
          this.showWrong(str);
        } else {
          page++;
          this.$store.dispatch({
            type: 'triggerPage',
            page
          })
          localStorage.setItem('chapterPage', page);
          this.$refs.bookChapter.getChapter(page);
        }
      }
    },
    handleStart (e) {
      this.startX = e.changedTouches[0].pageX;
      this.startY = e.changedTouches[0].pageY;
    },
    handleEnd (e) {
      let endX = e.changedTouches[0].pageX;
      let endY = e.changedTouches[0].pageY;
      let screenH = document.documentElement.clientHeight;
      let screenW = document.documentElement.clientWidth;
      if (endY < screenH - 160) {
        this.colorJudge = false;
      }
      if (endX === this.startX && endY === this.startY && (endX >= screenW/2 - 80 && endX <= screenW/2 + 80) && (endY >= screenH/2 - 180 && endY <= screenH/2 + 180)) {
        let bottom = document.getElementsByClassName('chapterR--footer')[0];
        let top = document.getElementsByClassName('chapterR--header')[0];
        bottom.classList.toggle('bottomAni');
        top.classList.toggle('topAni');
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  @wordColor: #a7a7a7;
  @borderOne: #D5EFD2;
  @borderTwo: #F5E6CE;
  @borderThree: #F4F4F4;
  @borderFour: #CDE4FD;
  @borderFive: #0A0A0A;
  .topAni {
    transition: transform .5s ease;
    transform: translateY(-50/12rem);
  }
  .bottomAni {
    transition: transform .5s ease;
    transform: translateY(54/12rem);
  }
  .selectColor {
    border: 1/6rem solid #14be7d;
    &::before {
      content: ' ';
      width: 2rem;
      height: 2rem;
      display: block;
      background: url('../assets/chapter.png') no-repeat;
      background-size: 25/12rem 250/12rem;
      background-position: 0 -230/12rem;
      position: absolute;
      right: -10/12rem;
      bottom: -5px;
    }
  }
  .chapterR {
    width: 100vw;
    height: 100vh;
    position: relative;
    .chapterR--setUp {
      width: 100%;
      height: 95/12rem;
      position: fixed;
      bottom: 65/12rem;
      z-index: 1000;
      .chapterR--setUp__content {
        width: 95%;
        height: 100%;
        margin: 0 auto;
        background-color: rgba(0,0,0,.75);
        .chapterR--setUp__content--font {
          width: 100%;
          height: 50/12rem;
          border-bottom: 0.1rem solid rgb(0, 0, 0);
          .chapterR--setUp__content--font__ul {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            list-style: none;
            font-size: 1.3rem;
            color: white;
            text-align: center;
            li {
              &:nth-child(1) {
                flex: 1 1 auto;
                font-size: 2.2rem;
                font-weight: 600;
              }
              &:nth-child(2) {
                flex: 1 1 auto;
                font-size: 2.2rem;
                font-weight: 600;
              }
              &:nth-child(3) {
                flex: 2 1 auto;
                font-size: 1.3rem;
              }
              &:nth-child(4) {
                flex: 2 1 auto;
                font-size: 1.3rem;
              }
            }
          }
        }
        .chapterR--setUp__content--color {
          width: 100;
          height: 50/12rem;
          .chapterR--setUp__content--color__ul {
            list-style: none;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .chapterR--setUp__content--color__ul__li {
              width: 34/12rem;
              height: 34/12rem;
              border-radius: 50%;
              position: relative;
              &:nth-child(1) {
                background-color: @borderOne;
              }
              &:nth-child(2) {
                background-color: @borderTwo;
              }
              &:nth-child(3) {
                background-color: @borderThree;
              }
              &:nth-child(4) {
                background-color: @borderFour;
              }
              &:nth-child(5) {
                background-color: @borderFive;
              }
            }
          }
        }
      }
    }
    .chapterR--hint {
      width: 60%;
      line-height: 2.4rem;
      position: absolute;
      transition: all 1s ease;
      top: 50%;
      left: 50%;
      margin-top: -1rem;
      margin-left: -30%;
      background-color: rgba(0,0,0,.75);
      color: white;
      text-align: center;
      z-index: 1000;
    }
    .chapterR--header {
      width: 100%;
      line-height: 48/12rem;
      background-color: #333;
      position: fixed;
      top: 0;
      z-index: 1000;
      .chapterR--header--nav {
        width: 95%;
        margin: 0 auto;
        .chapterR--header__ul {
          display: flex;
          color: @wordColor;
          list-style: none;
          align-items: center;
          justify-content: space-between;
          font-size: 1.1rem;
          .chapterR--header__ul--right,
          .chapterR--header__ul--left {
            .chapterR--header__ul--Lspan {
              width: 60/12rem;
              line-height: 24/12rem;
              display: inline-block;
              &::before {
                content: '';
                display: inline-block;
                width: 30/12rem;
                height: 28/12rem;
                background: url(../assets/chapter.png) no-repeat 0 16/12rem;
                background-size: 25/12rem 250/12rem;
              }
            }
            .chapterR--header__ul--Rspan {
              width: 60/12rem;
              line-height: 24/12rem;
              display: inline-block;
              &::before {
                content: '';
                display: inline-block;
                width: 30/12rem;
                height: 28/12rem;
                background: url(../assets/chapter.png) no-repeat 0 -11/12rem;
                background-size: 25/12rem 250/12rem;
              }
            }
          }
          .chapterR--header__ul--middle {
            flex: 2 1 auto;
            text-align: center;
          }
        }
      }
    }
    .chapterR--footer {
      width: 100%;
      height: 54/12rem;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      background-color: #333;
      .chapterR--footer__ul {
        width: 100%;
        height: 100%;
        font-size: 1rem;
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: @wordColor;
        .chapterR--footer__ul--li {
          .chapterR--footer__ul--span {
            &::before {
              content: '';
              display: block;
              width: 30/12rem;
              height: 25/12rem;
              background: url('../assets/chapter.png') no-repeat;
              background-position: 0 -44/12rem;
              background-size: 25/12rem 250/12rem;
            }
          }
          &:nth-child(2) {
            .chapterR--footer__ul--span {
              &::before {
                background-position: 0 -74/12rem;
              }
            }
          }
          &:nth-child(3) {
            .chapterR--footer__ul--span {
              &::before {
                background-position: 0 -104/12rem;
              }
            }
          }
          &:nth-child(4) {
            .chapterR--footer__ul--span {
              &::before {
                background-position: 0 -166/12rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
