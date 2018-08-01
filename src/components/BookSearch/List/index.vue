<template>
  <div class="searchBox">
    <ul class="box__ul">
      <router-link @click.native="changeInfoBook" class="box__ul__li" to="bookinformation" tag="li" v-for="(item, index) in searchResult" :key="index">
        <div class="box__ul__li--imgBox">
          <img class="box__ul__li--imgBox--img" src="" v-lazyLoad="item.imgUrl" :alt="item.author">
        </div>
        <div class="box__ul__li--right">
          <div class="box__ul__li--right--title">
            <h3 class="box__ul__li--right--title--h3" :bid="item.bid">{{ item.title}}</h3>
          </div>
          <div class="box__ul__li--right--author">
            <p class="box__ul__li--right--author--author">{{ item.author}}</p>
            <!-- <span class="box__ul__li--right--author--reads">{{ item.reads}}</span> -->
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
    <footer class="searchBox--footer">
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
import { getBookSearchData } from "../../../api/api";
export default {
  name: 'bookSearchData',
  data () {
    return {
      searchResult: [],
      page: 1,
      loadJudge: true,
      binJ: true,
      dataBindJ: null
    }
  },
  methods: {
    changeInfoBook (e) {
      let bookName = e.currentTarget.children[1].firstChild.firstChild.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: bookName
      })
    },
    showFooter () {
      let li = document.getElementsByClassName('box__ul__li');
      let liBottom = li[li.length-1].getBoundingClientRect().bottom
      let screenHeight = document.documentElement.clientHeight;
      // console.log(liBottom, screenHeight)
      if (liBottom - screenHeight < 120) {
        if (this.dataBindJ) {
          this.dataBindJ = false;
          setTimeout(() => {
            this.page++;
            this.getSearchData();
          }, 300);
        }
      }
    },
    getSearchData () {
      getBookSearchData (this.searchData, this.page, data => {
        this.dataBindJ = true;
        if (data.length == 0) {
          this.loadJudge = false;
          return ;
        }
        data.forEach(item => {
          let obj = {};
          obj.imgUrl = item.cover;
          obj.title = item.title;
          obj.author = item.author;
          obj.status = item.status;
          obj.bid = item.bid;
          obj.reads = '加书架';
          obj.words = (item.words/10000).toFixed(1) + '万字';
          obj.tags = item.tags.split(",").slice(0, 2);
          this.searchResult.push(obj);
        })
      })
    }
  },
  computed: {
    searchData () {
      let data = this.$store.state.bookSearch.searchData
      if (!data) {
        data = localStorage.getItem('searchData');
      }
      return data;
    }
  },
  watch: {
    searchData () {
      this.searchResult = [];
      this.getSearchData();
    }
  },
  mounted () {
    this.$nextTick(function () {
      let input = document.getElementsByClassName('form__search__content--input')[0];
      input.value = localStorage['searchData'];
      this.iconJudge = true;
    })
    this.getSearchData();
    let searchBox = document.getElementsByClassName('searchBox');
    if (this.binJ) {
      this.binJ = false;
      window.addEventListener('scroll', this.showFooter, false);
    }
  },
  beforeDestroyed () {
    window.removeEventListener('scroll', this.showFooter, false);
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
    padding: 0.2rem 0.5rem 0.1rem;
  }
  .statName (@fcolor: #70a7e3) {
    .statNameG;
    color: @fcolor;
    border: 1px solid @fcolor;
    margin-right: 0.3rem;
    font-size: 1.2rem;
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
  .searchBox {
    width: 100%;
    height: auto;
    background-color: white;
    .box__ul {
      list-style: none;
      width: 90%;
      margin: 0 auto;
      .box__ul__li {
        width: 100%;
        height: auto;
        padding: 1.6rem 0;
        // display: -webkit-box;
        // -webkit-box-orient: horizontal;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @borderColor;
        .box__ul__li--imgBox {
          width: 56px;
          height: 74px;
          position: relative;
          margin-right: 14px;
          .box__ul__li--imgBox--img {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(1) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../../../assets/bestSellicon.png');
          }
        }
        &:nth-child(2) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../../../assets/second.png');
          }
        }
        &:nth-child(3) {
          .box__ul__li--imgBox::after {
            .afterG;
            background-image: url('../../../assets/third.png');
          }
        }
        .box__ul__li--right {
          // width: 200/12rem;
          width: calc(100% - 70px);
          height: 74px;
          position: relative;
          .box__ul__li--right--title {
            width: 100%;
            line-height: 2rem;
            .box__ul__li--right--title--h3 {
              .titleH3;
            }
          }
          .box__ul__li--right--author {
            width: 100%;
            // height: 12/12rem;
            // display: -webkit-box;
            font-size: 1.2rem;
            margin-top: 4px;
            // -webkit-box-orient: horizontal;
            // -webkit-box-align: center;
            // -webkit-box-pack: end;
            // margin: 0.3rem 0 0 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: @wordColor;
            .box__ul__li--right--author--author {
              display: inline-block;
              font-size: 1.2rem;
              // -webkit-box-flex: 1;
            }
            .box__ul__li--right--author--reads {
              display: inline-block;
              text-align: right;
              // -webkit-box-flex: 1;
              &::before {
                content: '';
                width: 14/12rem;
                height: 1rem;
                display: inline-block;
                padding-right: .6rem;
                background: url('../../../assets/reads.png') no-repeat 0 0;
                background-size: 14/12rem 14/12rem;
              }
            }
          }
          .box__ul__li--right--tags {
            width: 100%;
            // height: 22/12rem;
            color: @wordColor;
            text-align: left;
            position: absolute;
            bottom: 0;
            .box__ul__li--right--tags--words,
            .box__ul__li--right--tags--one,
            .box__ul__li--right--tags--two {
              border: 1px solid @borderColor;
              padding: 0.3rem 0.3rem 0.1rem 0.3rem;
              font-size: 1.2rem;
            }
            .box__ul__li--right--tags--three {
              border: 1px solid rgba(73,159,255,.3);
              padding: 0.3rem 0.3rem 0.1rem 0.3rem;
              font-size: 1.2rem;
              color: #499fff;
            }
          }
        }
      }
    }
    .searchBox--footer {
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
          background: url('../../../assets/load.gif') center center no-repeat;
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
