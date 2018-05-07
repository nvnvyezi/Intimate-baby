//小说分类
<template>
  <div class="box">
    <p class="refresh"></p>
    <div ref="aaa" v-if="judge" class="list seniority__list">
      <ul>
        <li v-for="(item, index) in list" :key="index"><i></i><router-link @click.native="urlList" :to="userRouter" tag="span">{{ item }}</router-link></li>
      </ul>
    </div>
    <div v-else class="loading__box">
      <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
    </div>
  </div>
  
</template>

<script>
import fetchGet from '../wheel/fetchGet'
import loading from '../components/loadingImg'
export default {
  components: {
    loading,
  },
  name: 'cateHome',
  data () {
    return {
      list: [],
      judge: true,
      refreshJudge: false,
      userRouter: 'cater'
    }
  },
  // updated () {
  //   const refresh = document.getElementsByClassName('refresh');
  //   const seniority__list = document.getElementsByClassName('seniority__list');
  //   let _startPos = 0;
  //   let transitionHeight = 0;
  //   let scrollTop = 0;
  //   seniority__list[0].addEventListener('touchstart', function (e) {  
  //     // console.log('初始位置', e.touches[0].pageY);
  //     scrollTop = document.body.scrollTop;
  //     _startPos = e.touches[0].pageY;
  //   }, false);
  //   seniority__list[0].addEventListener('touchmove', function (e) {  
  //     // console.log('当前位置', e.touches[0].pageY);
  //     transitionHeight = e.touches[0].pageY - _startPos;
  //     if (transitionHeight > 0 && scrollTop === 0 && transitionHeight < 60) {
  //       // console.log(seniority__list)
  //       refresh[0].innerText = '下拉刷新';
  //       seniority__list[0].style.transform = 'translateY(' + transitionHeight +'px)';
  //       if (window.fetch) {
  //         fetchGet('http://127.0.0.1:3000/bookList', {}, 'get', (data) => {
  //           refresh[0].innerText = '成功';
  //           seniority__list[0].classList.remove('refresh__transition');
  //           setTimeout(() => {
  //             refresh[0].innerText = '';
  //           }, 500);
  //           this.list = data.result;
  //         })
  //       }
  //     }
  //   }, false);
  //   seniority__list[0].addEventListener('touchend', function (e) {  
  //     seniority__list[0].classList.add('refresh__transition');
  //     seniority__list[0].style.transform = 'translateY(0px)';
  //     refresh[0].innerText = '更新中...';
  //     // console.log(seniority__list[0].offsetTop);
  //   })
  // },
  created () {
    this.judge = false;
    let that = this;
    if (this.$route.path === '/cate') {
      this.userRouter = 'cater';
    }
    if (this.$route.path === '/seniority') {
      this.userRouter = 'seniorityList';
    }
    if (window.fetch) {
      fetchGet('http://'+ window.location.hostname +':3000/bookList', {}, 'get', (data) => {
        this.list = data.result;
        this.judge = true;
      })
    }
  },
  methods: {
    urlList (e) {
      switch (e.target.innerText) {
        case this.list[0]:
          this.sendIndex(0);
          break;
        case this.list[1]:
          this.sendIndex(1);
          break;
        case this.list[2]:
          this.sendIndex(2);
          break;
        case this.list[3]:
          this.sendIndex(3);
          break;
        case this.list[4]:
          this.sendIndex(4);
          break;
        case this.list[5]:
          this.sendIndex(5);
          break;
        case this.list[6]:
          this.sendIndex(6);
          break;
        case this.list[7]:
          this.sendIndex(7);
          break;
        default:
          break;
      }
    },
    sendIndex (num) {
      if (this.$route.path === '/cate') {
        this.$emit('changeList', this.list[num]);
      }
      this.$store.dispatch({
        type: 'changeNum',
        num: num
      })
    }
  },
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100vw;
    height: auto;
    // margin-top: 10px;
    background-color: rgb(255, 255, 255);
    .refresh {
      text-align: center;
    }
    .refresh__transition {
      transition: transform .5s ease .1s;
    }
    .list {
      width: 100vw;
      height: auto;
      ul {
        li {
          width: 100vw;
          line-height: 20px;
          list-style-type: none;
          display: inline-block;
          border-bottom: 1px solid rgb(236, 236, 236);
          i {
            width: 40px;
            height: 40px;
            border-left: 10px solid transparent;
            display: inline-block;
            background-image: url('../assets/all.png');
            border-radius: 50%;
            background-size: 30px 30px;
            background-repeat: no-repeat;
            background-position: center 70%;
          }
          span {
            // background-color: red;
            width: 80vw;
            // height: auto;
            line-height: 40px;
            vertical-align: text-bottom;
            // padding-left: 10px;
            border-left: 15px solid transparent;
            font-size: 0.5rem;
          }
        }
        li:nth-child(2) {
          i {
            background-image: url('../assets/xuanhuan.png');
          }
        }
        li:nth-child(3) {
          i {
            background-image: url('../assets/wuxia.png');
          }
        }
        li:nth-child(4) {
          i {
            background-image: url('../assets/kehuan.png');
          }
        }
        li:nth-child(5) {
          i {
            background-image: url('../assets/lishi.png');
          }
        }
        li:nth-child(6) {
          i {
            background-image: url('../assets/dushi.png');
          }
        }
        li:nth-child(7) {
          i {
            background-image: url('../assets/wangyou.png');
          }
        }
        li:nth-child(8) {
          border-bottom: none;
          i {
            background-image: url('../assets/nvsheng.png');
          }
        }
      }
    }
    .loading__box {
      width: 100vw;
      height: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
