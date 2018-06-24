//推荐主路由
<template>
  <div class="box">
    <transition mode="out-in" name="BookAni">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition mode="out-in" name="BookAni">
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
  .BookAni-enter-active{
    transition: all .5s ease;
  }
  .BookAni-enter {
    transform: translateX(0.1rem);
    opacity: 0;
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(240, 235, 235);
    // position: relative;
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
