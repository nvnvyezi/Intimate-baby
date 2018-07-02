<template>
  <div class="mvplay">
    <section class="mp-video">
      <video @click="showControl" id="vp" width="100%" height="auto" @ended="changeStatus" @timeupdate="changeTime" playsinline preload src="http://hd.yinyuetai.com/uploads/videos/common/0E1D0163C19538CC7B7E38585CBC9850.mp4"></video>
      <section v-show="iconJ" @click="play" class="iconStop"></section>
      <section class="mp-control" v-show="controlJ">
        <div @click="play" :class="{'c-play': playJ, 'c-stop': !playJ}"></div>
        <div class="c-progress" @click="changePosition">
          <div class="p-play"></div>
        </div>
        <div class="c-tag">
          <div class="c-volume" @click.stop="showVolume">
            <div v-show="volumeJ" class="cv-control" @click="changeVolume"><div class="cv-adjust"></div></div>
          </div>
          <div class="c-barrage"></div>
          <div class="c-screen" @click="changeScreen"></div>
        </div>
      </section>
    </section>
    <section class="mp-name">{{mvName}}</section>
    <section class="mp-btns"><button class="mt-btn">点击下载</button><a class="a" href="http://www.mvmpg.com/"><button class="mt-btn">1080p高清版卡拉ok歌曲迅雷下载</button></a></section>
    <section class="mp-info">
      <h3 class="mi-title">高清MV视频介绍: </h3>
      <p class="mi-text">{{text}}</p><p class="mi-text" v-show="text1 != ''">{{text1}}</p>
    </section>
    <section class="mp-tags">
      <h3 class="mt-title">MV 详情</h3>
      <div class="mt-tag">
        <div class="t1"><span class="t-1">所属分类: </span>{{tag}}</div>
        <div class="t1"><span class="t-1">标签: </span>{{tag1}}</div>
        <div class="t1"><span class="t-1">下一段MV: </span>{{tag2}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { musicMvPlay } from "../api/api";
export default {
  name: 'musicMvPlay',
  data () {
    return {
      text: '',
      text1: '',
      tag: '',
      tag1: '',
      tag2: '',
      url: '',
      playJ: true,
      duration: 0,
      volumeJ: false,
      controlJ:false,
      iconJ: true
    }
  },
  computed: {
    mvName () {
      let name = localStorage['mvName'];
      if (!name) {
        return this.$store.state.mv.mvName;
      }
      this.$store.commit('changeMvName', name);
      return name;
    },
    mvUrl () {
      let url = localStorage['mvUrl'];
      if (!url) {
        return this.$store.state.mv.mvUrl;
      }
      this.$store.commit('changeMvName', url);
      return url;
    },
    // iconJ: {
    //   get: function () {
    //     try {
    //       let video = document.getElementById('vp');
    //       if (video.paused) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } catch (error) {
    //       return true;
    //     }
    //   }
    // }
  },
  mounted () {
    this.getMvPlay();
  },
  methods: {
    getMvPlay () {
      musicMvPlay(this.mvUrl, res => {
        console.log(res)
        if (!res.err) {
          let start = res.url.indexOf('showVideo("') + 11;
          let end = res.url.indexOf('","http://imgcdn');
          let url = res.url.slice(start, end);
          this.url = res.url;
          this.tag = res.tag;
          this.tag1 = res.tag1;
          this.tag2 = res.tag2;
          this.text = res.text;
          this.text1 = res.text1;
        }
        this.$toast(res.data);
      })
    },
    showControl () {
      this.controlJ = !this.controlJ;
    },
    play () {
      let video = document.getElementById('vp');
      if (this.playJ) {
        video.play();
        this.duration = video.duration;
      } else {
        video.pause();
      }
      this.iconJ = !this.iconJ;
      this.playJ = !this.playJ;
    },
    changeTime (e) {
      let video = document.getElementById('vp');
      let progress = document.getElementsByClassName('p-play')[0];
      progress.style.width = `${video.currentTime / this.duration * 100}%`;
    },
    changePosition (e) {
      let progress = document.getElementsByClassName('p-play')[0];
      let pw = document.getElementsByClassName('c-progress')[0].offsetWidth;
      let video = document.getElementById('vp');
      if (this.playJ) {
        this.duration = video.duration;
        video.play();
        this.iconJ = false;
        this.playJ = !this.playJ;
      }
      let x = e.clientX;
      let posi = `${(x - 38) / pw}` * this.duration;
      video.currentTime = posi;
      progress.style.width = `${(x - 38) / pw * 100}%`;
    },
    changeVolume (e) {
      let video = document.getElementById('vp');
      let sy = document.getElementsByClassName('mp-video')[0].getBoundingClientRect().top;
      let adjust = document.getElementsByClassName('mp-control')[0].offsetTop - 121;
      let h = document.getElementsByClassName('cv-control')[0].offsetHeight;
      let sh = document.getElementsByClassName('cv-adjust')[0];
      let y = e.clientY;
      sh.style.height = `${(100 - (y-sy-adjust) / h * 100)}%`;
      video.volume = 1 - (y-sy-adjust) / h;
    },
    showVolume () {
      this.volumeJ = !this.volumeJ;
    },
    changeStatus () {
      this.playJ = !this.playJ;
      this.iconJ = !this.iconJ;
    },
    launchFullScreen (element) { 
      if(element.requestFullscreen) { 
        element.requestFullscreen(); 
      } else if(element.mozRequestFullScreen) { 
        element.mozRequestFullScreen(); 
      } else if(element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen(); 
      } else if(element.msRequestFullscreen) { 
        element.msRequestFullscreen(); 
      } 
    },
    changeScreen () {
      let video = document.getElementById('vp');
      this.launchFullScreen(video)
    }
  }
}
</script>

<style lang="less" scoped>
.iconG {
  width: 2rem;
  height: 2rem;
}
.titleG {
  width: 100%;
  display: inline-block;
  font: 600 1.4rem "微软雅黑";
  color: rgb(59, 58, 58);
  padding: 1.5rem 0 1rem;
  &::before {
    content: '';
    width: .4rem;
    height: 1.2rem;
    background: red;
    margin-right: .5rem;
    display: inline-block;
  }
}
.mvplay {
  width: 100%;
  height: auto;
  background: #eee;
  overflow-x: hidden;
  .mp-video {
    width: 100%;
    height: auto;
    // margin: 2rem 0;
    position: relative;
    line-height: 0;
    .iconStop {
      width: 4rem;
      height: 4rem;
      position: absolute;
      top: 50%;
      margin-top: -2rem;
      left: 50%;
      margin-left: -2rem;
      opacity: .9;
      background: url('../assets/播放1.svg') no-repeat center;
      background-size: 100%;
    }
    .mp-control {
      width: 100%;
      height: auto;
      position: absolute;
      margin: 0 0 .7rem 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      // align-content: flex-end;
      .c-play {
        .iconG;
        background: url('../assets/videoPlay.svg') no-repeat center;
        background-size: 1.8rem;
        margin-left: .5rem;
      }
      .c-stop {
        .iconG;
        background: url('../assets/videoStop.svg') no-repeat center;
        background-size: 1.8rem;
        margin-left: .5rem;
      }
      .c-progress {
        width: calc(100% - 12rem);
        height: .5rem;
        margin-top: .8rem;
        opacity: .9;
        background-color: aliceblue;
        .p-play {
          width: 0;
          height: 100%;
          opacity: 1;
          background-image: linear-gradient(to right, red, yellow);
        }
      }
      .c-tag {
        width: 8rem;
        height: auto;
        display: flex;
        justify-content: space-around;
        .c-volume {
          display: inline-block;
          .iconG;
          background: url('../assets/音量调节.svg') no-repeat center;
          background-size: 1.6rem;
          position: relative;
          .cv-control {
            width: 1.6rem;
            height: 10rem;
            position: absolute;
            bottom: 2.2rem;
            left: 0.25rem;
            opacity: .7;
            background: white;
            .cv-adjust {
              width: 100%;
              height: 100%;
              position: absolute;
              bottom: 0;
              background: rgb(105, 105, 105);
            }
          }
        }
        .c-barrage {
          display: inline-block;
          .iconG;
          background: url('../assets/弹幕.svg') no-repeat center;
          background-size: 1.6rem;
        }
        .c-screen {
          display: inline-block;
          .iconG;
          background: url('../assets/全屏.svg') no-repeat center;
          background-size: 1.4rem;
        }
      }
    }
  }
  .mp-name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font: 500 1.8rem "微软雅黑";
    color: #333;
    text-align: left;
    padding: 1rem 0 1.4rem .5rem;
  }
  .mp-btns {
    width: 100%;
    padding-bottom: 2.5rem;
    border-bottom: .2rem solid white;
    .mt-btn {
      border: none;
      padding: .5rem 2rem; 
      margin-left: 1rem;
      font: 600 1.3rem "微软雅黑";
      color: rgb(8, 182, 235);
      outline: none;
      .a {
        text-decoration: none;
        color: rgb(15, 181, 231);
      }
    }
  }
  .mp-info {
    width: 100%;
    .mi-title {
      .titleG;
    }
    .mi-text {
      width: 95%;
      margin: 0 auto;
      white-space: pre-wrap;
      letter-spacing: .1rem;
      font: 400 1.2rem "微软雅黑";
      color: rgb(114, 111, 111);
    }
  }
  .mp-tags {
    width: 100%;
    height: auto;
    padding-bottom: 1rem;
    .mt-title {
      .titleG;
    }
    .mt-tag {
      width: 90%;
      margin: 0 auto;
      color: rgb(131, 130, 130);
      .t1 {
        margin-top: 1rem;
        .t-1 {
          padding: .6rem 1rem .3rem;
          margin-right: 1rem;
          background: rgb(247, 244, 244);
        }
      }
    }
  }
}
</style>
