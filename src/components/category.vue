//分类的主路由
<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <!-- <div v-else>
      <list></list>
    </div> -->
    <keep-alive>
      <router-view @changeList="changeList"></router-view>
    </keep-alive>
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
      listName: '分类'
    }
  },
  methods: {
    urlList (e) {
      switch (e.target.innerText) {
        case '全部':
          this.sendIndex(0);
          break;
        case '玄幻奇幻':
          this.sendIndex(1);
          break;
        case '武侠奇侠':
          this.sendIndex(2);
          break;
        case '都市言情':
          this.sendIndex(3);
          break;
        case '历史军事':
          this.sendIndex(4);
          break;
        case '科幻灵异':
          this.sendIndex(5);
          break;
        case '网游竞技':
          this.sendIndex(6);
          break;
        case '女生频道':
          this.sendIndex(7);
          break;
        default:
          break;
      }
    },
    sendIndex (num) {
      this.$store.dispatch({
        type: 'changeNum',
        num: num
      })
    },
    changeList (str) {
      this.listName = str;
    },
    back () {
      this.$router.go(-1);
    }
  },
  mounted () {
    this.$store.dispatch({
      type: 'hideFalse',
      bool: true
    })
  },
  watch: {
    '$route': function (param) {
      if (param.path === '/cate') {
        this.listName = '分类';
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
    }
  }
}
</style>
