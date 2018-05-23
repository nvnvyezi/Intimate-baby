<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'bookSearch',
  data () {
    return {
      listName: '书籍详情',
    }
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
    background-color: rgb(245, 243, 243);
    nav {
      width: 100%;
      line-height: 45px;
      background-color: rgb(241, 157, 60);
      display: grid;
      grid-template-columns: 50px auto 50px;
      color: white;
      text-align: center;
      font-size: 1.5rem;
    }
  }
}
</style>