<template>
  <div class="box">
    <div class="shade"></div>
    <div class="form__box">
      <div class="img__box">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="input__box">
        <span>User Login</span>
        <!-- <section><i><img src="../assets/user.png" alt=""></i><input type="text" placeholder="Username" id="username"></section> -->
        <input type="text" placeholder="Username" id="username">
        <input type="password" name="" id="password" placeholder="Password">
        <span>New User? Sign Up</span>
      </div>
      <div class="login__box">
        <button>
          <span v-if="buttonJudge" @click="bjChange">LOGIN</span>
          <loading v-else></loading>
        </button>
      </div>
    </div>
    <!-- <div class="top__box">

    </div> -->
    <!-- <div class="choice__box">
      <div class="button__box">
        <button autofocus @click="login">LOGIN</button>
        <button>SIGN UP</button>
      </div>
      <p>This is a good start . NVNVYEZI</p>
    </div> -->
  </div>
</template>

<script>
import $ from 'jquery'
import loading from '../components/loading'
export default {
  name: 'HelloWorld',
  components: {
    loading
  },
  data () {
    return {
      buttonJudge: true
    }
  },
  methods: {
    login () {
      console.log(1);
      $('.top__box').addClass('top__box__an')
    },
    bjChange () {
      this.buttonJudge = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and(max-width: 720px) {
  * {
  margin: 0;
  padding: 0;
  }
  .box  {
    width: 100vw;
    height: 100vh;
    background: url('../assets/login1.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .shade {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgb(217, 224, 236);
      opacity: 0.4;
    }
    .top__box{
      width: 80vw;
      height: 55vh;
      box-shadow: 1px 1px 15px 5px rgb(199, 198, 198);
      border-radius: 15px;
      // background-color: red;
    }
    .top__box__an {
      transition: all 2s ease;
      transform: scale3d(0,0,0);
    }
    .choice__box {
      width: 80vw;
      height: 30vh;
      // margin-top: 20px;
      // background-color: yellow;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .button__box {
        width: 60vw;
        height: 19vh;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        button {
          user-select: none;
          width: 50vw;
          height: 7.5vh;
          border: none;
          border-radius: 30px;
          background-color: rgb(205, 245, 245);
          letter-spacing: 1px;
          // font-size: rem;
          font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-weight: 600;
        }
        button:hover {
          background-color: turquoise;
        }
        button:focus {
          background-color: rgb(206, 243, 176);
          outline: none;
        }
        button:target {
          background-color: red;
        }
      }
      p {
        position: relative;
        top: 30px;
      }
    }
    .form__box {
      width: 80vw;
      height: 80vh;
      // background-color: red;
      position: relative;
      z-index: 0;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      // align-content: center;
      align-items: center;
      .img__box {
        width: 60vw;
        height: 10vh;
        img {
          width: 100%;
          height: auto;
        }
      }
      .input__box {
        width: 80vw;
        height: 50vh;
        // background-color: yellow;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        i {
          width: 20px;
          height: 20px;
          position: relative;
          top: 47px;
          left: 20px;
          // background-color: red;
          img {
            width: 20px;
            height: 20px;
          }
        }
        input {
          width: 77vw;
          height: 7.4vh;
          margin-top: 15px;
          border-radius: 30px;
          border: none;
          background-color: rgb(255, 254, 254);
          // background: url('../assets/user.png') no-repeat left;
          // background-image: '../assets/user.png';
          // background-repeat: no-repeat;
          // background-size: 30px 30px;
          // background-repeat: no-repeat;
          // background-position: center center;
        }
        .imggong {
          background-repeat: no-repeat;
          background-size: 8vw 8vw;
          background-position: 6vw center;
        }
        #username {
          background-image: url('../assets/user.png');
          .imggong;
        }
        #password {
          background-image: url('../assets/pw.png');
          .imggong;
        }
        input::-webkit-input-placeholder {
          text-align: center;
          font-weight: 570;
          letter-spacing: 0.05rem;
          color: rgb(175, 175, 175);
        }
        input:focus {
          outline: none;
          padding-left: 17vw;
        }
        span {
          padding-bottom: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: rgb(247, 248, 248);
        }
      }
      span:last-child {
        margin-top: 30px;
        font-size: 1.4rem;
      }
      .login__box {
        width: 60vw;
        height: 10vh;
        // background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 42vw;
          height: 8vh;
          border: none;
          background-color: rgb(248, 54, 112);
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 30px;
          color: white;
          letter-spacing: 1px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        button:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
