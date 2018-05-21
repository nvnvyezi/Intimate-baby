//小说分类
<template>
  <div class="bookHome">
    <p class="refresh"></p>
    <div v-if="judge" class="list seniority__list">
      <div class="boy--title">男生分类</div>
      <ul class="list__ul">
        <router-link class="list__ul__li" :to="userRouter" @click.native="changeProp" v-for="(item, index) in boyList" :list="item.list" :key="index" tag="li">
          <!-- <i></i> -->
          <div class="list__ul__li__middle">
            <div class="list__ul__li__middle--top">{{ item.list }}</div>
            <div class="list__ul__li__middle--bottom">{{ item.text }}</div>
          </div>
        </router-link>
      </ul>
      <div class="boy--title">女生分类</div>
      <ul class="list__ul">
        <router-link class="list__ul__li" :to="userRouter" @click.native="changeProp" v-for="(item, index) in girlList" :list="item.list" :key="index" tag="li">
          <!-- <i></i> -->
          <div class="list__ul__li__middle">
            <div class="list__ul__li__middle--top">{{ item.list }}</div>
            <div class="list__ul__li__middle--bottom">{{ item.text }}</div>
          </div>
        </router-link>
      </ul>
    </div>
    <div v-else class="loading__box">
      <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
    </div>
  </div>
  
</template>

<script>
import { categoryHome } from '../api/api'
import loading from '../components/loadingImg'
export default {
  components: {
    loading,
  },
  name: 'cateHome',
  data () {
    return {
      boyList: [],
      girlList: [],
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
      categoryHome(data => {
        let boy= data.boy;
        for (let i = 0; i < boy.length-1; i++) {
          for (const key in boy[i]) {
            if (boy[i].hasOwnProperty(key)) {
              let obj = {};
              obj.list = key;
              obj.text = boy[i][key].list.join(' | ');
              this.boyList.push(obj);
            }
          }
        }
        let girl= data.girl;
        for (let i = 0; i < girl.length; i++) {
          for (const key in girl[i]) {
            if (girl[i].hasOwnProperty(key)) {
              let obj = {};
              obj.list = key;
              obj.text = girl[i][key].list.join(' | ');
              this.girlList.push(obj);
            }
          }
        }
        this.judge = true;
      })
    }
  },
  methods: {
    changeProp (e) {
      let list = e.currentTarget.getAttribute('list');
      this.$store.dispatch({
        type: 'triggerFirst',
        firstCate: list
      })
      this.$emit('changeList', list);
      localStorage.setItem('firstCate', list);
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
  .iconG {
    content: '';
    width: 40/12rem;
    height: 40/12rem;
    display: block;
    background-size: 3rem 3rem;
    border-left: 10px solid transparent;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center 70%;
  }
  .bookHome {
    width: 100vw;
    height: auto;
    margin-top: 45/12rem;
    background-color: rgb(255, 255, 255);
    position: relative;
    top: 0;
    .refresh {
      text-align: center;
    }
    .refresh__transition {
      transition: transform .5s ease .1s;
    }
    .list {
      width: 100vw;
      height: auto;
      .boy--title {
        width: 100%;
        height: auto;
        background-color: #fafafa;
        color: #999;
        padding: 0.8rem 0 1rem .8rem;
      }
      .list__ul {
        list-style: none;
        .list__ul__li {
          width: 100vw;
          line-height: 20px;
          list-style-type: none;
          display: block;
          border-bottom: 1px solid rgb(236, 236, 236);
          display: flex;
          align-items: center;
          padding: 0.8rem 0;
          .list__ul__li__middle {
            width: 80vw;
            height: auto;
            border-left: 15px solid transparent;
            .list__ul__li__middle--top {
              font-size: 1.35rem;
              overflow-x: hidden;
            }
            .list__ul__li__middle--bottom {
              font-size: 0.7rem;
              color: #999;
            }
          }
          &:nth-child(1)::before {
            .iconG;
            background-image: url('../assets/all.png');
          }
          &:nth-child(2)::before {
            .iconG;
            background-image: url('../assets/xuanhuan.png');
          }
          &:nth-child(3)::before {
            .iconG;
            background-image: url('../assets/wuxia.png');
          }
          &:nth-child(4)::before {
            .iconG;
            background-image: url('../assets/kehuan.png');
          }
        }
        li:nth-child(5)::before {
          .iconG;
          background-image: url('../assets/lishi.png');
        }
        li:nth-child(6)::before {
          .iconG;
          background-image: url('../assets/dushi.png');
        }
        li:nth-child(7)::before {
          .iconG;
          background-image: url('../assets/wangyou.png');
        }
        li:nth-child(8)::before {
          .iconG;
          background-image: url('../assets/nvsheng.png');
        }
        li:nth-child(9)::before {
          .iconG;
          background-image: url('../assets/wangyou.png');
        }
        li:nth-child(10)::before {
          .iconG;
          background-image: url('../assets/nvsheng.png');
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
