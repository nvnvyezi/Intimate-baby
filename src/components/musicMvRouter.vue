<template>
  <div class="mvR">
    <header class="mvR-header">
      <section class="main--header-l">{{title}}</section>
      <ul class="main--header-r">
        <router-link  v-if="!showName" to="login" tag="li" class="main--header-r-l1"></router-link>
        <router-link v-else to="login" tag="li" class="main--header-r-l3">{{ showName }}</router-link>
        <li class="main--header-r-l2"></li>
        <!-- <li></li> -->
      </ul>
    </header>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'musicMvRouter',
  data () {
    return {
      title: '音乐MV'  
    }
  },
  computed: {
    showName () {
      let name = localStorage['userName'];
      if (name) {
        return name;
      }
      return false;
    }
  }
}
</script>

<style lang="less" scoped>
.mvR {
  width: 100%;
  height: auto;
  .mvR-header {
    width: 100%;
    height: 4rem;
    background-color: rgb(143, 141, 243);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main--header-l {
      // width: 13rem;
      line-height: 4rem;
      font: 400 2rem "微软雅黑";
      color: white;
      padding-left: 1rem;
    }
    .main--header-r {
      list-style: none;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .main--header-r-l1 {
        width: 4rem;
        height: 4rem;
        background: url('../assets/登录.svg') no-repeat center center;
        background-size: 2rem;
      }
      .main--header-r-l2 {
        width: 4rem;
        height: 4rem;
        background: url('../assets/书架.svg') no-repeat center;
        background-size: 2rem;
      }
      .main--header-r-l3 {
        // width: 9rem;
        line-height: 4rem;
        font: 500 2rem 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: white;
        letter-spacing: .1rem;
        text-align: center;
      }
    }
  }
}
</style>
