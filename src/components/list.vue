<template>
  <div class="box">
    <div v-if="judge" class="ul-box">
      <ul>
        <!-- <li v-for="(item, index) in list" :key="index">
          {{ item.bookName }}
        </li> -->
        <router-link to="/" tag="li" v-for="(item, index) in list" :key="index">
          <img :src="item.imgUrl" :alt="item.bookName">
          <article>
            <strong>{{ item.bookName }}</strong> <br>
            <span>{{ item.author }}</span>
            <div class="zbox">
              <div class="text">
                {{ item.summary }}
              </div>
            </div>
            <!-- <p>{{ item.summary }}</p> -->
          </article>
        </router-link>
      </ul>
    </div>
    <div v-else class="loading-box">
      <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        <loading class="loading_P"></loading>
    </div>
    <div v-if="judge" class="button__box">
      <button v-if="page !== 1" @click="adcPage">{{ up }}</button>
      <button v-else disabled="disabled">第一页</button>
      <span>{{ page }}</span>
      <button v-if="page !== 100" @click="addPage">{{ down }}</button>
      <button v-else disabled="disabled">最后一页</button>
    </div>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
import loading from './loading'
export default {
  components: {
    loading
  },
  name: 'list',
  data () {
    return {
      list: [],
      up: '[ 上页 ]',
      down: '[ 下页 ]',
      judge: false
    }
  },
  methods: {
    adcPage () {
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
      },200);
      this.$store.dispatch({
        type: 'changePage',
        page: --this.page
      })
    },
    addPage () {
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
      },200);
      this.$store.dispatch({
        type: 'changePage',
        page: ++this.page
      })
    },
    getList () {
      this.judge = false;
      if (window.fetch) {
        fetchGet('http://127.0.0.1:3000/allList', {list: this.index, page: this.page}, 'get', (data) => {
          this.list = data.result;
          this.judge = true;
        });
      }
    }
  },
  computed: {
    index () {
      return this.$store.state.a.index;
    },
    page: {
      get: function () {
        return this.$store.state.a.page;
      },
      set: function (value) {
        this.$store.state.a.page = value;
      }
    }
  },
  mounted () {
    this.getList();
  },
  watch: {
    '$route': function (to) {
      if (to.path === '/cater') {
        this.getList();
      }
    },
    page () {
      clearTimeout(timeId);
      let timeId = setTimeout(() => {
        this.getList();
      }, 100);
    }
  }
}
</script>

<style lang="less" scoped>
  @media screen and(max-width:720px){
    .box {
      width: 100vw;
      height: 100vh;
      background-color: white;
      margin-top: 5px;
      position: absolute;
      .ul-box {
        width:100vw;
        height: auto;
        ul {
          width: 90vw;
          height: auto;
          margin: 0 auto;
          list-style-type: none;
          li {
            width: 100%;
            height: 100px;
            display: inline-block;
            padding-top: 10px;
            // background-color: red;
            border-bottom: 1px solid rgb(219, 216, 216);
            img {
              width: 68px;
              height: auto;
              float: left;
              position: relative;
              top: 0px;
              left: 0px;
            }
            article {
              width: calc(100% - 80px);
              float: right;
              strong {
                font-size: 0.7rem;
                font-weight: 400;
                letter-spacing: 1px;
              }
              span,p,.zbox {
                width: 100%;
                height: 14px;
                overflow: hidden;
                font-size: 0.7rem;
                font-weight: 200;
                // transform: scale(0.2);
                color: rgb(189, 188, 188);
                position: relative;
                top: 8px;
                left: 3px;
              }
              span {
                transform: scale(0.6);
              }
              .zbox {
                height: 40px;
                line-height: 20px;
                overflow: hidden;
                  // background-color: red;
              }
              .zbox .text {
                  float: right;
                  margin-left: -5px;
                  width: 100%;
                  word-break: break-all;
              }
              .zbox::before {
                  float: left;
                  width: 5px;
                  content: '';
                  height: 40px;
              }
              .zbox::after {
                  float: right;
                  content: '...';
                  height: 20px;
                  line-height: 20px;
                  width: 3em;
                  margin-left: -3em;
                  position: relative;
                  text-align: right;
                  left: 100%;
                  top: -20px;
                  padding-right: 5px;
                  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
              }
              p,.zbox {
                top: 15px;
                left: -5px;
                width: 100%;
                height: 38px;
                overflow: hidden;
                transform: scale(0.9);
              }
            }
          }
          li:last-child {
            // border-bottom: none;
          }
        }
      }
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
      .button__box {
        width: 160px;
        height: 40px;
        margin: 0 auto;
        // background-color: rgb(243, 240, 240);
        button {
          width: 70px;
          height: 30px;
          border: none;
          background-color: transparent;
        }
      }
    }
  }
</style>
