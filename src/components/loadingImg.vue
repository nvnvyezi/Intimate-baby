<template>
  <div class="loading-box">
    <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'loadingImg'
}
</script>

<style lang="less" scoped>
  .loading-box {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0%;
    img {
      width: 100%;
    }
        // background-color: rgb(17, 16, 16);
        // opacity: 0.2;
        // .loading_p{
        //   background-color: red;
        //   .container1 > div, .container2 > div, .container3 > div {
        //     background-color: red;
        //   }
        // }
  }
</style>
