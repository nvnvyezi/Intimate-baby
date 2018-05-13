<template>
  <div class="box">
    <ul class="box__ul">
      <router-link class="box__ul__li" to="" tag="li" v-for="(item, index) in arrResult" :key="index">
        <div class="box__ul__li--imgBox">
          <img class="box__ul__li--imgBox--img" src="" :lazy-img="item.imgUrl" :alt="item.author">
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
            <span class="box__ul__li--right--tags--three">精品</span>
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
import fetchGet from '../wheel/fetchGet';
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
      arrParams: [
        {
          type: 1,
          page: 1,
          gender: 1,
          _: '1526130774446'
        },
        {
          type: 1,
          page: 1,
          gender: 2,
          _: '1526211470093'
        }
      ]
    }
  },
  watch: {
    sex () {
      this.switchData();
    }
  },
  updated () {
    this.imgLazyLoad();
    // window.addEventListener('scroll', this.imgLazyLoad, true);
  },
  methods: {
    getData (index) {
      if (window.fetch) {
        const options = {
          do: 'is_novelrank',
          p: 1,
          page: this.arrParams[index].page,
          size: 10,
          onlyCpBooks: 1,
          gender: this.arrParams[index].gender,
          type: this.arrParams[index].type,
          shuqi_h5: '',
          _: this.arrParams[index]._
        }
        this.arrResult = [];
        fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
          // console.log(data)
          Array.prototype.forEach.call(data.data, (item) => {
            let obj = {};
            obj.imgUrl = item.cover;
            obj.title = item.title;
            obj.author = item.author;
            obj.reads = (item.reads/10000).toFixed(1) + '万';
            obj.words = (item.words/10000).toFixed(1) + '万字';
            obj.tags = item.tags.split(",").slice(0, 2);
            this.arrResult.push(obj);
          })
        })
      }
    },
    imgLazyLoad () {
      const li = document.getElementsByTagName('li');
      const img = document.getElementsByTagName('img');
      const box = document.getElementsByClassName('box');
      const len = li.length;
      if (len !== 1) {
        const screenHeight = document.documentElement.clientHeight;
        for (let i = this.flag; i < len; i++) {
        const moveHeight = document.documentElement.scrollTop || document.body.scrollTop;
          console.log(li[i].offsetTop, screenHeight, document.documentElement.scrollTop, window.pageYOffset, document.body.scrollTop)
          if (li[i].offsetTop < screenHeight + moveHeight - 300) {
            this.flag++;
            console.log(this.flag, 'qqqqqqqq');
            img[i - 1].src = img[i - 1].getAttribute('lazy-img');
          }
        }
        console.log('ooooooooo')
      }
    },
    switchData () {
      switch (this.sex) {
        case 'man':
          this.getData(0);
          break;
        case 'woman':
          this.getData(1);
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    this.switchData();
  },
  destroyed () {
    // window.removeEventListener('scroll', this.imgLazyLoad, true);
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
              padding: 0.3rem 0.5rem 0.1rem 0.5rem;
              font-size: 1.25rem;
            }
            .box__ul__li--right--tags--three {
              border: 1px solid rgba(73,159,255,.3);
              padding: 0.3rem 0.5rem 0.1rem 0.5rem;
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
