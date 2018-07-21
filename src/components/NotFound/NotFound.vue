<template>
  <div class="no">
    <header class="n-header">
      <h3 class="h-title">404 Not Found</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="less" scoped>
.no {
  width: 100%;
  height: auto;
  .n-header {
    width: 100%;
    min-height: 200px;
    background-color: rgb(208, 209, 209);
    .h-title {
      width: 100%;
      text-align: center;
      font: 500 4rem/10rem "微软雅黑";
    }
  }
}
</style>
