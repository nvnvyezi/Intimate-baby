//分类的主路由
<template>
  <div class="box">
    <nav class="box--nav">
      <div class="box--nav--header">
        <div @click="back">↤</div>
        <div>
          <span>{{ listName }}</span>
        </div>
        <router-link to="/" tag="div">H</router-link>
      </div>
    </nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'category',
  computed: {
    listName: {
      get: function () {
        return localStorage.getItem('listName') || '分类';
      },
      set: function (newVal) {
        console.log(newVal)
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  },
  watch: {
    '$route': function (param) {
      if (param.path === '/cate') {
        localStorage.setItem('listName', '分类');
      }
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
    background-color: rgb(255, 255, 255);
    .box--nav {
      width: 100%;
      height: 45/12rem;
      display: flex;
      justify-content: center;
      // align-items: center;
      background-color: rgb(241, 157, 60);
      .box--nav--header {
        width: 90%;
        line-height: 45/12rem;
        // display: grid;
        // grid-template-columns: 50px auto 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        text-align: center;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
