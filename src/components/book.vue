//书本主路由
<template>
  <div class="box">
      <!-- <transition> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'book',
  data () {
    return {
        
    }
  }
}
</script>

<style lang="less" scoped>
  @media screen and(max-width: 720px) {
    .box {
      width: 100vw;
      height: auto;
      background-color: rgb(240, 235, 235);
      position: relative;
      .swipe__box {
        width: 100vw;
        height: 30vh;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
