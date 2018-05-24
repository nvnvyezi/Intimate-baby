//  　底部导航栏
<template>
  <div class="box">
    <!-- <header>
      <img src="../assets/logo1.png" alt="">
    </header> -->
    <!-- <transition name="" mode=""> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  .box {
    width: 100vw;
    height: auto;
  }
}
</style>
