<template>
  <div class="user-change">
    <div v-show="pJ" class="mask"></div>
    <transition>
      <photo v-show="pJ" @showP='showP' @replaceP="replaceP" :img="userData.img"></photo>
    </transition>
    <div class="uc-con">
      <header class="c-header"><h2 class="c-h">基本资料</h2></header>
      <div class="c-con">
        <section class="c-img">
          <img class="ci" :src="userData.img" alt="" />
          <span @click="showP" class="c-icon"><i class="i-i"></i></span>
        </section>
        <form action="" class="c-form">
          <div class="cf-box">
            <label for="nickname" class="c-label">昵称</label>
            <input type="text" class="c-input" name="nickname" id="nickname" disabled :value="userData.id">
          </div>
          <div class="cf-box">
            <label for="nickname" class="c-label">设置密码</label>
            <span>设置密码</span>
          </div>
          <div class="cf-box">
            <label for="nickname" class="c-label">简介</label>
            <input type="text" class="c-input" name="intro" id="intro" :value="userData.info">
          </div>
          <div class="cf-box">
            <label for="nickname" class="c-label">性别</label>
            <select name="gender" id="gender" class="c-sel">
              <option selected>-请选择-</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
          <div class="cf-box">
            <label for="nickname" class="c-label">性别</label>
            <select name="day" id="day" class="c-sel">
              <option selected>日</option>
              <option :value="item" v-for="(item, index) in day" :key="index">{{item}}</option>
            </select>
            <select name="month" id="month" class="c-sel" @change="getDate">
              <option>月</option>
              <option :value="item" v-for="(item, index) in month" :key="index" v-if="item === 1" selected>{{item}}</option>
              <option :value="item" v-for="(item, index) in month" :key="index" v-if="item !== 1">{{item}}</option>
            </select>
            <select name="year" id="year" class="c-sel" @change="getDate">
              <option selected>年</option>
              <option :value="item" v-for="(item, index) in year" :key="index" v-if="item === 1998" selected>{{item}}</option>
              <option :value="item" v-for="(item, index) in year" :key="index" v-if="item !== 1998">{{item}}</option>
            </select>
          </div>
        </form>
        <div class="c-btn">
          <button @click="upload" class="f-btn">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import work from 'webworkify-webpack';
import photo from "./userChangePhoto";
export default {
  components: {
    photo
  },
  name: 'userChange',
  data () {
    return {
      userData: JSON.parse(sessionStorage['userData']),
      day: [],
      pJ: false
    }
  },
  computed: {
    year () {
      let arr = [];
      let year = new Date().getFullYear();
      for (let i = year; i >= 1918; i--) {
        arr.push(i);
      }
      return arr;
    },
    month () {
      let arr = [];
      for (let i = 1; i < 13; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    getDate () {
      let year = document.getElementById('year').value;
      let month = document.getElementById('month').value;
      let day = document.getElementById('day').value;
      let that = this;
      if (year == '年' || month == '月') {
        return ;
      }
      const action = [{message: 'day', func: (year, month) => new Date(year, month, 0).getDate()}]
      let worker = this.$worker.create(action);
      worker.postMessage('day', [year, month]).then((data) => {
        this.day = [];
        for (let i = 1; i <= data; i++) {
          this.$set(this.day, i-1, i);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    upload () {
      let img = document.getElementsByClassName('ci')[0];
      let nickname = document.getElementById('nickname').value;
      let intro = document.getElementById('intro').value;
      let gender = document.getElementById('gender').value;
      let day = document.getElementById('day').value;
      let month = document.getElementById('month').value;
      let year = document.getElementById('year').value;
      let formData = new FormData();
      if (!img.src.includes('http://193.112.4.143')) {
        let data = img.src;
        data = data.split(',')[1];
        data = window.atob(data);
        let ia = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
        }
        img = new Blob([ia], {type: 'image/png'});
        formData.append('img', img, this.userData.id);
      } else {
        img = img.src;
        formData.append('img', img);
      }
      // console.log(intro, gender, day, month, year)
      let xhr = new XMLHttpRequest();
      formData.append('intro', intro);
      formData.append('nickname', nickname);
      if (gender == 'male' || gender == 'female') {
        formData.append('gender', gender);  
      }
      if (day !== '日' && month !== '月' && year !== '年') {
        formData.append('day', day);
        formData.append('month', month);
        formData.append('year', year);
      }
      xhr.open('post', `http://${window.location.hostname}:3001/upload`);
      xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          this.$toast(JSON.parse(xhr.response).data);
        } else {
          this.$toast('请求错误');
        }
      }
      xhr.withCredentials = true;
      xhr.send(formData);
    },
    replaceP (uri) {
      this.userData.img = uri;
    },
    showP () {
      let body = document.getElementsByTagName('body')[0];
      if (!this.pJ) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'visible';
      }
      this.pJ = !this.pJ;
    }
  },
  mounted () {
    this.getDate();
  }
}
</script>

<style lang="less" scoped>
@worldC: #999;
@bgColor: #14B9C8;
.user-change {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  padding-bottom: 3rem;
  position: relative;
  overflow-x: hidden;
  .mask {
    width: 100vw;
    height: calc(100vh - 4rem);
    background: rgb(2, 2, 2);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: .6;
  }
  .uc-con {
    width: 90%;
    height: auto;
    margin: 1rem auto;
    background-color: #ffffff;
    border-radius: 5px;
    overflow-x: hidden;
    .c-header {
      width: 100%;
      background-color: #fafafa;
      padding: 1.3rem 0 1.2rem 2rem;
      border-bottom: 1px solid #eee;
      .c-h {
        font: 400 1.8rem/1.8rem "微软雅黑";
      }
    }
    .c-con {
      width: 100%;
      height: auto;
      padding: 4rem 0;
      .c-img {
        width: 100%;
        height: auto;
        position: relative;
        display: flex;
        justify-content: center;
        .ci {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
          border: 3px solid #fff;
        }
        .c-icon {
          width: 50px;
          height: 50px;
          display: block;
          border-radius: 50%;
          background: rgba(0,0,0,.5);
          position: absolute;
          left: 50%;
          top: 50%;
          margin: -23px 0 0 -23px;
          opacity: .9;
          .i-i {
            width: 50px;
            height: 50px;
            display: block;
            background: url('../assets/照相机.svg') no-repeat center;
            background-size: 30px;
          }
        }
      }
      .c-form {
        width: 100%;
        height: auto;
        display: block;
        padding: 4rem 0;
        label {
          display: block;
        }
      }
      .cf-box {
        width: 90%;
        height: auto;
        margin: 0 auto;
        padding: 1rem 0;
        .c-label {
          width: 100%;
          display: inline-block;
          font: 400 1.3rem/2.4rem "微软雅黑";
          max-width: 100%;
          color: @worldC;
          display: inline-block;
        }
        .c-input {
          width: 95%;
          height: auto;
          padding: .2rem .8rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          // border: none;
          border-color: #ddd;
          background: #fafafa;
          outline: none;
        }
        .c-sel {
          min-width: 70px;
          padding: 2px 6px;
          height: 26px;
          border-color: #ddd;
          background: #fafafa;
        }
      }
      .c-btn {
        width: 90%;
        height: auto;
        margin: 0 auto;
        .f-btn {
          padding: 6px 20px;
          border: none;
          background: @bgColor;
          color: white;
          border-radius: 5px;
          font: 400 1.4rem/20px "微软雅黑";
        }
      }
    }
  }
}
</style>
