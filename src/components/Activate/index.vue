<template>
  <div class="activate">
    <section v-show="success">
      <span class="activate-text">注册成功，{{ num}}秒后返回登录页面</span>　<br />
      <router-link tag="button" to="/" class="activate-btn">返回主页面</router-link>
    </section>
  </div>
</template>

<script>
import { userActivate } from "../../api/api";
export default {
  name: 'Activate',
  data () {
    return {
      success: false,
      num: 3,
      Time: null
    }
  },
  mounted () {
    userActivate(res => {
      this.$toast(res.data);
      if (!res.err) {
        this.success = true;
        this.decNum();
      }
    })
  },
  methods: {
    decNum () {
      this.Time = setTimeout(() => {
        if (this.num === 0) {
          clearTimeout(this.Time);
          this.$router.push({path: '/login'})
          return ;
        }
        this.num--;
        this.decNum();
      }, 1000);
    }
  },
  beforeDestroy () {
    clearTimeout(this.Time);
  }
}
</script>

<style lang="less" scoped>
.activate {
  width: 100%;
  height: 100vh;
  background: url('../../assets/login.jpg') no-repeat 0 0;
  background-size: 100%;
  overflow: hidden;

  section {
    text-align: center;
    margin-top: 100px;
  }
  .activate-text {
    text-align: center;
    font: 400 2rem "微软雅黑";
  }
  .activate-btn {
    margin: 10px 0;
    border: none;
    padding: 4px 8px;
    font: 400 1rem "微软雅黑";
    color: rgb(74, 131, 238);
  }
}
</style>
