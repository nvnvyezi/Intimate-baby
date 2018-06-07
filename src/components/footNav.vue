//  　底部导航栏 书本主路由
<template>
  <div class="main">
    <music></music>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <nav v-show="showMainSwitch" class="main-switch">
      <button class="main-switch-btn" @click="showMenu"></button>
      <transition name="menu-fade">
        <div class="main-menu" v-show="show">
          <router-link @click.native="hidden" to="/" tag="div" class="inner inner-1"></router-link>
          <router-link @click.native="hidden" to="movie" tag="div" class="inner inner-2"></router-link>
          <router-link @click.native="hidden" to="" tag="div" class="inner inner-3"></router-link>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
import music from './template/musicPlayer'
export default {
  components: {
    music
  },
  name: 'home',
  data () {
    return {
      show: false,
      showMainSwitch: true
    }
  },
  computed: {
  },
  methods: {
    showMenu () {
      this.show = !this.show;
    },
    hidden () {
      this.show = false;
    }
  },
  watch: {
    '$route': function (to) {
      if (to.path == '/bookChapter') {
        this.showMainSwitch = false;
      } else {
        this.showMainSwitch = true;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  .menu-fade-enter {
    .inner{
      transition-timing-function: ease;
    }
    .inner-1{
      transform: translate3d(0rem, 4rem, 0);
    }
    .inner-2{
      transform: translate3d(3rem, 2.4rem, 0);
    }
    .inner-3{
      transform: translate3d(5rem, 0, 0);
    }
  }
  .menu-fade-enter-active {
    // .inner-1 {
    //   transform: translate3d(0rem, 5rem, 0);
    // }
    // .inner-2 {
    //   transition-delay: .2s;
    // }
    // .inner-3 {
    //   transition-delay: .3s;
    // }
  }
  .main {
    width: 100vw;
    height: auto;
    .main-switch {
      .main-switch-btn {
        width: 4rem;
        height: 4rem;
        color: #333;
        position: fixed;
        // background: red;
        right: 1rem;
        bottom: 4rem;
        font: 600 1.3rem "微软雅黑";
        border: none;
        border-radius: 50%;
        outline: none;
        z-index: 2000;
        background: url('../assets/菜单.svg') no-repeat center;
        background-size: 3rem 3rem;
        background-color: rgb(199, 197, 195);
      }
      .main-menu {
        position: fixed;
        right: 1rem;
        bottom: 4rem;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        .inner {
          display: inline-block;
          position: absolute;
          width: 2.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          border-radius: 50%;
          outline: none;
          background-color: rgb(131, 179, 241);
          text-align: center;
          color: #fff;
          z-index: 2000;
          transition: all .2s ease;
          background-size: 2.5rem 2.5rem;
        }
        .inner-1 {
          top: -4rem;
          left: 1rem;
          background: url('../assets/小说阅读.svg') no-repeat center;
          transition-delay: .1s;
        }
        .inner-2 {
          top: -2.4rem;
          left: -2.5rem;
          background: url('../assets/电影.svg') no-repeat center;
          transition-delay: .2s;
          background-color: rgb(181, 204, 238);
        }
        .inner-3 {
          top: 1rem;
          left: -4rem;
          background: url('../assets/动态.svg') no-repeat center;
          transition-delay: .3s;
        }
      }
    }
  }
}
</style>
