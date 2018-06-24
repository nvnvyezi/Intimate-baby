<template>
  <div v-show="showMusicBox" class="musicPlayer">
    <div v-show="showTime" class="mus--time">
      <div class="mus--progressBar"></div>
      <div class="mus--time--current">{{ currentTime }}</div>
      <div class="mus--time--total">{{ currentTotalTime }}</div>
    </div>
    <section v-show="showTime" class="mus--photo" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></section>
    <section v-show="showTime" class="lyric">{{ lyric }}</section>
    <section v-show="musicSwitch" class="mus--switch" @click="showMusic"></section>
    <div v-show="musicSwitch" class="mus--container">
      <header class="mus--con--name">{{ musicName }}</header>
      <div class="mus--con--info" @click="playMode" :class="{mode1: modeIndex == 0, mode2: modeIndex == 1, mode3: modeIndex == 2}">
        <!-- <div class="mus--con--info--name"></div>
        <div class="mus--con--info--artist"></div>
        <div class="mus--con--info--album"></div> -->
      </div>
      <div class="mus--con--controls">
        <div @click="previousMusic" class="mus--con--cont--previous"></div>
        <div @click="playStatus" :class="{'mus--con--cont--play': playControl, 'mus--con--cont--stop': !playControl}"></div>
        <div @click="nextMusic" class="mus--con--cont--next"></div>
      </div>
      <audio id="audio" @ended="nextMusic" @canplay="changeTime" @timeupdate="playTime"><source :src="musicUrl" type=""></audio>
    </div>
  </div>
</template>

<script>
import { musiclist, song, musicLyric } from "../../../api/api";
import base64 from '../../../encryption/base64'
export default {
  name: 'musicPlayer',
  props: {
    musicSwitch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      playControl: true,
      firstCome: true,
      musicList: [],
      musicName: '',
      musicUrl: '',
      imgUrl: '',
      currentTime: this.timeCovert(0), //当前歌曲播放的时间
      currentTotalTime: this.timeCovert(0), //当前歌曲的总时间
      currenxIndex: 0,
      modeIndex: 0,
      // musicSwitch: false,
      musicLyric: '',
      lyric: '',
      lyricIndex: 0,
      showTime: false,
      showMusicBox: true
    }
  },
  methods: {
    timeCovert (timeStamp) {
      let min = Math.floor(timeStamp / 60);
      let sec = Math.floor(timeStamp - min * 60);
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      timeStamp = `${min} : ${sec}`;
      return timeStamp;
    },
    showMusic () {
      this.$emit('showMusic');
    },
    trackInfo (i) {
      this.musicName = this.musicList[i].name;
      this.musicUrl = this.musicList[i].src;
      this.imgUrl = this.musicList[i].imgUrl;
      musicLyric(this.musicList[i].mid, data => {
        let b = new base64();
        data = b.decode(data);
        data = data.replace(/[\r\n]/g,"");
        data = data.replace(/\[/g, ']');
        this.musicLyric = data.split(']');
      })
    },
    changeTime () {
      let audio = document.getElementById('audio');
      this.currentTotalTime = this.timeCovert(audio.duration);
    },
    playStatus () {
      let audio = document.getElementById('audio');
      if (this.playControl) {
        if (this.firstCome) {
          this.firstCome = false;
          audio.load();
        }
        audio.play();
      } else {
        audio.pause();
      }
      this.playControl = !this.playControl;
    },
    playTime () {
      let i = document.getElementById('audio').currentTime;
      this.currentTime = this.timeCovert(i);
      let bar = document.getElementsByClassName('mus--progressBar')[0];
      bar.style.width = `${i / audio.duration * 100}%`;
    },
    previousMusic () {
      this.lyricIndex = 0;
      let audio = document.getElementById('audio');
      if (this.modeIndex == 0) {        
        audio.loop = false;
        if (this.currenxIndex <= 0) {
          this.currenxIndex = this.musicList.length - 1;
          audio.childNodes[0].src = null;
          this.trackInfo(this.currenxIndex);
          audio.load();
          if (!this.playControl) {
            audio.play();
          }
        } else {
          audio.childNodes[0].src = null;
          this.trackInfo(--this.currenxIndex);
          audio.load();
          if (!this.playControl) {
            audio.play();
          }
        }
      }
      if (this.modeIndex == 1) {
        let i = Math.floor(Math.random() * (this.musicList.length));
        while (i == this.currenxIndex) {
          i = Math.floor(Math.random() * (this.musicList.length));
        }
        this.currenxIndex = i;
        audio.childNodes[0].src = null;
        this.trackInfo(i);
        audio.load();
        if (!this.playControl) {
          audio.play();
        }
      }
      if (this.modeIndex == 2) {
        audio.loop = 'loop';
        if (!this.playControl) {
          audio.play();
        }
      }
    },
    nextMusic () {
      this.lyricIndex = 0;
      let audio = document.getElementById('audio');
      if (this.modeIndex == 0) {        
        audio.loop = false;
        if (this.currenxIndex >= this.musicList.length - 1) {
          this.currenxIndex = 0;
          audio.childNodes[0].src = null;
          this.trackInfo(this.currenxIndex);
          audio.load();
          if (!this.playControl) {
            audio.play();
          }
        } else {
          audio.childNodes[0].src = null;
          this.trackInfo(++this.currenxIndex);
          audio.load();
          if (!this.playControl) {
            audio.play();
          }
        }
      }
      if (this.modeIndex == 1) {
        let i = Math.floor(Math.random() * (this.musicList.length));
        while (i == this.currenxIndex) {
          i = Math.floor(Math.random() * (this.musicList.length));
        }
        this.currenxIndex = i;
        audio.childNodes[0].src = null;
        this.trackInfo(i);
        audio.load();
        if (!this.playControl) {
          audio.play();
        }
      }
      if (this.modeIndex == 2) {
        audio.loop = 'loop';
        if (!this.playControl) {
          audio.play();
        }
      }
    },
    playMode () {
      if (this.modeIndex >=2) {
        this.modeIndex = 0;
      } else {
        this.modeIndex++;
      }
    }
  },
  mounted () {
    musiclist((data) => {
      let obj = data.result;
      for (let i = 0, len = obj.length; i < len; i++) {
        song(obj[i].mid, (data) => {
          obj[i].imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj[i].albummid}.jpg?max_age=2592000`;
          obj[i].src = `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=652943595&uin=0&fromtag=66`;
          if (i == len -1) {
            this.musicList = obj;
            this.trackInfo(this.currenxIndex);
          }
        })
      }
    })
  },
  watch: {
    currentTime () {
      for (let i = this.lyricIndex, len = this.musicLyric.length; i < len; i++) {
        // console.log(this.musicLyric[i], this.currentTime.replace(/ /g, ''));
        if (this.musicLyric[i].indexOf(this.currentTime.replace(/ /g, '')) != -1) {
          // console.log(this.musicLyric[i + 1], this.musicLyric[i + 1] != '')
          if (this.musicLyric[i + 1] != '') {
            this.lyric = this.musicLyric[i + 1];
          }
          this.lyricIndex = i + 1;
          // break;
        }
      }
    },
    playControl (flag) {
      this.showTime = !this.showTime;
    },
    '$route': function (to) {
      if (to.path == '/bookChapter') {
        this.showMusicBox = false;
      } else {
        this.showMusicBox = true;
      }
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
  .playG {
    width: 2.5rem;
    height: 2.5rem;
    background-size: 100%;
  }
  .mode1 {
    background: url('../../../assets/顺序.svg') no-repeat center;
  }
  .mode2 {
    background: url('../../../assets/随机.svg') no-repeat center;
  }
  .mode3 {
    background: url('../../../assets/单曲循环.svg') no-repeat center;
  }
  .musicPlayer {
    width: 100vw;
    // height: 8rem;
    display: flex;
    align-items: center;
    position: relative;
    .mus--photo {
      width: 4rem;
      height: 4rem;
      position: fixed;
      top: 0;
      left: 0;
      background: no-repeat center;
      background-size: 4rem 4rem;
      z-index: 3002;
    }
    .mus--switch {
      width: 2rem;
      height: 3.5rem;
      position: fixed;
      left: 2rem;
      bottom: 4rem;
      z-index: 3002;
      background: url('../../../assets/音乐.svg') no-repeat center bottom;
      background-size: 2rem 2.5rem;
    }
    .lyric {
      width: 100%;
      position: fixed;
      top: 4.5rem;
      left: 0rem;
      height: 2rem;
      color: #333;
      font-size: 1.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      z-index: 3002;
    }
    .mus--time {
      width: calc(100% - 4rem);
      position: fixed;
      top: 0;
      left: 4rem;
      z-index: 3002;
      color: #333;
      .mus--time--current {
        width: 44/12rem;
        height: 1rem;
        font-size: 1rem;
        float: left;
        transform: scale3d(.8,.8,.8);
      }
      .mus--progressBar {
        width: 0;
        height: 0.5rem;
        opacity: .4;
        background-image: linear-gradient(to right, rgb(94, 255, 0), rgb(203, 8, 252));
      }
      .mus--time--total {
        width: 44/12rem;
        height: 1rem;
        font-size: 1rem;
        transform: scale3d(.8,.8,.8);
        float: right;
      }
      &:after {
        content: '';
        clear: both;
      }
    }
    .mus--container {
      width: 20rem;
      height: 8rem;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 3002;
      margin-left: -10rem;
      margin-top: -4rem;
      background-color: rgb(240, 240, 240);
      border-radius: 8/12rem;
      .mus--con--name {
        position: relative;
        top: .2rem;
        height: 1.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font: 600 1.5rem "微软雅黑",arial,verdana;
        letter-spacing: .1rem;
        color: rgb(119, 116, 116);
      }
      .mus--con--info {
        width: 3rem;
        height: 1.7rem;
        position: absolute;
        top: .3rem;
        right: .3rem;
        background-size: 100% 1.7rem;
      }
      .mus--con--controls {
        height: calc(100% - 1.5rem);
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .mus--con--cont--play {
          .playG;
          background: url('../../../assets/播放.svg') no-repeat center;
        }
        .mus--con--cont--stop {
          .playG;
          background: url('../../../assets/暂停.svg') no-repeat center;
        }
        .mus--con--cont--previous {
          .playG;
          background: url('../../../assets/previous.svg') no-repeat center;
        }
        .mus--con--cont--next {
          .playG;
          transform: rotate(180deg);
          background: url('../../../assets/previous.svg') no-repeat center;
        }
      }
    }
  }
}
</style>