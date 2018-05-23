<template>
  <div class="chapter">
    <h3 class="h3">{{ chapterName }}</h3>
  </div>
</template>

<script>
import { getBookChapter } from "../api/api";
export default {
  name: 'bookChapter',
  data () {
    return {
      chapterName: '',
      text: '',
      page: 9,
      startX: 0,
      startY: 0
    }
  },
  computed: {
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
    let chapter = document.getElementsByClassName('chapter')[0];
    chapter.addEventListener('touchstart', this.handleStart, false);
    chapter.addEventListener('touchmove', this.stopEvent, false);
    chapter.addEventListener('touchend', this.handleEnd, false);
  },
  methods: {
    getChapter () {
      getBookChapter (this.bookName, this.authorName, this.page, data => {
        this.chapterName = data.bookName;
        this.handleText(data.text);
      })
    },
    handleText (str) {
      let box = document.getElementsByClassName('chapter');
      let fragement = document.createDocumentFragment();
      for (let i = 0, len = str.length; i < len; i++) {
          let p = document.createElement('p');
          p.innerText = str[i];
          p.className = 'chapter--p';
          fragement.appendChild(p);
      }
      box[0].appendChild(fragement);
    },
    handleStart (e) {
      this.startX = e.changedTouches[0].pageX;
      this.startY = e.changedTouches[0].pageY;
      // console.log(this.startX, this.startY)
    },
    handleEnd (e) {
      let endX = e.changedTouches[0].pageX;
      let endY = e.changedTouches[0].pageY;
      let screenH = document.documentElement.clientHeight;
      let screenW = document.documentElement.clientWidth;
      console.log(screenH, screenW)
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
    .h3 {
      font-size: 2rem;
    }
    p {
      font-size: 1.8rem;
      font-weight: 400;
      letter-spacing: 0.5rem;
      text-align: center
    }
  }
}
</style>
