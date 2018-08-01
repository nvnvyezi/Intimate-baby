<template>
  <div class="uc-photo">
    <header class="p-header">
      <section v-if="uploadJ" class="p-con">
        <img class="p-img" :src="img" alt="" />
      </section>
      <section v-else class="p-upload" @click="movePhoto">
        <div class="u-cat"></div>
      </section>
      <section class="h-btn">
        <label class="b-style">上传头像
          <input type="file" accept="image/*" id="img" @change="uplodePhoto" class="b-btn">
        </label>
      </section>
    </header>
    <!-- <canvas id="canvas"></canvas> -->
    <div class="p-main">
      <h3 class="m-title">推荐头像</h3>
      <section class="m-con">
        <div class="page" v-show="flag == true">
          <ul class="m-ul">
            <li @click="replaceP" class="m-li" v-for="(item, index) in imgArr" :key="index" v-if="index < 20" :data-img="item">
              <img class="m-icon" :src="item" alt="">
            </li>
          </ul>
        </div>
        <div class="page" v-show="flag == false">
          <ul class="m-ul">
            <li @click="replaceP" class="m-li" v-for="(item, index) in imgArr" :key="index" v-if="index >= 20" :data-img="item">
              <img class="m-icon" :src="item" alt="">
            </li>
          </ul>
        </div>
        <footer class="previousPage"><span @click="switchPage" class="pp">{{!flag ? 1 : 2}}</span></footer>
      </section>
    </div>
    <div class="p-btn">
      <button class="btn" @click="showP">确定</button>
      <button class="btn" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userChangePhoto',
  props: {
    img: {
      type: String,
      default: 'http://193.112.4.143/img/default.png'
    }
  },
  data () {
    return {
      flag: true,
      uploadJ: true,
      addBind: true,
      imgg: null,
      originW: 0,
      originH: 0
    }
  },
  computed: {
    imgArr () {
      let arr = [];
      for (let i = 1; i <= 40; i++) {
        arr.push(`http://193.112.4.143/img/${i}.jpg`);
      }
      return arr;
    }
  },
  created () {
    this.defaultImg = this.img;
  },
  methods: {
    movePhoto (e) {
    },
    switchPage () {
      this.flag = !this.flag;
    },
    replaceP (e) {
      if (!this.uploadJ) {       
        let upload = document.getElementsByClassName('p-upload')[0];
        upload.style.backgroundImage = `url()`;
      }
      this.uploadJ = true;
      let img = e.currentTarget.getAttribute('data-img');
      this.$emit('replaceP', img);
    },
    showP () {
      if (!this.uploadJ) {
        let pupload = document.getElementsByClassName('p-upload')[0];
        let pX = parseInt(window.getComputedStyle(pupload, null)['backgroundPositionX']);
        let pY = parseInt(window.getComputedStyle(pupload, null)['backgroundPositionY']);
        let canvas = document.createElement('canvas');
        // let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let offsetX = Math.floor((pX / pupload.offsetWidth) * this.originW);
        let offsetW = Math.floor((140 / pupload.offsetWidth) * this.originW);
        let offsetY = Math.floor((pY / 182) * this.originH);
        let oX = Math.floor((((pupload.offsetWidth / 2) - 70) / pupload.offsetWidth * this.originW));
        let oY = Math.floor((((182 / 2) - 70) / 182 * this.originW));
        canvas.width = 140;
        canvas.height = 140;
        ctx.drawImage(this.imgg, -offsetX + oX , -offsetY + oY, offsetW, offsetW, 0, 0, 140, 140);
        let data = canvas.toDataURL('image/jpeg', 0.92);
        console.log(data)
        this.$emit('replaceP', data);
        // pupload.appendChild(canvas);
      }
      this.$emit('showP');
    },
    cancel () {
      this.$emit('replaceP', this.defaultImg);
      this.$emit('showP');
    },
    start (e) {
      let ucphoto = document.getElementsByClassName('uc-photo')[0];
      let pupload = document.getElementsByClassName('p-upload')[0];
      let pX = parseInt(window.getComputedStyle(pupload, null)['backgroundPositionX']);
      let pY = parseInt(window.getComputedStyle(pupload, null)['backgroundPositionY']);
      this.sX = pX;
      this.sY = pY;
      this.startX = e.targetTouches[0].clientX;
      this.startY = e.targetTouches[0].clientY;
      ucphoto.style.overflowY = 'hidden';
      
    },
    move (e) {
      let pupload = document.getElementsByClassName('p-upload')[0];
      let moveX = e.changedTouches[0].clientX;
      let moveY = e.changedTouches[0].clientY;
      let disX = moveX - this.startX + this.sX;
      let disY = moveY - this.startY + this.sY;
      let edgeL = Math.ceil(pupload.offsetWidth / 2 - 70);
      let edgeT = Math.ceil(pupload.offsetHeight / 2 - 70);
      // console.log(disX, disY, edgeL, edgeT);
      // if (edgeL >= Math.abs(disX) && edgeT >= Math.abs(disY)) {
        let upload = document.getElementsByClassName('p-upload')[0];
        upload.style.backgroundPosition = `${disX}px ${disY}px`;
      // }
    },
    end (e) {
      let ucphoto = document.getElementsByClassName('uc-photo')[0];
      let upload = document.getElementsByClassName('p-upload')[0];
      ucphoto.style.overflowY = 'visible';
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;
      let edgeL = Math.ceil(upload.offsetWidth / 2 - 70);
      let edgeR = Math.ceil(upload.offsetWidth / 2 + 70);
      let edgeT = Math.ceil(upload.offsetHeight / 2 - 70);
      let edgeB = Math.ceil(upload.offsetHeight / 2 + 70);
      let disX = endX - this.startX + this.sX;
      let disY = endY - this.startY + this.sY;
      // console.log(disX, disY)
      // if (Math.abs(disX) >= edgeL && disX < 0) {
      //   upload.style.backgroundPosition = `${edgeR}px ${disY}px`;
      // } else if (Math.abs(disX) >= edgeL && disX > 0) {
      //   upload.style.backgroundPosition = `${edgeL}px ${disY}px`;
      // } else {
      //   upload.style.backgroundPosition = `${disX}px ${disY}px`;
      // }
      // if (Math.abs(disY) >= edgeT && disY < 0) {
      //   upload.style.backgroundPosition = `${edgeR}px ${edgeB}px`;
      // } else if (Math.abs(disY) >= edgeT && disY > 0) {
      //   upload.style.backgroundPosition = `${edgeL}px ${edgeT}px`;
      // } else {
      //   upload.style.backgroundPosition = `${disX}px ${disY}px`;
      // }
    },
    uplodePhoto () {
      this.uploadJ = false;
      let files = document.getElementsByClassName('b-btn')[0].files;
      let type = files[0].type;
      let name = files[0].name;
      if (window.fileReader && window.File && window.FileList && window.Blob) {
        this.$toast('你的手机不支持本地上传');
        return ;
      }
      let reader = new FileReader();
      // console.log(reader)
      // 开始读取时触发
      reader.onloadstart = (data) => {
        // this.$toast('上传');
      }
      // 读取成功时触发
      reader.onload = (e) => {
        let upload = document.getElementsByClassName('p-upload')[0];
        upload.style.backgroundImage = `url(${e.target.result})`;
        if (this.addBind) {
          this.addBind = false;
          upload.addEventListener('touchstart', this.start, false);
          upload.addEventListener('touchmove', this.move, false);
          upload.addEventListener('touchend', this.end, false);
        }
        let that = this;
        this.imgg = new Image();
        this.imgg.src = e.target.result;
        this.imgg.onload = function (e) {
          that.originW = this.width;
          that.originH = this.height;
        }
        this.$toast('上传成功');
      }
      // 读取出错
      reader.onerror = err => {
        this.$toast('读取出错');
        this.uploadJ = true;
      }
      // 读取中
      reader.onprogress = data => {
      }
      reader.readAsDataURL(files[0]);
    }
  }
}
</script>

<style lang="less" scoped>
.uc-photo {
  width: 90%;
  height: calc(100vh - 6rem);
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 2;
  background: white;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  .p-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .p-con {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      padding: 3rem 0 1.5rem;
      background: white;
      .p-img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
        border: 3px solid #fff;
      }
    }
    .p-upload {
      width: 100%;
      height: 182px;
      position: relative;
      overflow: hidden;
      // background: url('../assets/default.png') no-repeat;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 100% 182px;
      margin-bottom: 1.4rem;
      .u-cat {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        position: absolute;
        opacity: .5;
        top: 50%;
        left: 50%;
        margin: -370px 0 0 -370px;
        border: 300px solid rgb(0, 0, 0);
      }
    }
    .h-btn {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      padding: 0 0 2rem;
      .b-style {
        width: auto;
        height: auto;
        display: inline-block;
        position: relative;
        font: 400 1.4rem/1.6rem "微软雅黑";
        padding: 2px 6px;
        color: #14B9C8;
        border: 1px solid #14B9C8;
        border-radius: 3px;
        .b-btn {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
    }
  }
  .p-main {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fafafa;
    padding-bottom: 1rem;
    .m-title {
      width: 100%;
      height: auto;
      font: 200 1.35rem/2rem "微软雅黑";
      padding: 1rem 0rem 0 1rem;
      color: #999;
    }
    .m-con {
      width: 100%;
      height: auto;
      border: 1rem solid transparent;
      .page {
        padding: 0 0 1rem;
        .m-ul {
          .m-li {
            display: inline-block;
            list-style: none;
            padding: .3rem;
            .m-icon {
              width: 54px;
            }
          }
        }
      }
      .previousPage {
        width: 100%;
        text-align: center;
        .pp {
          background: #14B9C8;
          padding: .35rem .5rem;
          color: white;
          font: 400 1.4rem "微软雅黑";
          border-radius: 5px;
        }
      }
    }
  }
  .p-btn {
    width: 100%;
    height: auto;
    margin: 1.3rem 0;
    padding: .65rem 0 0;
    border-top: 1px solid rgb(233, 233, 233);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn {
      width: 90%;
      height: auto;
      padding: .5rem 0;
      margin: .5rem 0;
      border-radius: 5px;
      background: #14B9C8;
      border: none;
      color: white;
      font: 400 1.3rem "微软雅黑";
      &:last-child {
        color: #14B9C8;
        background: white;
        border: 1px solid #14B9C8;
      }
    }
  }
}
</style>
