//书本主路由
<template>
  <div class="box">
    <div>
    </div>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'book',
  data () {
    return {
        
    }
  },
  computed: {
    hide () {
      return this.$store.state.a.hide;
    }
  },
  watch: {
    hide (params) {
      // console.log(params)
      if (!params) {
        let nav1 = document.getElementById('nav1');
        nav1.classList.remove('aniContrary');
        nav1.classList.add('ani');
      } else {
        let nav1 = document.getElementById('nav1');
        nav1.classList.add('aniContrary');
        nav1.classList.remove('ani');
      }
    }
  },
  mounted () {
    let that = this;
    document.addEventListener('touchstart', function (e) {
      this.startx = e.touches[0].pageX;
      this.starty = e.touches[0].pageY;
      // console.log(this.startx);
      // console.log(this.starty);
    }, false);
    document.addEventListener('touchend', function (e) {
      let endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      let direction = that.getDirection(this.startx, this.starty, endx, endy);
      switch (direction) {
        case 0:
          // console.log('为华东');
          break;
        case 1:
          // console.log('向上');
          that.hideChange(1);
          break;
        case 2:
          // console.log('下');
          that.hideChange(2);
          break;
        case 3:
          // console.log('坐');
          break;
        case 4:
          // console.log('有');
          break;
        default:
          break;
      }
    }, false);
  },
  methods: {
    hideChange (num) {
      // console.log(1);
      let bool;
      if (num === 2) {
        bool = true;
      }
      if (num === 1) {
        bool = false;
      }
      this.$store.dispatch({
        type: 'hideFalse',
        bool: bool
      })
    },
    getAngle (angx, angy) {                               //获得角度
      return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    getDirection (startx, starty, endx, endy) {                                       //返回方向
      let angx = endx - startx;
      let angy = endy - starty;
      let res = 0;
      let angle = this.getAngle(angx, angy);
      if (angle >= -170 && angle <= -10) {
        res = 1;
      } else if (angle > 10 && angle < 170) {
        res = 2;
      } else if ((angle >= 170 && angle <= 180) || (angle >= -180 && angle < -170)) {
        res = 3;
      } else if (angle >= -10 && angle <= 10) {
        res = 4;
      }
      return res;
    }
  }
}
</script>

<style lang="less" scoped>
  @media screen and(max-width: 720px) {
    .ani {
      transition: all 1s ease 0s;
      transform: translateY(9vh);
    }
    .aniContrary {
      transition: all 1s ease 0s;
      transform: translateY(0vh);
    }
    .box {
      width: 100vw;
      height: 100vh;
      background-color: rgb(240, 235, 235);
      .swipe__box {
        width: 100vw;
        height: 30vh;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
