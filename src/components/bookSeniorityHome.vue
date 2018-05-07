/**排行主界面 */

<template>
  <div class="box">
    <!-- <p class="refresh"></p> -->
    <div class="seniority__list">
      <ul>
        <router-link to="senioritylist" tag="li" v-for="(item, index) in data" :key="index"><i></i><div class="seniority__list--section"><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookSeniorityHome',
  data () {
    return {
      listName: '排行',
      data: [
        {
          title: '精品畅销榜',
          text: '全站最畅销，内容丰富超有料'
        },
        {
          title: '狂热点击榜',
          text: '最最受小伙伴钟爱的就在这了'
        },
        {
          title: '新书潜力榜',
          text: '你想要的这里都有哦'
        },
        {
          title: '大婶力作榜',
          text: '最热爽文这边看'
        },
        {
          title: '经典完结榜',
          text: '红文热文，本本超神'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and(max-width: 720px){
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100vw;
    height: auto;
    // overflow: hidden;
    // margin-top: 10px;
    position: relative;
    background-color: rgb(241, 240, 240);
    .seniority__list {
      width: 100vw;
      height: auto;
      ul {
        list-style-type: none;
        li {
          display: inline-block;
          width: 100%;
          height: 80px;
          border-bottom: 5px solid rgb(241, 240, 240);
          background-color: white;
          i {
            width: 40px;
            height: 80px;
            float: left;
            border-left: 10px solid transparent;
            display: inline-block;
            background-image: url('../assets/all.png');
            border-radius: 50%;
            background-size: 30px 30px;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .seniority__list--section {
            width: 200px;
            height: 50px;
            border-left: 60px solid transparent;
            border-top: 20px solid transparent;
            h3 {
              display: block;
              font-size: .9rem;
              font-weight: 400;
            }
            p {
              font-size: 0.7rem;
              font-weight: 300;
            }
          }
        }
        li:nth-child(2) {
          i {
            background-image: url('../assets/xuanhuan.png');
          }
        }
        li:nth-child(3) {
          i {
            background-image: url('../assets/wuxia.png');
          }
        }
        li:nth-child(4) {
          i {
            background-image: url('../assets/kehuan.png');
          }
        }
        li:nth-child(5) {
          i {
            background-image: url('../assets/lishi.png');
          }
        }
        li:nth-child(6) {
          i {
            background-image: url('../assets/dushi.png');
          }
        }
      }
    }
  }
}
</style>
