<template>
  <div class="user">
    <header class="user-header">
      <div class="user-header-container">
        <div @click="back" class="header-iconL"></div>
        <div>
          <span>{{ listName }}</span>
        </div>
        <div @click="showNav" class="header-iconR"></div>
      </div>
    </header>
    <transition>
      <keep-alive include="userChange" exclude="user">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <leftNav :showJ="showN" @changeShowM="showNav"></leftNav>
  </div>
</template>

<script>
import leftNav from '../../template/leftNav/nav';
export default {
  components: {
    leftNav
  },
  name: 'user',
  data () {
    return {
      listName: '详细信息',
      showN: false,
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    showNav () {
      this.showN = !this.showN;
    },
  }
}
</script>

<style lang="less" scoped>
@bcColor: #12A7B4;
.iconG {
  width: 2rem;
  height: 2rem;
  background-size: contain;
  position: relative;
  z-index: 5;
}
.user {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  .user-header {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    position: relative;
    // align-items: center;
    background-color: @bcColor;
    .user-header-container {
      width: 90%;
      line-height: 4rem;
      // display: grid;
      // grid-template-columns: 50px auto 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      text-align: center;
      font: 600 1.7rem '微软雅黑';
      .header-iconL {
        .iconG;
        background: url('../../../assets/返回.svg') no-repeat center;
      }
      .header-iconR {
        .iconG;
        background: url('../../../assets/h.svg') no-repeat center;
      }
    }
  }
}
</style>
