<template>
  <div class="box">
    <!-- <nav class="box--nav">
      <div class="box--nav--header">
        <div @click="back" class="header-iconL"></div>
        <div>
          <span>{{ listName }}</span>
        </div>
        <router-link to="/" tag="div" class="header-iconR"></router-link>
      </div>
    </nav> -->
    <transition mode="out-in" name="infoAni">
      <keep-alive :include="includeCom">
        <router-view></router-view>
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'bookSearch',
  computed: {
    includeCom () {
      return this.$store.state.bookInfo.includeCom;
    }
  }
  // data () {
  //   return {
  //     listName: '书籍详情',
  //   }
  // },
  // methods: {
  //   back () {
  //     this.$router.go(-1);
  //   }
  // }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .infoAni-enter-active {
    transition: all .5s ease;
  }
  .infoAni-enter {
    opacity: 0;
    transform: translateX(100vw);
  }
  // * {
  //   margin: 0;
  //   padding: 0;
  // }
  // .iconG {
  //   width: 2rem;
  //   height: 2rem;
  //   background-size: contain;
  //   position: relative;
  //   z-index: 5;
  // }
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(245, 243, 243);
    // .box--nav {
    //   width: 100%;
    //   height: 4rem;
    //   display: flex;
    //   justify-content: center;
    //   position: relative;
    //   // align-items: center;
    //   background-color: rgb(241, 157, 60);
    //   .box--nav--header {
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
  }
}
</style>