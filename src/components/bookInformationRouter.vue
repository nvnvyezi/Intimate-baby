<template>
  <div class="box">
    <nav>
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
      <!-- <transition-group>     -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition-group> -->
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet';
export default {
  name: 'bookSearch',
  data () {
    return {
      listName: '书籍详情',
      searchJudge: false,
      searchData1: [],
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    getSearchData (e) {
      this.q = e.target.value;
      if (window.fetch) {
        fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php?do=is_pay_sugs&q', {q: e.target.value}, 'get', (data) => {
          // console.log(data);
          if (data.status === 1) {
            this.searchJudge = true;
            if (data.data.length > 4) {
              this.searchData1 = data.data.slice(0,4);
            } else {
              this.searchData1 = data.data;
            }
          } else {
            this.searchJudge = false;
          }
        })
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
