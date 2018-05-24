<template>
  <div class="chapter">
    <h3 class="h3">{{ chapterName }}</h3>
    <p v-for="(item, index) in text" :key="index">{{ item }}</p>
  </div>
</template>

<script>
import { getBookChapter } from "../api/api";
export default {
  name: 'bookChapter',
  props: {
    color: {
      type: String,
      required: true,
      default: '#D5EFD2'
    }
  },
  data () {
    return {
      chapterName: '',
      text: [],
      startX: 0,
      startY: 0
    }
  },
  computed: {
    page () {
      let page = this.$store.state.bookInfo.page;
      if (!page) {
        page = localStorage.getItem('chapterPage');
        this.$store.dispatch({
          type: 'triggerPage',
          page
        })
      }
      return page;
    },
    bookName () {
      let name = this.$store.state.bookInfo.bookName;
      if (!name) {
        name = localStorage.getItem('bookName');
      }
      return name;
    },
    authorName () {
      let name = this.$store.state.bookInfo.authorName;
      if (!name) {
        name = localStorage.getItem('authorName');
      }
      return name;
    },
  },
  mounted () {
    this.getChapter();
  },
  methods: {
    getChapter () {
      // getBookChapter (this.bookName, this.authorName, this.page, data => {
        // console.log(this.page)
        getBookChapter ('元尊', this.authorName, this.page, data => {
        this.chapterName = data.bookName;
        this.$emit('changeCatelog', this.chapterName);
        // this.handleText(data.text);
        this.text = data.text;
      })
    },
    // handleText (str) {
    //   let box = document.getElementsByClassName('chapter');
    //   let fragement = document.createDocumentFragment();
    //   for (let i = 0, len = str.length; i < len; i++) {
    //       let p = document.createElement('p');
    //       p.innerText = str[i];
    //       p.className = 'chapter--p';
    //       fragement.appendChild(p);
    //   }
    //   box[0].appendChild(fragement);
    // }
  },
  watch: {
    page () {
      this.getChapter();
    },
    color (str) {
      let chapter = document.getElementsByClassName('chapter');
      chapter[0].style.backgroundColor = `#${ this.color }`;
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .chapter {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    background-color: #D5EFD2;
    color: #494949;
    .h3 {
      font-size: 2rem;
    }
    p {
      font-size: 1.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      text-align: left;
    }
  }
}
</style>
