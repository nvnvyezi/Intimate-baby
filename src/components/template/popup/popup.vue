<template>
  <transition name="toast-fade">
    <!-- 可见 -->
    <div v-show="visible" class="toast" :class="positionClasses">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
      visible: true,         //可见
      message: '我是弹窗',            //提示消息
      duration: 1500,         //显示时间，毫秒
      position: 'center'      //默认显示位置
    }
  },
  computed: {
    positionClasses () {
      return `toast-${this.position}`;
    }
  }
}
</script>

<style lang="less" scoped>
  .toast-fade-enter {
    opacity: 0;
    transform: translate3d(-50%, -10/12rem, 0);
  }
  .toast-fade-enter-active {
    will-change: transform;
    transition: all .5s ease;
  }
  .toast-fade-enter-to {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
  .toast {
    position: fixed;
    left: 50%;
    z-index: 1003;
    max-width: 80%;
    box-sizing: border-box;
    border-radius: 5/12rem;
    padding: 10/12rem 20/12rem;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;
    text-align: center;
    min-height: 40/12rem;
    line-height: 20/12rem;
    font-size: 15/12rem;
    color: #fff;
    user-select: none;
    transform: translateX(-50%);
    letter-spacing: 0.1rem;
    &.toast-top {
      top: 10%;
    }
    &.toast-center {
      top: 50%;
      margin-top: -20px;
    }
    &.toast-bottom {
      bottom: 10%;
    }
  }
</style>
