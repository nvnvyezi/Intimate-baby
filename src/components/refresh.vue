<template>
  <div class="box">
    <p class="refresh"></p>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'refresh',
  data () {
    return {
      
    }
  },
  mounted () {
    this.$nextTick(() => {
      const refresh = document.getElementsByClassName('refresh');
      // const seniority__list = document.getElementsByClassName('seniority__list');
      const seniority__list = this.$refs.bookHome;
      console.log(seniority__list)
      let _startPos = 0;
      let transitionHeight = 0;
      let scrollTop = 0;
      seniority__list[0].addEventListener('touchstart', function (e) {  
        console.log('初始位置', e.touches[0].pageY);
        scrollTop = document.body.scrollTop;
        _startPos = e.touches[0].pageY;
        // console.log(box);
        // box[1].style.transition = 'transform 0s';
      }, false);
      seniority__list[0].addEventListener('touchmove', function (e) {  
        // console.log('当前位置', e.touches[0].pageY);
        transitionHeight = e.touches[0].pageY - _startPos;
        if (transitionHeight > 0 && scrollTop === 0 && transitionHeight < 60) {
          // console.log(seniority__list)
          refresh[0].innerText = '下拉刷新';
          seniority__list[0].style.transform = 'translateY(' + transitionHeight +'px)';
        }
      }, false);
      seniority__list[0].addEventListener('touchend', function (e) {  
        seniority__list[0].classList.add('refresh__transition');
        seniority__list[0].style.transform = 'translateY(0px)';
        refresh[0].innerText = '更新中...';
        // console.log(seniority__list[0].offsetTop);
      })
    })
    // this.refresh();
  },
  methods: {
    refresh () {
      const refresh = document.getElementsByClassName('refresh');
      const seniority__list = document.getElementsByClassName('seniority__list');
      let _startPos = 0;
      let transitionHeight = 0;
      let scrollTop = 0;
      seniority__list[0].addEventListener('touchstart', function (e) {  
        console.log('初始位置', e.touches[0].pageY);
        scrollTop = document.body.scrollTop;
        _startPos = e.touches[0].pageY;
        // console.log(box);
        // box[1].style.transition = 'transform 0s';
      }, false);
      seniority__list[0].addEventListener('touchmove', function (e) {  
        // console.log('当前位置', e.touches[0].pageY);
        transitionHeight = e.touches[0].pageY - _startPos;
        if (transitionHeight > 0 && scrollTop === 0 && transitionHeight < 60) {
          // console.log(seniority__list)
          refresh[0].innerText = '下拉刷新';
          seniority__list[0].style.transform = 'translateY(' + transitionHeight +'px)';
        }
      }, false);
      seniority__list[0].addEventListener('touchend', function (e) {  
        seniority__list[0].classList.add('refresh__transition');
        seniority__list[0].style.transform = 'translateY(0px)';
        refresh[0].innerText = '更新中...';
        // console.log(seniority__list[0].offsetTop);
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @media screen and(max-width: 720px) {
    .box {
      width: 100vw;
      height: auto;
      .refresh {
        text-align: center;
      }
      .refresh__transition {
        transition: transform .5s ease .1s;
      }
    }
  }
</style>
