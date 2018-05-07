//排行的主路由
<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span @click="changeDateNum(0)">{{ weekName }}</span>
        <span @click="changeDateNum(1)">{{ listName }}</span>
        <span @click="changeDateNum(2)">{{ allName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <!-- <div v-else>
      <list></list>
    </div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" @changeName="changeName"></router-view>
  </div>
</template>

<script>
// import list from "./list";
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'category',
  // components: {
  //   list
  // },
  data () {
    return {
      list: [],
      listName: '排行',
      weekName: '',
      allName: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    changeName () {
      this.weekName = '周榜';
      this.listName = '月榜';
      this.allName = '总榜';
    },
    changeDateNum (num) {
      this.$store.dispatch({
        type: 'changeDate',
        num: num
      })
    }
  },
  watch: {
    '$route': function (param) {
      if (param.path === '/seniority') {
        this.listName = '排行';
        this.weekName = '';
        this.allName = '';
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
    // overflow: hidden;
    // margin-top: 10px;
    background-color: rgb(255, 255, 255);
    nav {
      width: 100%;
      line-height: 45px;
      background-color: rgb(241, 157, 60);
      display: grid;
      grid-template-columns: 50px auto 50px;
      color: white;
      text-align: center;
      div > span {
        text-align: center;
        width: 25%;
        display: inline-block;
      }
    }
  }
}
</style>
