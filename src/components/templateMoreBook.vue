<template>
  <div class="box">
    <nav class="navHeader">
      <div class="navHeader--header">
        <div @click="back">↤</div>
        <div>
          <span>{{ title }}</span>
        </div>
        <router-link to="/" tag="div">H</router-link>
      </div>
    </nav>
    <nav class="navType">
      <ul class="navType__ul">
        <li class="navType__ul__li liColor"  @click="changeSex">男生</li>
        <li class="navType__ul__li"  @click="changeSex">女生</li>
      </ul>
    </nav>
    <bookList :sex="sex"></bookList>
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
      sexJudge: true,
      sex: 'man'
    }
  },
  computed: {
    title () {
      let name = this.$store.state.home.moreBookTitle;
      if (!name) {
        name = localStorage.getItem('MoreBookTitle');
      }
      return name;
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    changeSex () {
      this.sexJudge = !this.sexJudge;
      const li = document.getElementsByClassName('navType__ul__li');
      if (this.sexJudge) {
        this.sex = 'man';
        li[1].classList.remove('liColor');
        li[0].classList.add('liColor');
      } else {
        this.sex = 'woman';
        li[0].classList.remove('liColor');
        li[1].classList.add('liColor');
      }
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
        // display: grid;
        // grid-template-columns: 50/12rem auto 50/12rem;
        .navHeader--header {
          width: 90%;
          margin: 0 auto;
          line-height: 44/12rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          text-align: center;
          font-size: 1.6rem;
          letter-spacing: 0.1rem;
        }
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
