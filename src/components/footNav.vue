//  　底部导航栏
<template>
  <div class="box">
    <header>
      <img src="../assets/logo1.png" alt="">
    </header>
    <!-- <transition name="" mode=""> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->

    <nav id="nav1">
      <!-- <router-link to="book"><div class="footer__box"></div></router-link>
      <router-link to="book"><div class="footer__box"></div></router-link>
      <router-link to="book"><div class="footer__box"></div></router-link>
      <router-link to="book"><div class="footer__box"></div></router-link>
      <router-link to="book"><div class="footer__box"></div></router-link> -->
      <!-- <router-link to="/" tag="div"></router-link> -->
      <router-link to="/" tag="div"></router-link>
      <router-link to="" tag="div"></router-link>
      <router-link to="" tag="div"></router-link>
      <router-link to="" tag="div"></router-link>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { init } from "../wheel/lazyLoad";
export default {
  name: 'home',
  data () {
    return {
      // hide: ''
    }
  },
  computed: {
    hide () {
      return this.$store.state.a.hide;
    }
    // ...mapState([
    //   'hide'
    // ])
  },
  // methods: {
  //   ...mapState({
  //     hide: 'hide'
  //   })
  // },
  watch: {
    hide (params) {
      // console.log(params)
      if (!params) {
        let nav1 = document.getElementById('nav1');
        nav1.classList.remove('aniContrary');
        nav1.classList.add('ani');
      } else {
        let nav1 = document.getElementById('nav1');
        nav1.classList.add('aniContrary');
        nav1.classList.remove('ani');
      }
    }
  },
  destroyed () {
    document.removeEventListener('touchstart');
    document.removeEventListener('touchmove');
    document.removeEventListener('touchend');
  },
  mounted () {
    document.addEventListener('touchstart', this.start, false);
    document.addEventListener('touchmove', init, false);
    document.addEventListener('touchend', this.end, false);
  },
  methods: {
    start (e) {
      this.startx = e.touches[0].pageX;
      this.starty = e.touches[0].pageY;
      init();
    },
    end (e) {
      init();
      let endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      let direction = this.getDirection(this.startx, this.starty, endx, endy);
      switch (direction) {
        case 0:
          // console.log('为华东');
          break;
        case 1:
          // console.log('向上');
          this.hideChange(1);
          break;
        case 2:
          // console.log('下');
          this.hideChange(2);
          break;
        case 3:
          // console.log('坐');
          break;
        case 4:
          // console.log('有');
          break;
        default:
          break;
      }
    },
    hideChange (num) {
      // console.log(1);
      let bool;
      if (num === 2) {
        bool = true;
      }
      if (num === 1) {
        bool = false;
      }
      this.$store.dispatch({
        type: 'hideFalse',
        bool: bool
      })
    },
    getAngle (angx, angy) {                               //获得角度
      return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    getDirection (startx, starty, endx, endy) {                                       //返回方向
      let angx = endx - startx;
      let angy = endy - starty;
      let res = 0;
      let angle = this.getAngle(angx, angy);
      if (angle >= -170 && angle <= -10) {
        res = 1;
      } else if (angle > 10 && angle < 170) {
        res = 2;
      } else if ((angle >= 170 && angle <= 180) || (angle >= -180 && angle < -170)) {
        res = 3;
      } else if (angle >= -10 && angle <= 10) {
        res = 4;
      }
      return res;
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  .ani {
    transition: all 1s ease 0s;
    transform: translateY(9vh);
  }
  .aniContrary {
    transition: all 1s ease 0s;
    transform: translateY(0vh);
  }
  .box {
    width: 100vw;
    height: 100vh;
    // background-image: url('../assets/home.jpg');
    // background-size: 100% 100%;
    header {
      width: 100vw;
      height: 10vh;
      background-color: rgb(219, 224, 221);
      img {
        padding-top: 20px;
        width: 100vw;
        height: auto;
      }
    }
    nav {
      width: 100vw;
      height: 9vh;
      background-color: rgb(153, 161, 158);
      // background-color: paleturquoise;
      position: fixed;
      bottom: 0;
      left: 0;
      div{
        width: 23.8%;
        height: 100%;
        // background-color: red;
        display: inline-block;
        span{
          position: absolute;
          bottom: 10px;
          font-size: 0.4rem;
        }
      }
      // div:nth-child(1) {
      //   // background-color: palegreen;
      //   background-image: url('../assets/推荐.png');
      //   // background-size: 35px 35px;
      //   background-repeat: no-repeat;
      //   background-position: center center;
      // }
      div:nth-child(1) {
        // background-color: palegreen;
        background-image: url('../assets/小说.png');
        // background-size: 35px 35px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      div:nth-child(2) {
        // background-color: palegreen;
        background-image: url('../assets/电影.png');
        // background-size: 35px 35px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      div:nth-child(3) {
        // background-color: palegreen;
        background-image: url('../assets/社区.png');
        // background-size: 35px 35px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      div:nth-child(4) {
        // background-color: palegreen;
        background-image: url('../assets/我的.png');
        // background-size: 35px 35px;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
}
</style>
