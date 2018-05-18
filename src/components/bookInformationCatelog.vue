<template>
  <div>sd</div>
</template>

<script>
import md5 from '../encryption/md5'
export default {
  name: 'bookInformationCatelog',
  data () {
    return {
      catelogResult: [],
      user_id: 8000000,
      encryptKey: '37e81a9d8f02596e1b895d07c171d5c9'
    }
  },
  computed: {
    bookId () {
      return this.$store.state.bookInfo.bookId;
    },
    timestamp () {
      return Date.now();
    }
  },
  mounted () {
    this.getCatelog();
  },
  methods: {
    getCatelog () {
      if (window.fetch) {
        let sign = md5(this.bookId + "" + this.timestamp + this.user_id + this.encryptKey);
        fetch('http://walden1.shuqireader.com/qswebapi/book/chapterlist?_=1526644058478', {
          method: 'post',
          mode: 'cors',
          body: `bookId=${ this.bookId }&user_id=${ this.user_id }&sign=${ sign }&timestamp=${ this.timestamp}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.status === 200 && res.ok) {
            res.json().then((data) => {
              data = data;
              console.log('post', data);
            })
          } else {
            console.error('Error', res);
          }
        }).catch((error) => {
          console.error('Error: ', error)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
