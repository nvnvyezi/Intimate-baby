<template>
  <div class="box">
    <mt-swipe :auto="4000" class="swipe__box">
      <mt-swipe-item><img src="../assets/swipe.jpg" alt="" srcset=""></mt-swipe-item>
      <mt-swipe-item><img src="../assets/swipe2.jpg" alt="" srcset=""></mt-swipe-item>
      <mt-swipe-item><img src="../assets/swipe3.jpg" alt="" srcset=""></mt-swipe-item>
    </mt-swipe>
    <section>
      <div class="book-box">
          <h3>推荐书籍</h3>
          <div class="li__box">
            <ul>
              <li v-for="(item, index) in result"><router-link to="/"><img :src="item" :alt="index"><span>{{ index }}</span></router-link></li>
            </ul>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'recommend',
  data () {
    return {
      result: {},
      startx: 0,
      starty: 0

    }
  },
  mounted () {
    let that = this;
    if (window.fetch) {
      let that = this;
      let myHeaders = new Headers({
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'text/plain'
      })
      fetch('http://127.0.0.1:3000/bookRem', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
      }).then(function (response) {
        // console.log(response);
        response.json().then((data) => {
          // console.log(data.result);
          that.result = data.result;
          // console.log(that.result);
        })
      }).catch(() => {
        console.log(2);
      })
    } else {
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:3000/bookRem",
        // data: "data",
        dataType: "jsonp",
        success: function (response) {
          console.log(response);
        }
      });
    }
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
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(241, 239, 239);
    .swipe__box {
      width: 100vw;
      height: 30vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
    section {
      width: 100vw;
      height: 400px;
      background-color: white;
      .book-box {
        width: 90%;
        height: auto;
        margin: 10px auto;
        // background-color: green;
        h3 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 1.5rem;
          font-weight: 400;
          padding: 20px 5px;
        }
        .li__box {
          ul {
            list-style-type: none;
            display: grid;
            grid-template-columns: repeat(2, 50%);
            // grid-column-gap: 10px;
            justify-items: center;
            grid-row-gap: 40px;
            li {
              width: 120px;
              height: 155px;
              display: inline-block;
              box-shadow: -5px 4px 2px 0px rgb(223, 220, 220);
              // background-color: red;
              img {
                width: 100%;
                height: 100%;
              }
              a {
                text-decoration: none;
                span {
                  margin-top: 10px;
                  font-size: 0.8rem;
                  font-weight: 550;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
