<template>
  <div class="box">
    <header>
      <img src="../assets/logo1.png" alt="">
    </header>
    <transition name="" mode="">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
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
