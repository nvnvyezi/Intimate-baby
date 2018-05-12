<template>
  <div class="box">
    <ul class="box__ul">
      <router-link class="box__ul__li" to="" tag="li" v-for="(item, index) in arrResult" :key="index">
        <div class="box__ul__li--imgBox">
          <img class="box__ul__li--imgBox--img" :src="item.imgUrl" :alt="item.author">
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
            <span class="box__ul__li--right--tags--words">{{ item.words }}</span>
            <span class="box__ul__li--right--tags--one">{{ item.tags[0] }}</span>
            <span class="box__ul__li--right--tags--two">{{ item.tags[1] }}</span>
            <span class="box__ul__li--right--tags--three">{{ item.tags[2] }}</span>
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
      arrParams: [
        {
          type: 1,
          page: 1,
          _: '1526130774446'
        }
      ]
    }
  },
  mounted () {
    if (window.fetch) {
      const options = {
        do: 'is_novelrank',
        p: 1,
        page: this.arrParams[0].page,
        size: 10,
        onlyCpBooks: 1,
        gender: 1,
        type: this.arrParams[0].type,
        shuqi_h5: '',
        _: this.arrParams[0]._
      }
      fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
        console.log(data)
        Array.prototype.forEach.call(data.data, (item) => {
          let obj = {};
          obj.imgUrl = item.cover;
          obj.title = item.title;
          obj.author = item.author;
          obj.reads = (item.reads/1000).toFixed(1) + '万';
          obj.words = (item.words/1000).toFixed(1) + '万字';
          obj.tags = item.tags.split(",").slice(0, 3);
          this.arrResult.push(obj);
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px) {
  .box {
    width: 100vw;
    height: auto;
    background-color: white;
    .box__ul {
      list-style: none;
      width: 90%;
      margin: 0 auto;
      .box__ul__li {
        width: 304/12rem;
        height: auto;
        padding: 1rem 0;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        .box__ul__li--imgBox {
          width: 56/12rem;
          height: 74/12rem;
          position: relative;
          .box__ul__li--imgBox--img {
            width: 100%;
            height: 100%;
          }
          &::after {
            content: '';
            width: 18/12rem;
            height: 28/12rem;
            display: inline-block;
            background-image: url('../assets/bestSellicon.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: absolute;
            z-index: 3;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>
