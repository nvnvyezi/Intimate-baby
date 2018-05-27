/**排行主界面 */

<template>
  <div class="seniority">
    <nav class="seniority--nav">
      <div @click="back">↤</div>
      <div>
        <span>{{ listName }}</span>
      </div>
      <router-link to="/" tag="div">H</router-link>
    </nav>
    <div class="seniority__list">
      <ul class="seniority__list__ul">
        <router-link @click.native="changeProp" class="seniority__list__ul__li" to="senioritylist" tag="li" :data-title="item.title" :type="item.type" v-for="(item, index) in data" :key="index">
          <i></i>
          <div class="seniority__list--section">
            <h3 class="seniority__list--section--h3">{{ item.title }}</h3>
            <p class="seniority__list--section--p">{{ item.text }}</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { seniorityHome } from '../api/api'
export default {
  name: 'bookSeniorityHome',
  data () {
    return {
      listName: '排行',
      data: []
    }
  },
  created () {
    seniorityHome(data => {
      data.forEach((item, index) => {
        if (index % 2 === 0) {
          let obj = {};
          obj.title = item.content.title;
          obj.text = item.content.desc;
          obj.type = item.content.url.replace('#!/cid/', '')[0];
          this.data.push(obj);
        }
      });
    })
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    changeProp (e) {
      let typ = e.currentTarget.getAttribute('type');
      let title = e.currentTarget.getAttribute('data-title');
      this.$store.dispatch({
        type: 'triggerType',
        typ
      })
      this.$store.commit({
        type: 'changeMoreBookTitle',
        moreBookTitle: title
      })
      localStorage.setItem('seniorityType', typ);
      localStorage.setItem('MoreBookTitle', title);
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
  .seniority {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: rgb(241, 240, 240);
    .seniority--nav {
      width: 100%;
      line-height: 45px;
      background-color: rgb(241, 157, 60);
      display: grid;
      grid-template-columns: 50px auto 50px;
      color: white;
      text-align: center;
      font-size: 1.5rem;
      div > span {
        text-align: center;
        width: 25%;
        display: inline-block;
      }
    }
    .seniority__list {
      width: 100vw;
      height: auto;
      .seniority__list__ul {
        list-style-type: none;
        .seniority__list__ul__li {
          display: inline-block;
          width: 100%;
          padding: .5rem 0;
          border-bottom: 0.7rem solid rgb(241, 240, 240);
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
            // height: 50px;
            border-left: 60px solid transparent;
            border-top: 20px solid transparent;
            .seniority__list--section--h3 {
              display: block;
              font-size: 1.5rem;
              font-weight: 400;
            }
            .seniority__list--section--p {
              font-size: 1rem;
              font-weight: 300;
              color: rgb(92, 92, 92);
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
