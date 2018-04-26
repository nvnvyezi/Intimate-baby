<template>
  <div class="box">
    <div class="list">
      <ul>
        <li v-for="(item, index) in list" :key="index"><i></i><router-link @click.native="urlList" to="cater" tag="span">{{ item }}</router-link></li>
        <!-- <li v-for="(item, index) in list" :key="index"><i></i><span @click="url">{{ item }}</span></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'cateHome',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$store.dispatch({
      type: 'hideFalse',
      bool: true
    })
    let that = this;
    if (window.fetch) {
      fetchGet('http://127.0.0.1:3000/bookList', {}, 'get', (data) => {
        this.list = data.result;
      })
    }
  },
  methods: {
    urlList (e) {
      switch (e.target.innerText) {
        case this.list[0]:
          this.sendIndex(0);
          break;
        case this.list[1]:
          this.sendIndex(1);
          break;
        case this.list[2]:
          this.sendIndex(2);
          break;
        case this.list[3]:
          this.sendIndex(3);
          break;
        case this.list[4]:
          this.sendIndex(4);
          break;
        case this.list[5]:
          this.sendIndex(5);
          break;
        case this.list[6]:
          this.sendIndex(6);
          break;
        case this.list[7]:
          this.sendIndex(7);
          break;
        default:
          break;
      }
    },
    sendIndex (num) {
      this.$emit('changeList', this.list[num]);
      this.$store.dispatch({
        type: 'changeNum',
        num: num
      })
    }
  },
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100vw;
    height: auto;
    // margin-top: 10px;
    background-color: rgb(255, 255, 255);
    .list {
      width: 100vw;
      height: auto;
      ul {
        li {
          width: 100vw;
          line-height: 20px;
          list-style-type: none;
          display: inline-block;
          // background-image: url('../assets/swipe.jpg');
          // border-radius: 10px;
          // background-size: 40px 40px;
          // background-repeat: no-repeat;
          // background-position: left top;
          border-bottom: 1px solid rgb(236, 236, 236);
          // background-color: white;
          i {
            width: 40px;
            height: 40px;
            border-left: 10px solid transparent;
            display: inline-block;
            background-image: url('../assets/all.png');
            border-radius: 50%;
            background-size: 30px 30px;
            background-repeat: no-repeat;
            background-position: center 70%;
          }
          span {
            // background-color: red;
            width: 80vw;
            // height: auto;
            line-height: 40px;
            vertical-align: text-bottom;
            // padding-left: 10px;
            border-left: 15px solid transparent;
            font-size: 0.5rem;
          }
        }
        li:nth-child(2) {
          i {
            background-image: url('../assets/xuanhuan.png');
          }
        }
        li:nth-child(3) {
          i {
            background-image: url('../assets/wuxia.png');
          }
        }
        li:nth-child(4) {
          i {
            background-image: url('../assets/kehuan.png');
          }
        }
        li:nth-child(5) {
          i {
            background-image: url('../assets/lishi.png');
          }
        }
        li:nth-child(6) {
          i {
            background-image: url('../assets/dushi.png');
          }
        }
        li:nth-child(7) {
          i {
            background-image: url('../assets/wangyou.png');
          }
        }
        li:nth-child(8) {
          border-bottom: none;
          i {
            background-image: url('../assets/nvsheng.png');
          }
        }
      }
    }
  }
}
</style>
