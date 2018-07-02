//  　底部导航栏 书本主路由
<template>
  <div class="main">
    <music @showMusic="showMusic" :musicSwitch="musicSwitch"></music>
    <header v-show="showHeader" class="main--header">
      <section v-show="$route.path != '/'" @click="back" class="back-icon"></section>
      <section class="main--header-l">{{listName}}</section>
      <ul class="main--header-r">
        <router-link  v-if="!showName" to="login" tag="li" class="main--header-r-l1"></router-link>
        <router-link v-else to="login" tag="li" class="main--header-r-l3">{{ showName }}</router-link>
        <li @click="showNav" class="main--header-r-l2"></li>
        <!-- <li class="home-icon"></li> -->
      </ul>
    </header>
    <div v-show="showHeader" class="header-pad"></div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <nav v-show="showMainSwitch" class="main-switch">
      <button class="main-switch-btn" @click="showMenu"></button>
      <transition name="menu-fade">
        <div class="main-menu" v-show="show">
          <router-link @click.native="hidden" to="/" tag="div" class="inner inner-1"></router-link>
          <router-link @click.native="hidden" to="musicmv" tag="div" class="inner inner-2"></router-link>
          <router-link @click.native="hidden" to="" tag="div" class="inner inner-3"></router-link>
        </div>
      </transition>
    </nav> -->
    <leftNav @showMusic="showMusic" :showJ="showN" @changeShowM="showNav"></leftNav>
  </div>
</template>

<script>
import music from './template/music/musicPlayer';
import leftNav from './template/leftNav/nav';
export default {
  components: {
    music,
    leftNav
  },
  name: 'home',
  data () {
    return {
      // show: false,
      // showMainSwitch: true,
      showN: false,
      // showHeader: true,
      musicSwitch: false
    }
  },
  created () {
    localStorage['listName'] = '精品小说';
  },
  computed: {
    showName () {
      let name = sessionStorage['userName'];
      if (name) {
        return name;
      }
      return false;
    },
    listName () {
      return this.$store.state.home.listName;
    },
    showHeader () {
      return this.$store.state.home.showHeader;
    }
  },
  methods: {
    // showMenu () {
    //   this.show = !this.show;
    // },
    // hidden () {
    //   this.show = false;
    // },
    showNav () {
      this.showN = !this.showN;
    },
    back () {
      this.$router.go(-1);
    },
    showMusic () {
      this.musicSwitch = !this.musicSwitch;
    }
  },
  watch: {
    '$route': function (to) {
      switch (to.path) {
        case '/':
          this.$store.commit('changeListName', '精品小说');
          break;
        case '/cate':
          this.$store.commit('changeListName', '分类');
          break;
        case '/seniority':
          this.$store.commit('changeListName', '排行');
          break;
        case '/booksearch':
          this.$store.commit('changeListName', '搜索');
          break;
        case '/bookinformation':
          this.$store.commit('changeListName', '书籍详情');
          break;
        case '/bookinformatecatelog':
          this.$store.commit('changeListName', '书籍目录');
          break;
          break;
        default:
          break;
      }
      // if (to.path == '/bookChapter') {
      //   this.showHeader = false;
      // } else {
      //   this.showHeader = true;
      // }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  .iconG {
    width: 2rem;
    height: 2rem;
    padding-left: 1.5rem;
    background-size: contain;
    position: relative;
    z-index: 5;
  }
  // .menu-fade-enter {
  //   .inner{
  //     transition-timing-function: ease;
  //   }
  //   .inner-1{
  //     transform: translate3d(0rem, 4rem, 0);
  //   }
  //   .inner-2{
  //     transform: translate3d(3rem, 2.4rem, 0);
  //   }
  //   .inner-3{
  //     transform: translate3d(5rem, 0, 0);
  //   }
  // }
  // .menu-fade-enter-active {
  //   .inner-1 {
  //     transform: translate3d(0rem, 5rem, 0);
  //   }
  //   .inner-2 {
  //     transition-delay: .2s;
  //   }
  //   .inner-3 {
  //     transition-delay: .3s;
  //   }
  // }
  .main {
    width: 100vw;
    height: auto;
    .main--header {
      width: 100%;
      height: 4rem;
      background-color: rgb(241, 157, 60);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .back-icon {
        .iconG;
        background: url('../assets/返回.svg') no-repeat center;
      }
      .main--header-l {
        // width: 13rem;
        line-height: 4rem;
        // background: url('../assets/logo.png') no-repeat center;
        // background-size: 13rem 4rem;
        font: 500 1.6rem "微软雅黑";
        color: white;
        padding-left: 1.5rem;

      }
      .main--header-r {
        list-style: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        .main--header-r-l1 {
          width: 4rem;
          height: 4rem;
          background: url('../assets/登录.svg') no-repeat center center;
          background-size: 2rem;
        }
        .main--header-r-l2 {
          width: 4rem;
          height: 4rem;
          background: url('../assets/menu.svg') no-repeat center;
          background-size: 2rem;
          position: relative;
          // z-index: 3004;
        }
        // .home-icon {
        //   .iconG;
        //   background: url('../assets/h.svg') no-repeat center;
        // }
        .main--header-r-l3 {
          // width: 9rem;
          line-height: 4rem;
          font: 500 2rem 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          color: white;
          letter-spacing: .1rem;
          text-align: center;
        }
      }
    }
    .header-pad {
      width: 100%;
      height: 4rem;
    }
    // .main-switch {
    //   .main-switch-btn {
    //     width: 4rem;
    //     height: 4rem;
    //     color: #333;
    //     position: fixed;
    //     // background: red;
    //     right: 1rem;
    //     bottom: 4rem;
    //     font: 600 1.3rem "微软雅黑";
    //     border: none;
    //     border-radius: 50%;
    //     outline: none;
    //     z-index: 2000;
    //     background: url('../assets/菜单.svg') no-repeat center;
    //     background-size: 3rem 3rem;
    //     background-color: rgb(199, 197, 195);
    //   }
    //   .main-menu {
    //     position: fixed;
    //     right: 1rem;
    //     bottom: 4rem;
    //     width: 4rem;
    //     height: 4rem;
    //     border-radius: 50%;
    //     .inner {
    //       display: inline-block;
    //       position: absolute;
    //       width: 2.5rem;
    //       height: 2.5rem;
    //       line-height: 2.5rem;
    //       border-radius: 50%;
    //       outline: none;
    //       background-color: rgb(131, 179, 241);
    //       text-align: center;
    //       color: #fff;
    //       z-index: 2000;
    //       transition: all .2s ease;
    //       background-size: 2.5rem 2.5rem;
    //     }
    //     .inner-1 {
    //       top: -4rem;
    //       left: 1rem;
    //       background: url('../assets/小说阅读.svg') no-repeat center;
    //       transition-delay: .1s;
    //     }
    //     .inner-2 {
    //       top: -2.4rem;
    //       left: -2.5rem;
    //       background: url('../assets/电影.svg') no-repeat center;
    //       transition-delay: .2s;
    //       background-color: rgb(181, 204, 238);
    //     }
    //     .inner-3 {
    //       top: 1rem;
    //       left: -4rem;
    //       background: url('../assets/动态.svg') no-repeat center;
    //       transition-delay: .3s;
    //     }
    //   }
    // }
  }
}
</style>
