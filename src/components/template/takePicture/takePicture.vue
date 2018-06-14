<template>
  <div class="picture">
    <video id="videoPicture" autoplay muted></video>
    <canvas id="canvasPicture" width="200px" height="150px"></canvas>
    <div>
      <button @click="start">打开</button>
      <button @click="snap">截取</button>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'takePicture',
  data () {
    return {
      MediaStreamTrack: null
    }
  },
  methods: {
    start () {
      //MediaDevices.getUserMedia() 在用户通过提示允许的情况下，打开系统上的相机或屏幕共享和/或麦克风，并提供 MediaStream 包含视频轨道和/或音频轨道的输入。
      let video = document.getElementById('videoPicture');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constrains = {
          video: true,
          audio: false
        }
        navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
          console.log(stream, stream.stop);
          this.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
          console.log(HTMLMediaElement)
          video.src=(window.URL).createObjectURL(stream);
          video.play();
        })
      } else if(navigator.getMedia){
        navigator.getMedia({
          video: true
        }).then(function (stream) {
          MediaStreamTrack=stream.getTracks()[1];
          video.src=(window.webkitURL).createObjectURL(stream);
          video.play();
        }).catch(function(err){
          console.log(err);
        });
      }
    },
    snap () {
      let canvas = document.getElementById('canvasPicture');
      let video = document.getElementById('videoPicture');
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 200, 150);
    },
    close () {
      this.MediaStreamTrack && this.MediaStreamTrack.stop();
    }
  }
}
</script>

<style lang="less" scoped>
.picture {
  width: 100%;
  height: auto;
  #picture {
    width: 200px;
    height: 200px;
  }
}
</style>
