//分类的书单
<template>
  <div class="box">
    <p class="refresh"></p>
    <div v-if="judge" class="ul-box seniority__list">
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
    <!-- <div v-else class="loading-box">
      <img src="../assets/b421bb2aafbf4315acf62a078d5c11e2.gif" alt="">
        <loading class="loading_P"></loading>
    </div> -->
    <loading v-else></loading>
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
import $ from 'jquery'
import fetchGet from '../wheel/fetchGet'
import loading from '../components/loadingImg'
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
        fetchGet('http://'+ window.location.hostname +':3000/bookSeniorityHome', {listNum: this.index, pageNum: this.page, dateNum: this.dateNum}, 'get', (data) => {
          // console.log(data)
          this.list = data.result.listArr;
          this.judge = true;
        });
        $.ajax({
          type: "get",
          url: "http://g.hongshu.com/bookajax/search.do?keyword=一",
          // data: "data",
          dataType: "jsonp",
          success: function (response) {
            console.log(response)
          }
        });
      }
    }
  },
  computed: {
    index () {
      // console.log(this.$store.state.a.index);
      return this.$store.state.a.index;
    },
    page: {
      get: function () {
        return this.$store.state.a.page;
      },
      set: function (value) {
        this.$store.state.a.page = value;
      }
    },
    dateNum () {
      return this.$store.state.a.dateNum;
    }
  },
  created () {
    this.getList();
    this.$emit('changeName');
  },
  watch: {
    page () {
      clearTimeout(timeId);
      let timeId = setTimeout(() => {
        this.getList();
      }, 100);
    },
    dateNum () {
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
      .refresh {
        text-align: center;
      }
      .refresh__transition {
        transition: transform .5s ease .1s;
      }
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
