<template>
  <div class="chapterBox">
    <!-- <h3 class="h3">{{ chapterName }}</h3>  -->
    <div @click="test" class="chapter">
      <div class="chapter--content"></div>
    </div>
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
      startX: 0,
      startY: 0,
      flag: 500
    }
  },
  computed: {
    page: {
      get: function () {
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
      set: function (newVal) {
        console.log(newVal)
        this.$store.dispatch({
          type: 'triggerPage',
          page: newVal
        })
        localStorage.setItem('chapterPage', newVal);
      }
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
    test (e) {
      e.stopPropagation();
      let screenW = document.documentElement.offsetWidth;
      let x = e.clientX;
      if (e.target === e.currentTarget.firstChild && x <= 100) {
        console.log('别殿了')
        this.page--;
      } else if (e.target != e.currentTarget.firstChild && x <= 100) {
        if (e.target.nextSibling) {
          if (e.target.nextSibling.nextSibling) {
            e.target.nextSibling.nextSibling.style.display = 'none';
          }
        }
        e.target.previousSibling.style.transform = `translate(0px, 0px)`;
        e.target.previousSibling.style.display = 'block';
      }
      if (e.target === e.currentTarget.lastChild && x >= screenW/2 + 60) {
        console.log('别了准备下一张')
        this.page++;
      } else if (e.target != e.currentTarget.lastChild && x >= screenW/2 + 60) {
        if (e.target.previousSibling) {
          if (e.target.previousSibling.previousSibling) {
            e.target.previousSibling.previousSibling.style.display = 'none';
          }
        }    
        e.target.style.transform = `translate(${ -screenW }px, 0px)`;
        e.target.nextSibling.style.display = 'block';
      }
    },
    getChapter () {
        getBookChapter ('元尊', this.authorName, this.page, data => {
        this.chapterName = data.bookName;
        this.$emit('changeCatelog', this.chapterName);
        this.handleText(data.text);
      })
    },
    handleText (text) {
      let chapter = document.getElementsByClassName('chapter')[0];
      let chapterContent = document.getElementsByClassName('chapter--content')[0];
      let newDiv = document.createElement('div');
      let screenH = document.documentElement.offsetHeight || document.body.offsetHeight;
      chapterContent.style.zIndex = this.flag;
      chapterContent.style.backgroundColor = `#${ this.color }`;
      this.flag--;
      chapter.appendChild(newDiv);
      for (let i = 0, len = text.length; i < len; i++) {
        newDiv.innerHTML = text.substring(0, i);
        if (newDiv.offsetHeight <= screenH - 10) {
          chapterContent.innerHTML = text.substring(0, i);
          if (i == len - 1) {
            chapter.removeChild(newDiv);
          }
        } else {
          chapter.removeChild(newDiv);
          this.handleTextOver(text, i - 1, len, screenH);
          break;
        }
      }
    },
    handleTextOver (text, start, len, screenH) {
      let newDiv = document.createElement('div');
      let chapter = document.getElementsByClassName('chapter')[0];
      newDiv.setAttribute('data-flag', this.flag);
      newDiv.style.zIndex = this.flag;
      newDiv.style.position = 'absolute';
      newDiv.style.width = `95vw`;
      newDiv.style.left = `50%`;
      newDiv.style.marginLeft =  `-47.5vw`;
      newDiv.style.backgroundColor = `#${ this.color }`;
      newDiv.style.transition = 'transform .5s ease';
      newDiv.className = 'chapter--content';
      this.flag--;
      chapter.appendChild(newDiv);
      for (let i = start; i < len; i++) {
        newDiv.innerHTML = text.substring(start, i);
        if (newDiv.offsetHeight <= screenH - 10) {
          if (i == len -1) {
            newDiv.style.height = `${ screenH }px`;
          }
        } else {
          newDiv.innerHTML = text.substring(start, i - 1);
          newDiv.style.height = `${ screenH }px`;
          this.handleTextOver(text, i - 1, len, screenH);
          break;
        }
      }
    }
  },
  watch: {
    page () {
      location.reload();
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
  .chapterAni {
    transition: transform .5s ease;
    transform: translate(-100vw, 0);
  }
  .chapterBox {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    background-color: #D5EFD2;
    color: #494949;
    font-size: 2.5rem;
    .h3 {
      font-size: 2rem;
    }
    .chapter {
      width: 100%;
      height: 100%;
      .chapter--content {
        position: absolute;
        width: 95vw;
        left: 50%;
        margin-left: -47.5vw;
        transition: transform .5s ease;
        // .chapterAni;
      }
    }
  }
}
</style>
