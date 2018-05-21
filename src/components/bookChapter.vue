<template>
  <div class="chapter">
    <h3 class="h3">{{ chapterName }}</h3>
  </div>
</template>

<script>
import fetchGet from '../wheel/fetchGet'
export default {
  name: 'bookChapter',
  data () {
    return {
      chapterName: '',
      text: ''  
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
  },
  mounted () {
    this.getChapter();
  },
  methods: {
    getChapter () {
      console.log(this.bookName)
      const options = {
        bookName: this.bookName,
        page: ''
      }
      console.log(options)
      fetchGet(`http://${window.location.hostname}:3000/chapter`, options, 'get', (data) => {
        console.log(data)
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
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .chapter {
    width: 100vw;
    height: 100vh;
    // overflow: hidden;
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
