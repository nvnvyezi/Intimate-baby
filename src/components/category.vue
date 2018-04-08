<template>
  <div class="box">
    <div v-if="judge" class="list">
      <ul>
        <li v-for="(item, index) in list"><i></i><router-link to="/cate" tag="span">{{ item }}</router-link></li>
      </ul>
    </div>
    <div v-else>
      <list></list>
    </div>
  </div>
</template>

<script>
import list from "./list";
export default {
  name: 'category',
  components: {
    list
  },
  data () {
    return {
      list: [
      ],
      judge: 0
    }
  },
  mounted () {
    let that = this;
    if (window.fetch) {
      let that = this;
      let myHeaders = new Headers({
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'text/plain'
      })
      fetch('http://127.0.0.1:3000/bookList', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
      }).then(function (response) {
        // console.log(response);
        response.json().then((data) => {
          // console.log(data.result);
          that.list = data.result;
          console.log(that.list)
        })
      }).catch(() => {
        console.log(2);
      })
    } else {
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:3000/bookList",
        // data: "data",
        dataType: "jsonp",
        success: function (response) {
          console.log(response);
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .box {
    width: 100vw;
    height: 100vh;
    margin-top: 10px;
    background-color: rgb(255, 255, 255);
    .list {
      width: 100vw;
      height: auto;
      ul {
        li {
          width: 100vw;
          line-height: 20px;
          list-style-type: none;
          display: inline-block;
          // background-image: url('../assets/swipe.jpg');
          // border-radius: 10px;
          // background-size: 40px 40px;
          // background-repeat: no-repeat;
          // background-position: left top;
          border-bottom: 1px solid rgb(236, 236, 236);
          // background-color: white;
          i {
            width: 40px;
            height: 40px;
            display: inline-block;
            background-image: url('../assets/swipe.jpg');
            border-radius: 50%;
            background-size: 30px 30px;
            background-repeat: no-repeat;
            background-position: center center;
          }
          span {
            // background-color: red;
            width: 80vw;
            // height: auto;
            line-height: 40px;
            vertical-align: top;
            padding-left: 10px;
            font-size: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
