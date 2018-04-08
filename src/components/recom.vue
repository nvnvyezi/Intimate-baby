<template>
  <div class="box">
    <!-- <h3>强推</h3> -->
    <mt-swipe :auto="4000" class="swipe__box">
        <mt-swipe-item><img src="../assets/swipe.jpg" alt="" srcset=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe2.jpg" alt="" srcset=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe3.jpg" alt="" srcset=""></mt-swipe-item>
    </mt-swipe>
    <section>
      <div class="book-box">
        <h3>推荐书籍</h3>
        <div class="li__box">
            <ul>
              <li v-for="(item, index) in result1"><router-link to="/"><img :src="item" :alt="index"><span>{{ index }}</span></router-link></li>
            </ul>
          </div>
        </div>
    </section>
    <section>
      <div class="book__box">
        <h3>推荐书籍</h3>
        <ul>
          <router-link to="/" tag="li" v-for="(item, index) in result" :key="item.sort">
            <strong>{{ item.sort  }}</strong>
            <span>{{ item.bookName }}</span>
            <span class="r">{{ item.typ }}</span>
            <!-- <span class="r">{{ item.author }}</span> -->
          </router-link>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'recom',
  data () {
    return {
      result: {},
      result1: {}
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
      fetch('http://127.0.0.1:3000/bookRec', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
      }).then(function (response) {
        // console.log(response);
        response.json().then((data) => {
          // console.log(data.result);
          that.result = data.result;
          console.log(that.result);
        })
      }).catch(() => {
        console.log(2);
      })
    } else {
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:3000/bookRem",
        // data: "data",
        dataType: "jsonp",
        success: function (response) {
          console.log(response);
        }
      });
    }
    if (window.fetch) {
      let that = this;
      let myHeaders = new Headers({
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'text/plain'
      })
      fetch('http://127.0.0.1:3000/bookRem', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
      }).then(function (response) {
        // console.log(response);
        response.json().then((data) => {
          // console.log(data.result);
          that.result1 = data.result;
          // console.log(that.result);
        })
      }).catch(() => {
        console.log(2);
      })
    } else {
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:3000/bookRem",
        // data: "data",
        dataType: "jsonp",
        success: function (response) {
          console.log(response);
        }
      });
    }
  },
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  .box {
    width: 100vw;
    height: auto;
    background-color: rgb(238, 237, 237);
    // h3 {
    //   width: 28px;
    //   line-height: 12px;
    //   font-size: 0.8rem;
    //   font-weight: 500;
    //   letter-spacing: 1px;
    //   border-left: 3px solid rgb(247, 132, 24);
    // }
    section {
      width: 100vw;
      height: auto;
      background-color: white;
      .book-box {
        width: 90%;
        height: auto;
        margin: 5px auto;
        padding-bottom: 40px;
        // background-color: green;
        h3 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 0.5rem;
          font-weight: 400;
          padding: 20px 5px;
        }
        .li__box {
          ul {
            list-style-type: none;
            display: grid;
            grid-template-columns: repeat(3, 33.5%);
            // grid-column-gap: 10px;
            justify-items: center;
            grid-row-gap: 40px;
            li {
              width: 70px;
              height: 100px;
              display: inline-block;
              box-shadow: -5px 4px 2px 0px rgb(223, 220, 220);
              // background-color: red;
              img {
                width: 100%;
                height: 100%;
              }
              a {
                // width: 70px;
                text-decoration: none;
                // overflow: hidden;
                // text-overflow: ellipsis;
                span {
                  margin-top: 20px;
                  padding-top: 20px;
                  font-size: 0.1rem;
                  font-weight: 400;
                  width: 70px;
                  text-align: left;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
    section h3 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 0.5rem;
      font-weight: 400;
      padding: 20px 5px;
    }
    .book__box {
      width: 90vw;
      margin: 5px auto;
      background-color: white;
      ul {
        li {
          list-style-type: none;
          display: inline-block;
          width: 100%;
          line-height: 50px;
          border-bottom: 1px solid rgb(228, 223, 223);
          strong {
            color: rgb(216, 212, 212);
            font-size: 1rem;
            padding-right: 10px;
          }
          span {
            font-size: 0.5rem;
            font-weight: normal;
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            letter-spacing: 1px;
          }
          .r {
            // width: 70px;
            // line-height: 20px;
            float: right;
            direction: rtl;
            // border: 1px solid red;
          }
        }
        li:nth-child(odd) {
          // color: rgb(241, 180, 10);
          // border-bottom: none;
          // background-color: aqua;
        }
        li:nth-child(even) {
          color: rgb(33, 90, 247);
          // border-bottom: none;
        }
        li:first-child {
          strong {
            color: red;
          }
        }
        li:last-child {
          border-bottom: none;
        }
        li:nth-child(2) {
          strong {
            color: rgb(21, 255, 0);
          }
        }
        li:nth-child(3) {
          strong {
            color: rgb(247, 190, 3);
          }
        }
      }
    }
  }
}
</style>
