<template>
  <div class="mv">
    <header class="mv-sort">
      <div class="mv-container">
        <select id="artist" class="ms-tag">
          <option class="t-o" value="all" selected>全部歌手</option>
          <option class="t-o" value="男歌手">男歌手</option>
          <option class="t-o" value="女歌手">女歌手</option>
          <option class="t-o" value="乐队组合">乐队组合</option>
        </select>
        <select id="version" class="ms-tag">
          <option value="all" selected="selected">全部分类</option>
          <option value="官方mv">官方MV</option>
          <option value="官方视频">官方视频</option>
          <option value="影视原声">影视原声</option>
          <option value="yugao">电影预告</option>
          <option value="电影主题曲">电影主题曲</option>
          <option value="模仿翻唱">模仿翻唱</option>
          <option value="舞蹈视频">舞蹈视频</option>
          <option value="音乐短片">音乐短片</option>
          <option value="字幕版">字幕版</option>
          <option value="歌词版">歌词版</option>
          <option value="完整版">完整版</option>
          <option value="现场版">现场版</option>
          <option value="演唱会">演唱会</option>
          <option value="动漫">动漫</option>
        </select>
        <select id="definition" class="ms-tag">
          <option value="all" selected="selected">全部视频</option>
          <option value="1080p">1080P</option>
          <option value="超清mv">超清MV</option>
          <option value="高清mv">高清MV</option>
          <option value="流畅mv">流畅MV</option>
        </select>
        <button class="ms-btn">确定</button>
      </div>
    </header>
    <div class="mv-container">
      <router-link to="mvplay" tag="section" class="mv-list" v-for="(item, index) in mvArr" :key="index" :data-name="item.name" :data-url="item.mvUrl" @click.native="mvPlay">
        <div class="mv-show"> 
          <div class="header">
            <div class="mv-img">
              <img class="img" src="" v-lazyLoad="item.imgUrl" :alt="item.name">
            </div>
          </div>
          <div class="update-time">
            <span class="u-name">{{ item.name }}</span>
            <span class="u-time"><time>{{ item.time }}</time></span>
            <span class="u-readers">{{ item.readers }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { musicMvList } from "../api/api";
export default {
  name: "musicMv",
  data() {
    return {
      mvArr: []
    };
  },
  mounted() {
    musicMvList(res => {
      if (!res.err) {
        this.mvArr = res.result;
      }
      this.$toast(res.data);
    });
  },
  methods: {
    mvPlay(e) {
      let url = e.currentTarget.getAttribute("data-url");
      let name = e.currentTarget.getAttribute("data-name");
      this.$store.commit("changeMvName", name);
      localStorage["mvName"] = name;
      this.$store.commit("changeMvUrl", url);
      localStorage["mvUrl"] = url;
    }
  }
};
</script>

<style lang="less" scoped>
.mv {
  width: 100%;
  height: auto;
  position: relative;
  background: #eee;
  .mv-sort {
    width: 96%;
    // height: 3rem;
    padding: 2rem 0;
    margin: 0 auto;
    .mv-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      .ms-tag {
        height: 3rem;
        border: none;
        font: 400 1.2rem "微软雅黑";
        margin-left: .5rem;
        outline: none;
        background-color: white;
        .t-o {
          height: 3rem;
        }
      }
      .ms-btn {
        height: 3rem;
        border: none;
        padding: 0 1rem;
        outline: none;
        background-color: white;
      }
    }
  }
  .mv-container {
    width: 100%;
    height: auto;
    display: flex;
    // margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .mv-list {
      width: 42%;
      height: auto;
      padding-bottom: 1rem;
      .mv-show {
        width: 100%;
        .header {
          width: 100%;
          height: auto;
          .mv-img {
            width: 100%;
            height: auto;
            .img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .update-time {
          width: 100%;
          height: auto;
          color: #999;
          text-align: left;
          .u-name {
            width: 100%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(78, 78, 78);
            font: 400 1.4rem "微软雅黑";
          }
          .u-time {
            height: 2rem;
            font: 400 1.3rem "微软雅黑";
            display: inline-block;
            &::before {
              content: "";
              display: inline-block;
              width: 2rem;
              height: 2rem;
              background: url("../assets/iconfont-日期.svg") no-repeat center
                left;
              background-size: 1.8rem 1.8rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>
