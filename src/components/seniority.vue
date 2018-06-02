//推荐主路由
<template>
  <div class="box">
    <transition mode="in-out" name="save">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition mode="in-out" name="save">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'book'
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
