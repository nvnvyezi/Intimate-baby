/**排行主界面 */

<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <p class="refresh"></p>
    <div class="seniority__list">
      <ul v-for="(item, index) in data" :key="index">
        <li><h3>{{ item.title }}</h3><p>{{ item.text }}</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookSeniorityHome',
  data () {
    return {
      listName: '排行',
      data: [
        {
          title: '精品畅销榜',
          text: '全站最畅销，内容丰富超有料'
        },
        {
          title: '狂热点击榜',
          text: '最最受小伙伴钟爱的就在这了'
        },
        {
          title: '新书潜力榜',
          text: '你想要的这里都有哦'
        },
        {
          title: '大婶力作榜',
          text: '最热爽文这边看'
        },
        {
          title: '经典完结榜',
          text: '红文热文，本本超神'
        },
      ]
    }
  },
  created () {
    const refresh = document.getElementsByClassName('refresh');
    const seniority__list = document.getElementsByClassName('seniority__list');
    let _startPos = 0;
    let transitionHeight = 0;
    let scrollTop = 0;
    document.addEventListener('touchstart', function (e) {  
      console.log('初始位置', e.touches[0].pageY);
      scrollTop = document.body.scrollTop;
      _startPos = e.touches[0].pageY;
      // console.log(box);
      // box[1].style.transition = 'transform 0s';
    }, false);
    document.addEventListener('touchmove', function (e) {  
      // console.log('当前位置', e.touches[0].pageY);
      transitionHeight = e.touches[0].pageY - _startPos;
      if (transitionHeight > 0 && scrollTop === 0) {
        // console.log(seniority__list)
        refresh[0].innerText = '下拉刷新';
        seniority__list[0].style.transform = 'translateY(' + transitionHeight +'px)';
      }
    }, false);
    document.addEventListener('touchend', function (e) {  
      seniority__list[0].style.transition = 'transform 0.5s ease 1s';
      seniority__list[0].style.transform = 'translateY(0px)';
      refresh[0].innerText = '更新中...';
    })
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  }
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
    // overflow: hidden;
    // margin-top: 10px;
    position: relative;
    background-color: rgb(255, 255, 255);
    nav {
      width: 100%;
      line-height: 45px;
      background-color: rgb(241, 157, 60);
      display: grid;
      grid-template-columns: 50px auto 50px;
      color: white;
      text-align: center;
    }
  }
}
</style>
