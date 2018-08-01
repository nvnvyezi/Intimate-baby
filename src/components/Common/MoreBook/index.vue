<template>
  <div class="box">
    <!-- <nav class="navHeader">
      <div class="navHeader--header">
        <div @click="back" class="header-iconL"></div>
        <div>
          <span>{{ title }}</span>
        </div>
        <router-link to="/" tag="div" class="header-iconR"></router-link>
      </div>
    </nav> -->
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
import bookList from '../BookList/index'
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
      // let name = this.$store.state.home.moreBookTitle;
      // if (!name) {
      //   name = localStorage.getItem('MoreBookTitle');
      // }
      // return name;
      let name = this.$store.state.home.listName;
      if (!name) {
        name = localStorage.getItem('listName');
      }
      return name;
    }
  },
  methods: {
    // back () {
    //   this.$router.go(-1);
    // },
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
    .iconG {
      width: 2rem;
      height: 2rem;
      background-size: contain;
      position: relative;
      z-index: 5;
    }
    .box {
      width: 100%;
      height: auto;
      // .navHeader {
      //   width: 100%;
      //   height: 4rem;
      //   display: flex;
      //   justify-content: center;
      //   position: relative;
      //   // align-items: center;
      //   background-color: rgb(241, 157, 60);
      //   .navHeader--header {
      //     width: 90%;
      //     line-height: 4rem;
      //     // display: grid;
      //     // grid-template-columns: 50px auto 50px;
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     color: white;
      //     text-align: center;
      //     font: 600 1.7rem '微软雅黑';
      //     .header-iconL {
      //       .iconG;
      //       background: url('../assets/返回.svg') no-repeat center;
      //     }
      //     .header-iconR {
      //       .iconG;
      //       background: url('../assets/h.svg') no-repeat center;
      //     }
      //   }
      // }
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
