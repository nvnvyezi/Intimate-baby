<template>
  <div class="user">
    <div class="userInfo">
      <section class="userInfo-img">
        <img class="photo" :src="userImg" alt="">
      </section>
      <section class="userInfo-name">
        <span class="name">{{ userName }}</span>
        <router-link tag="button" to="user/change" class="btn">编辑资料</router-link>
      </section>
      <section class="userInfo-list">
        <ul class="list">
          <li class="list-li" v-for="(item, index) in listInfo" :key="index">
            <span class="list-num">{{item.num}}</span><span class="list-num">{{item.text}}</span>
          </li>
        </ul>
      </section>
    </div>
    <div class="userBookShelf">
      <h3 class="ubTitle">书架 ({{listInfo[0].num}})</h3>
      <i @click="showDel" class="ub-modify"></i>
      <section class="ub-container">
        <span class="ub-remind" v-if="bookShelf.length === 0">暂无书籍</span>
        <ul v-else class="ub-container">
          <router-link @click.native="changeBookId" to="bookinformation" tag="li" class="ub-li" v-for="(item, index) in book" :key="index" :bid="item.bid">
            <img class="ub-img" :src="item.imgUrl" alt="item.bookName" />
            <h3 class="ub-name">{{item.bookName}}</h3>
            <i @click.prevent="changeBookShelf" v-show="delIcon" class="ub-del" :bid="item.bid"></i>
          </router-link>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { userBookShelfG, bookInfo, userLoginP, userBookShelfP } from "../../../api/api";
import md5 from "../../../encryption/md5";
export default {
  name: 'user',
  data () {
    return {
      listName: '详细信息',
      listInfo: [
        {
          num: 0,
          text: '收藏的书籍'
        },
        {
          num: 0,
          text: '粉丝'
        },
        {
          num: 0,
          text: '关注'
        }
      ],
      bookShelf: [],
      user_id: 8000000,
      encryptKey: '37e81a9d8f02596e1b895d07c171d5c9',
      book: [],
      delIcon: false,
      userImg: ''
    }
  },
  computed: {
    userName () {
      return sessionStorage['userName'];
    },
    timestamp () {
      return Date.now();
    }
  },
  mounted () {
    userBookShelfG(this.userName, data => {
      // console.log(data);
      if (!data.err) {
        let book = data.result.bookShelf.split(',');
        this.bookShelf = book;
        this.userImg = data.result.img;
        localStorage['bookshelf'] = book;
        sessionStorage['userData'] = JSON.stringify(data.result);
        for (let i = 0, len = book.length; i < len; i++) {
          this.getBookInfo(book[i]);
        }
      } else {
        this.$toast('data.data');
      }
    })
  },
  methods: {
    getBookInfo (id) {
      let sign = md5(id + "" + this.timestamp + this.user_id + this.encryptKey);
      bookInfo(id, this.user_id, sign, this.timestamp, item => {
        let obj = {};
        obj.bid = item.bookId;
        obj.bookName = item.bookName;
        obj.imgUrl = item.imgUrl;
        this.book.push(obj);
      })
    },
    showDel () {
      this.delIcon = !this.delIcon;
    },
    changeBookShelf (e) {
      let id = e.target.getAttribute('bid');
      let index = 0;
      for (let i = 0, len = this.bookShelf.length; i < len; i++) {
        if (this.bookShelf[i] == id) {
          index = i;
          this.bookShelf.splice(i, 1);
          break;
        }
      }
      userBookShelfP(this.userName, this.bookShelf, data => {
        if (!data.err) {
          this.book.splice(index, 1);
          localStorage['bookshelf'] = this.bookShelf;
          this.$toast(data.data);
          return ;
        }
        this.$toast(data);
      })
    },
    changeBookId (e) {
      let id = e.currentTarget.getAttribute('bid');
      this.$store.dispatch({
        type: 'triggerBookId',
        id: id
      })
      localStorage.setItem('bookId', id);
    }
  }
}
</script>

<style lang="less" scoped>
@bcColor: #12A7B4;
@borderColor: rgb(224, 224, 224);
@remindColor: #666;
.user {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  user-select: none;
  .userInfo {
    width: 100%;
    height: auto;
    padding-bottom: 2rem;
    .userInfo-img {
      width: 100%;
      height: 140px;
      display: flex;
      justify-content: center;
      padding: 2rem 0;
      .photo {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: .3rem solid #fff;
      }
    }
    .userInfo-name {
      width: 100%;
      line-height: 4rem;
      text-align: center;
      padding-bottom: 1.5rem;
      .name {
        color: #333;
        font: 400 2.4rem Helvetica,Arial,"PingFang SC","Noto Sans",Roboto,"Microsoft Yahei",sans-serif!important;
      }
      .btn {
        width: 6rem;
        height: 2rem;
        border: none;
        border-radius: 3/12rem;
        outline: none;
        vertical-align: text-bottom;
        color: white;
        background-color: @bcColor;
        font: 400 1.4rem Helvetica,Arial,"PingFang SC","Noto Sans",Roboto,"Microsoft Yahei",sans-serif!important;
      }
      .n-info {
        width: 100%;
        font: 400 1rem "微软雅黑";
        text-align: left;
      }
    }
    .userInfo-list {
      width: 100%;
      height: 60/12rem;
      .list {
        display: flex;
        justify-content: space-around;
        list-style: none;
        .list-li {
          width: 30%;
          color: @bcColor;
          font: 400 1.6rem "微软雅黑";
          text-align: center;
          border-right: .1rem solid @borderColor;
          &:last-child {
            border: none;
          }
          .list-num {
            width: 100%;
            display: inline-block;
            &:first-child {
              font-size: 2rem;
            }
          }
        }
      }
    }
  }
  .userBookShelf {
    width: 100%;
    height: auto;
    .ubTitle {
      width: calc(100% - 4rem);
      height: 2.8rem;
      display: inline-block;
      font: 400 1.8rem "微软雅黑";
      border-bottom: .1rem solid @borderColor;
      &::before {
        content: '';
        display: inline-block;
        width: .3rem;
        height: 1.6rem;
        margin-right: 1rem;
        vertical-align: text-bottom;
        background-color: @bcColor;
      }
    }
    .ub-modify {
      width: 2rem;
      height: 2rem;
      display: inline-block;
      background: url('../../../assets/修改.svg') no-repeat center;
      background-size: 1.5rem 1.5rem;
      vertical-align: text-bottom;
    }
    .ub-container {
      width: 100%;
      height: auto;
      .ub-remind {
        width: 100%;
        display: inline-block;
        text-align: center;
        font: 400 1.6rem "微软雅黑";
        color: @remindColor;
        padding: 1rem 0 2rem 0;
      }
      .ub-container {
        list-style: none;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 2rem 0;
        .ub-li {
          width: 25%;
          height: auto;
          padding: 0 1rem 0 2rem;
          position: relative;
          .ub-img {
            width: 100%;
            height: auto;
          }
          .ub-name {
            width: 100%;
            display: inline-block;
            font: 400 1.2rem "微软雅黑";
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
          }
          .ub-del {
            width: 2rem;
            height: 2rem;
            display: block;
            background: url('../../../assets/删除.svg') no-repeat center;
            background-size: 2rem;
            position: absolute;
            top: -1rem;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
