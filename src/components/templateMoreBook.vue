<template>
  <div class="box">
    <nav class="navHeader">
      <div @click="back">↤</div>
      <div>
        <span>{{ title }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <nav class="navType">
      <ul class="navType__ul">
        <li class="navType__ul__li liColor">男生</li>
        <li class="navType__ul__li">女生</li>
      </ul>
    </nav>
    <bookList v-if="sexJudge" sex="男生"></bookList>
    <bookList v-else sex="女生"></bookList>
  </div>
</template>

<script>
import bookList from './templateBookList'
export default {
  components: {
    bookList
  },
  name: 'moreBook',
  data () {
    return {
      sexJudge: true
    }
  },
  computed: {
    title () {
      return this.$store.state.a.moreBookTitle;
    }
  },
  created () {
    if (window.fetch) {     
      if (this.title === '畅销榜' || this.title === '精品畅销') {
      }
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
  @media screen and(max-width: 720px) {
    @borderColor:rgba(153,153,153,.3);
    @wordColor: #999;
    .box {
      width: 100%;
      height: auto;
      .navHeader {
        width: 100%;
        height: 44/12rem;
        background-color: #f08300;
        display: grid;
        grid-template-columns: 50/12rem auto 50/12rem;
        align-items: center;
        color: white;
        text-align: center;
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
      }
      .navType {
        width: 100%;
        height: 43/12rem;
        background-color: white;
        border-bottom: 1px solid @borderColor;
        .navType__ul {
          width: 100%;
          height: 100%;
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          .navType__ul__li {
            line-height: 43/12rem;
            height: 100%;
            flex: 1;
            font-size: 1.33rem;
            text-align: center;
          }
          .liColor {
            border-bottom: 3px solid #f08300;
          }
        }
      }
    }
  }
</style>
