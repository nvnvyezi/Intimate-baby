//书本主路由
<template>
  <div class="box">
    <div>
    </div>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
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
