<template>
  <div class="box">
    <ul class="box__ul">
      <router-link class="box__ul__li" to="bookinformation" tag="li" v-for="(item, index) in searchResult" :key="index">
        <div class="box__ul__li--imgBox">
          <img class="box__ul__li--imgBox--img" src="" v-lazyLoad="item.imgUrl" :alt="item.author">
        </div>
        <div class="box__ul__li--right">
          <div class="box__ul__li--right--title">
            <h3 class="box__ul__li--right--title--h3">{{ item.title}}</h3>
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
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'bookSearchData',
  data () {
    return {
      searchResult: []
    }
  },
  mounted () {
    if (window.fetch) {
      const options = {
        do: 'is_serchpay',
        page: 1,
        size: 10,
        q: this.searchData || '元尊',
        filterMigu: 1,
        p: 3,
        shuqi_h5: '', 
        _: '1526385291046'
      }
      fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
        Array.prototype.forEach.call(data.data, (item) => {
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
      return this.$store.state.bookSearch.searchData;
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
    padding: 0.2rem 0.5rem 0.1rem;
  }
  .statName (@fcolor: #70a7e3) {
    .statNameG;
    color: @fcolor;
    border: 0.005rem solid @fcolor;
    margin-right: 0.3rem;
    font-size: 0.7rem;
  }
  .statNamered {
    .statName(#f08300)
  }
  .statNameblue {
    .statName(#499fff);
  }
  .titleH3 {
    font-size: 1.7rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .box {
    width: 100vw;
    height: auto;
    background-color: white;
    .box__ul {
      list-style: none;
      width: 85%;
      margin: 0 auto;
      .box__ul__li {
        width: 100%rem;
        height: auto;
        padding: 1.8rem 0;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        border-bottom: 0.08rem solid @borderColor;
        .box__ul__li--imgBox {
          width: 56/12rem;
          height: 74/12rem;
          position: relative;
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
          width: 200/12rem;
          height: 76/12rem;
          margin: 0 0 0 1.3rem;
          .box__ul__li--right--title {
            width: 100%;
            line-height: 18/12rem;
            .box__ul__li--right--title--h3 {
              .titleH3;
            }
          }
          .box__ul__li--right--author {
            width: 100%;
            height: 16/12rem;
            display: -webkit-box;
            -webkit-box-orient: horizontal;
            -webkit-box-align: center;
            -webkit-box-pack: end;
            margin: 0.9rem 0;
            color: @wordColor;
            .box__ul__li--right--author--author {
              display: block;
              -webkit-box-flex: 1;
            }
            .box__ul__li--right--author--reads {
              display: block;
              text-align: right;
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
            height: 20/12rem;
            color: @wordColor;
            text-align: left;
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
              font-size: 1.25rem;
              color: #499fff;
            }
          }
        }
      }
    }
  }
}
</style>
