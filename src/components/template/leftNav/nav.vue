<template>
  <!-- <div class="left-nav"> -->
    <transition name="nav-fade" mode="out-in">
      <div v-show="showJ" class="left-nav">
        <section class="ln-head">
          <div class="ln-img">
            <img class="img" :src="imgUrl" alt="">
          </div>
        </section>
        <section class="ln-menu">
          <div class="lm-con">
            <ul class="c-ul">
              <li @click="showMusic" class="c-li">音乐播放器</li>
              <router-link @click.native="changeFocus" :to="item" tag="li" class="c-li" v-for="(item, index) in menu" :key="index" :data-val="index"><i></i>{{index}}</router-link>
              <li @click="logOut" class="c-li">退出登录</li>
            </ul>
          </div>
        </section>
      </div>
    </transition>
  <!-- </div> -->
</template>

<script>
import { userLogout } from "../../../api/api";
export default {
  name: 'leftNav',
  data () {
    return {
      imgUrl: require('../../../assets/swipe.jpg'),
      menu: {
        '个人主页': '/user',
        '精品小说': '/', 
        '音乐MV': '/musicmv', 
        '后花园': '/', 
        }
    }
  },
  props: {
    showJ: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (!localStorage['currentPage']) {
      let id = this.$store.state.home.currentPage;
      let li = document.getElementsByClassName('c-li')[id + 1];
      li.classList.add('focu-li');
    } else {
      let id = localStorage['currentPage'];
      this.$store.commit('changeCurrentPage', id);
      let li = document.getElementsByClassName('c-li');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('focu-li');
      }
      id++;
      li[id].classList.add('focu-li');
    }
  },
  methods: {
    showMusic () {
      this.$emit('showMusic');
      this.$emit('changeShowM');
    },
    changeFocus (e) {
      let val = e.currentTarget.getAttribute('data-val');
      switch (val) {
        case '个人主页':
          localStorage['currentPage'] = 0;
          this.$store.commit('changeCurrentPage', 0);
          break;
        case '精品小说':
          localStorage['currentPage'] = 1;
          this.$store.commit('changeCurrentPage', 1);
          break;
        case '音乐MV':
          localStorage['currentPage'] = 2;
          this.$store.commit('changeCurrentPage', 2);
          break;
        case '后花园':
          localStorage['currentPage'] = 3;
          this.$store.commit('changeCurrentPage', 3);
          break;
        default:
          break;
      }
      this.$emit('changeShowM');
    },
    logOut () {
      this.$emit('changeShowM');
      userLogout(data => {
        if (data.err) {
          this.$toast(data.data);
        } else {
          this.$toast(data.data);
          setTimeout(() => {
            sessionStorage.removeItem('userName');
            location.reload();
          }, 500);
        }
      });
    }
  },
  updated () {
    if (this.showJ) {
      let id = this.$store.state.home.currentPage;
      let li = document.getElementsByClassName('c-li');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('focu-li');
      }
      id++;
      li[id].classList.add('focu-li');
    }
  }
}
</script>

<style lang="less" scoped>
.focu-li {
  font-style: oblique;
  color: rgb(131, 73, 240) !important;
  font-weight: 600;
  &::before {
    content: ' ';
    width: .6rem;
    height: 1.6rem;
    display: inline-block;
    background-color: rgb(131, 73, 240);
    vertical-align: middle;
    margin-right: 1.5rem;
    transform: skewY(115deg);
  }
  &::after {
    content: ' ';
    width: .6rem;
    height: 1.6rem;
    display: inline-block;
    background-color: rgb(131, 73, 240);
    vertical-align: middle;
    margin-left: 1.5rem;
    transform: skewY(115deg);
  }
}
.nav-fade-enter {
  opacity: 0;
  transform: translateX(-15rem);
}
.nav-fade-enter-active {
  transition: transform .5s ease;
}
.nav-fade-leave-active {
  transition: transform .3s ease;
  transform: scale3d(0, 0, 0);
}
.left-nav {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3001;
  background-color: rgb(0, 0, 0);
  .ln-head {
    width: 100%;
    height: auto;
    .ln-img {
      width: 142/12rem;
      height: 142/12rem;
      margin: 0rem auto;
      padding: 6rem 0 0;
      .img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        border: .3rem solid #fff;
      }
    }
  }
  .ln-menu {
    width: 100%;
    height: auto;
    .lm-con {
      .c-ul {
        list-style: none;
        // padding-left: 1.8rem;
        font: 400 1.8rem "微软雅黑";
        position: relative;
        .c-li {
          width: 100%;
          height: auto;
          padding: 1.5rem 0;
          color: rgb(240, 240, 240);
          border-bottom: .1rem solid rgb(145, 145, 145);
          text-align: center;
          position: absolute;
          // &::before {
          //   content: '';
          //   width: 2rem;
          //   height: 2rem;
          //   display: inline-block;
            // padding-right: .8rem;
            // background: url('../../../assets/小说.svg') no-repeat center;
            // background-size: 2rem;
          //   vertical-align: bottom;
          // }
          &:first-child {
            animation: fli 1s ease;
            animation-fill-mode: forwards;
          }
          @keyframes fli {
            from {
              top: 0;
            }
            to {
              top: 5rem;
            }
          }
          &:nth-child(2) {
            animation: sli 1s ease;
            animation-fill-mode: forwards;
          }
          @keyframes sli {
            from {
              top: 0;
            }
            to {
              top: 10rem;
            }
          }
          &:nth-child(3) {
            animation: tli 1s ease;
            animation-fill-mode: forwards;
          }
          @keyframes tli {
            from {
              top: 0;
            }
            to {
              top: 15rem;
            }
          }
          &:nth-child(4) {
            animation: foli 1s ease;
            animation-fill-mode: forwards;
          }
          @keyframes foli {
            from {
              top: 0;
            }
            to {
              top: 20rem;
            }
          }
          &:nth-child(5) {
            border-bottom: none;
            animation: fili 1s ease;
            animation-fill-mode: forwards;
          }
          @keyframes fili {
            from {
              top: 0;
            }
            to {
              top: 25rem;
            }
          }
          &:last-child {
            position: fixed;
            bottom: 2rem;
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
