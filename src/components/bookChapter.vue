<template>
  <div class="chapterBox" :style="{fontSize: `${sizeFont}rem`}">
    <!-- <h3 class="h3">{{ chapterName }}</h3>  -->
    <div @click="test" class="chapter">
      <!-- <div class="chapter--content"></div> -->
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
    },
    sizeFont: {
      type: Number,
      required: true,
      default: 2
    }
  },
  data () {
    return {
      chapterName: '',
      startX: 0,
      startY: 0,
      flag: 500,
      // 判断可以点击下一章
      clickJudge: false,
      p: 0,
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
    if (localStorage['historybookName'] != this.bookName || localStorage['historyauthorName'] != this.authorName) {
      this.changePage(0);
      this.getChapter(0);
    } else {
      this.getChapter(localStorage['chapterPage']);
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch({
        type: 'triggerPage',
        page,
      })
      localStorage['chapterPage'] = page;
    },
    test (e) {
      if (!this.clickJudge) {
        e.stopPropagation();
        try {
          let screenW = document.documentElement.offsetWidth;
          let p = localStorage['chapterPage'];
          // console.log(p)
          let x = e.clientX;
          if (e.target === e.currentTarget.firstChild && x <= 100) {
            // console.log('别殿了')
            if (p > 0) {
              this.clickJudge = true;
              --p;
              this.changePage(p);
              this.getChapter(p);
            } else {
              this.$emit('showWrong', '当前已经是第一章');
              thi.changePage(0);
            }
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
            if (p < localStorage.getItem('chapterSize') - 1) {
              this.clickJudge = true;
              ++p;
              this.changePage(p);
              this.getChapter(p);
            } else {
              this.$emit('showWrong', '当前已经是最后一章');
              this.changePage(localStorage.getItem('chapterSize') - 1);
            }
          } else if (e.target != e.currentTarget.lastChild && x >= screenW/2 + 60) {
            if (e.target.previousSibling) {
              if (e.target.previousSibling.previousSibling) {
                e.target.previousSibling.previousSibling.style.display = 'none';
              }
            }    
            e.target.style.transform = `translate(${ -screenW }px, 0px)`;
            e.target.nextSibling.style.display = 'block';
          }
        } catch (error) {
          this.$emit('showWrong', '获取出错');
        }
      }
    },
    getChapter (p) {
      let chapter = document.getElementsByClassName('chapter');
      chapter[0].innerHTML = '<div class="chapter--content" style="position: absolute;width: 95vw;left: 50%;margin-left: -47.5vw;ransition: transform .5s ease;"></div>';
      this.$emit('showWrong', '正在获取');
      getBookChapter (this.bookName, this.authorName, p, data => {
        // console.log(data)
        if (!data.err) {
          this.chapterName = data.chapter;
          this.$emit('changeCatelog', this.chapterName);
          this.handleText(data.text);
          this.clickJudge = false;
          this.$emit('reduction');
        } else {
          this.$emit('showWrong', data.data);
        }
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
        if (newDiv.offsetHeight <= screenH - 50) {
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
    color (str) {
      let chapter = document.getElementsByClassName('chapter');
      let chapterContent = document.getElementsByClassName('chapter--content');
      chapter[0].style.backgroundColor = `#${ this.color }`;
      for (let i = 0; i < chapterContent.length; i++) {
        chapterContent[i].style.backgroundColor = `#${ this.color }`;
      }
    }
  },
  beforeDestroy () {
    localStorage.setItem('historybookName', this.bookName);
    localStorage.setItem('historyauthorName', this.authorName);
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
    overflow: hidden;
    .h3 {
      font-size: 2rem;
    }
    .chapter {
      width: 100%;
      height: 100%;
      overflow: hidden;
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
