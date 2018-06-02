<template>
  <div class="templateBox">
    <ul class="box__ul">
      <router-link @click.native="changeInfoBook" class="box__ul__li" to="bookinformation" tag="li" v-for="(item, index) in arrResult" :key="index">
        <div class="box__ul__li--imgBox">
          <img class="box__ul__li--imgBox--img" src="" v-lazyLoad="item.imgUrl" :alt="item.author">
        </div>
        <div class="box__ul__li--right">
          <div class="box__ul__li--right--title">
            <h3 class="box__ul__li--right--title--h3" :bid="item.bid">{{ item.title }}</h3>
          </div>
          <div class="box__ul__li--right--author">
            <p class="box__ul__li--right--author--author">{{ item.author}}</p>
            <span class="box__ul__li--right--author--reads">{{ item.reads}}</span>
          </div>
          <div class="box__ul__li--right--tags">
            <span v-if="item.status == 0" class="statNameblue">连载</span>
            <span v-else class="statNamered">完结</span>
            <span class="box__ul__li--right--tags--words">{{ item.words }}</span>
            <span class="box__ul__li--right--tags--one">{{ item.tags[0] }}</span>
            <span class="box__ul__li--right--tags--two">{{ item.tags[1] }}</span>
          </div>
        </div>
      </router-link>
    </ul>
    <footer class="templateBox--footer">
      <div v-if="loadJudge" class="bookList--footer--text">
        加载更多
      </div>
      <div v-else class="bookList--footer--textend">
        没有更多
      </div>
    </footer>
  </div>
</template>

<script>
import { seniorityList } from "../api/api";
export default {
  name: 'bookList',
  props: {
    sex: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      arrResult: [],
      flag: 2,
      gender: 1,
      loadJudge: true,
      page: 1,
      timeId: null
    }
  },
  watch: {
    sex (str) {
      // console.log(str)
      this.arrResult = [];
      this.switchData();
    }
  },
  computed: {
    type () {
      let type = this.$store.state.home.type;
      if (!type) {
        type = localStorage.getItem('seniorityType');
      }
      return type;
    }
  },
  mounted () {
    this.getData();
    let templateBox = document.getElementsByClassName('templateBox');
    templateBox[0].addEventListener('touchstart', this.showFooter, false);
  },
  methods: {
    showFooter () {
      let footer = document.getElementsByClassName('templateBox--footer');
      let li = document.getElementsByTagName('li');
      let liBottom = li[li.length-1].getBoundingClientRect().bottom
      let screenHeight = document.documentElement.clientHeight;
      if (liBottom - screenHeight < 120) {
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
          this.page++;
          this.getData();
        }, 300);
      }
    },
    changeInfoBook (e) {
      let id = e.currentTarget.children[1].firstChild.firstChild.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: id
      })
    },
    getData () {
      seniorityList(this.page, this.gender, this.type, data => {
        if (data.length == 0) {
          this.loadJudge = false;
          return ;
        }
        data.forEach(item => {
          let obj = {};
          obj.imgUrl = item.cover;
          obj.title = item.title;
          obj.author = item.author;
          obj.bid = item.bid;
          obj.status = item.status;
          obj.reads = (item.reads/10000).toFixed(1) + '万';
          obj.words = (item.words/10000).toFixed(1) + '万字';
          obj.tags = item.tags.split(",").slice(0, 3);
          this.arrResult.push(obj);
        })
      })
    },
    switchData () {
      switch (this.sex) {
        case 'man':
          this.gender = 1;
          this.page = 0;
          this.loadJudge = true;
          this.getData();
          break;
        case 'woman':
          this.page = 0;
          this.gender = 2;
          this.loadJudge = true;
          this.getData();
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  @borderColor:rgba(173, 173, 173, 0.3);
  @wordColor: #999;
  .afterG {
    content: '';
    width: 18/12rem;
    height: 28/12rem;
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
  }
  .statNameG {
    height: 1rem;
    line-height: 1rem;
    padding: 0.3rem 0.5rem 0.1rem;
  }
  .statName (@fcolor: #70a7e3) {
    .statNameG;
    color: @fcolor;
    border: 0.1rem solid @fcolor;
    margin-right: 0.3rem;
    font-size: 1rem;
  }
  .statNamered {
    .statName(#f08300)
  }
  .statNameblue {
    .statName(#499fff);
  }
  .titleH3 {
    font-size: 1.5rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .templateBox {
    width: 100vw;
    height: auto;
    background-color: white;
    .box__ul {
      list-style: none;
      width: 90%;
      margin: 0 auto;
      .box__ul__li {
        width: 100%;
        height: auto;
        padding: 1.8rem 0;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        border-bottom: 0.1rem solid @borderColor;
        .box__ul__li--imgBox {
          width: 56/12rem;
          height: 74/12rem;
          position: relative;
          flex: 0 1 auto;
          .box__ul__li--imgBox--img {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(1) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../assets/bestSellicon.png');
          }
        }
        &:nth-child(2) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../assets/second.png');
          }
        }
        &:nth-child(3) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../assets/third.png');
          }
        }
        .box__ul__li--right {
          // width: 70%;
          width: 100%;
          height: 76/12rem;
          margin: 0 0 0 1.5rem;
          flex: 1 0 auto;
          position: relative;
          .box__ul__li--right--title {
            width: 100%;
            line-height: 24/12rem;
            .box__ul__li--right--title--h3 {
              .titleH3;
            }
          }
          .box__ul__li--right--author {
            width: 100%;
            height: 12/12rem;
            display: -webkit-box;
            font-size: 1.1rem;
            -webkit-box-orient: horizontal;
            -webkit-box-align: center;
            -webkit-box-pack: end;
            margin: 0.3rem 0 0 0;
            color: @wordColor;
            .box__ul__li--right--author--author {
              display: block;
              -webkit-box-flex: 1;
            }
            .box__ul__li--right--author--reads {
              display: block;
              text-align: center;
              -webkit-box-flex: 1;
              &::before {
                content: '';
                width: 16/12rem;
                height: 10/12rem;
                display: inline-block;
                padding-right: 1rem;
                background-image: url('../assets/reads.png');
                background-size: 16/12rem 16/12rem;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
          }
          .box__ul__li--right--tags {
            width: 100%;
            height: 22/12rem;
            color: @wordColor;
            text-align: left;
            position: absolute;
            bottom: 0;
            .box__ul__li--right--tags--words,
            .box__ul__li--right--tags--one,
            .box__ul__li--right--tags--two {
              border: 0.1rem solid @borderColor;
              padding: 0.3rem 0.3rem 0.1rem 0.3rem;
              font-size: 1.2rem;
              margin-right: .2rem;
            }
            .box__ul__li--right--tags--three {
              border: 0.1rem solid rgba(73,159,255,.3);
              padding: 0.3rem 0.3rem 0.1rem 0.3rem;
              font-size: 1.25rem;
              color: #499fff;
            }
          }
        }
      }
    }
    .templateBox--footer {
      width: 100%;
      line-height: 50/12rem;
      transform: height 1s ease;
      .bookList--footer--text {
        font-size: 1.4rem;
        text-align: center;
        &::before {
          content: '';
          width: 2rem;
          height: 1.2rem;
          display: inline-block;
          vertical-align: middle;
          background: url('../assets/load.gif') center center no-repeat;
          background-size: 1.4rem 1.4rem;
        }
      }
      .bookList--footer--textend {
        font-size: 1.4rem;
        text-align: center;
      }
    }
  }
}
</style>
