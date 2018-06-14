<template>
  <div class="login">
    <router-link to="/" tag="header" class="login-home"></router-link>
    <div class="shade"></div>
    <div class="form__box">
      <div class="img__box">
        <img class="img__box--img" src="../assets/logo.png" alt="">
      </div>
      <div class="input__box">
        <span class="input__box--span">{{ formTitle }}</span>
        <label class="input--icon">
          <input class="input__box--input" type="text" @focus="removeIcon" @blur="removeWarn1" @input="idTest" placeholder="Username" id="username">
        </label>
        <span class="remind" v-show="id.remind">{{ id.err }}</span>
        <label class="input--icon">
          <input class="input__box--input" type="password" name="" @focus="removeIcon" @blur="removeWarn2" @input="pwTest" id="password" placeholder="Password">
        </label>
        <span class="remind" v-show="pw.remind">{{ pw.err }}</span>
        <label v-show="email.show" class="input--icon">
          <input class="input__box--input" type="text" @focus="removeIcon" @blur="removeWarn3" @input="emailTest" id="email" placeholder="Email">
        </label>
        <span class="remind" v-show="email.remind">{{ email.err }}</span>
        <span class="input__box--span2">New User? <strong class="strong-up" @click="showRegister">{{ message }}</strong></span>
      </div>
      <div class="login__box">
        <button class="login__box--button">
          <span class="login__box--span" v-if="LRstatus" @click="login">{{ buttonText }}</span>
          <loading v-else></loading>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading';
import { userLoginG, userLoginP, userRegisterG, userRegisterP } from "../api/api";
export default {
  name: 'HelloWorld',
  components: {
    loading,
  },
  data () {
    return {
      LRstatus: true,
      id: {
        err: '用户名格式不对',
        remind: null
      },
      pw: {
        err: '密码请包含大写字母、小写字母、数字、特殊符号中的至少三类，且长度在8到20之间',
        remind: null
      },
      email: {
        show: false,
        err: '邮箱格式不对',
        remind: null
      }
    }
  },
  computed: {
    message () {
      return this.email.show ? 'Login' : 'Register';
    },
    formTitle () {
      return this.email.show ? 'User Register' : 'User Login';
    },
    buttonText () {
      return this.email.show ? 'REGISTER' : 'LOGIN';
    }
  },
  mounted () {    
    userLoginG(data => {
      if (data.err) {
        console.log(data.data)
        this.$toast('服务器出了点小问题');
      } else {
        this.$toast(data.data);
      }
    });
  },
  methods: {
    showRegister () {
      if (!this.email.show) {    
        userRegisterG(data => {
          if (data.err) {
            console.log(data.data)
            this.$toast('服务器出了点小问题');
          } else {
            this.$toast(data.data);
          }
        });
      } else {
        userLoginG(data => {
          if (data.err) {
            console.log(data.data)
            this.$toast('服务器出了点小问题');
          } else {
            this.$toast(data.data);
          }
        });
      }
      this.email.show = !this.email.show;
    },
    login () {
      this.LRstatus = false;
      if (this.email.show) {
        if (this.id.remind === false && this.pw.remind === false && this.email.remind === false) {
          let input = document.getElementsByClassName('input__box--input');
          let id = input[0].value;
          let pw = input[1].value;
          let email = input[2].value;
          userRegisterP(id, pw, email, data => {
            if (data.err) {
              this.LRstatus = true;
              console.log(data.data)
              this.$toast(data.data);
            } else {
              setTimeout(() => {
                this.LRstatus = true;
                this.$toast(data.data);
                this.$route.meta.isLogin = true;
              }, 500);
            }
          })
        } else {
          this.$toast('请输入正确的用户名,密码和邮箱');
          this.LRstatus = true;
        }
      } else {
        if (this.id.remind === false && this.pw.remind === false) {
          let input = document.getElementsByClassName('input__box--input');
          let id = input[0].value;
          let pw = input[1].value;
          userLoginP(id, pw, data => {
            if (data.err) {
              this.LRstatus = true;
              console.log(data.data)
              this.$toast(data.data);
            } else {
              setTimeout(() => {
                this.LRstatus = true;
                this.$toast(data.data);
                this.$route.meta.isLogin = true;
                localStorage['userName'] = id;
                userBookShelfG(id, data => {
                  if (data.err) {
                    this.$toast(data.data);
                  } else {
                    localStorage['bookshelf'] = data.result;
                  }
                })
                location.reload();
              }, 500);
            }
          })
        } else {
          this.$toast('请输入正确的用户名和密码');
          this.LRstatus = true;
        }
      }
    },
    idTest (e) {
      let val = e.target.value;
      let regId = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regId.test(val)) {
        this.id.remind = true;
      } else {
        this.id.remind = false;
      }
    },
    pwTest (e) {
      let val = e.target.value;
      let regPw = /^(?!([A-Z]*|[a-z]*|[0-9]*|[!-/:-@\[-`{-~]*|[A-Za-z]*|[A-Z0-9]*|[A-Z!-/:-@\[-`{-~]*|[a-z0-9]*|[a-z!-/:-@\[-`{-~]*|[0-9!-/:-@\[-`{-~]*)$)[A-Za-z0-9!-/:-@\[-`{-~]{8,20}$/;
      if (!regPw.test(val)) {
        this.pw.remind = true;
      } else {
        this.pw.remind = false;
      }
    },
    emailTest (e) {
      let val = e.target.value;
      let regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!regEmail.test(val)) {
        this.email.remind = true;
      } else {
        this.email.remind = false;
      }
    },
    removeIcon (e) {
      e.target.parentNode.classList.remove('iconErr');
      e.target.parentNode.classList.remove('iconCorrect');
    },
    removeWarn1 (e) {
      if (this.id.remind || e.target.value == '') {
        // this.id.remind = false;
        e.target.parentNode.classList.add('iconErr');
        e.target.parentNode.classList.remove('iconCorrect');
      } else {
        e.target.parentNode.classList.add('iconCorrect');
        e.target.parentNode.classList.remove('iconErr');
      }
    },
    removeWarn2 (e) {
      if (this.pw.remind || e.target.value == '') {
        // this.pw.remind = false;
        e.target.parentNode.classList.add('iconErr');
        e.target.parentNode.classList.remove('iconCorrect');
      } else {
        e.target.parentNode.classList.add('iconCorrect');
        e.target.parentNode.classList.remove('iconErr');
      }
    },
    removeWarn3 (e) {
      if (this.email.remind || e.target.value == '') {
        // this.email.remind = false;
        e.target.parentNode.classList.add('iconErr');
        e.target.parentNode.classList.remove('iconCorrect');
      } else {
        e.target.parentNode.classList.add('iconCorrect');
        e.target.parentNode.classList.remove('iconErr');
      }
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
  .iconErr {
    &::after {
      background: url('../assets/错号.svg') no-repeat center;
    }
  }
  .iconCorrect {
    &::after {
      background: url('../assets/对号.svg') no-repeat center;
    }
  }
  .login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/login1.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-home {
      width: 2.5rem;
      height: 2.5rem;
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: url('../assets/主页.svg') no-repeat center;
      background-size: 2.5rem 2.5rem;
      z-index: 1100;
    }
    .shade {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgb(217, 224, 236);
      opacity: 0.7;
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
    .form__box {
      width: 80vw;
      height: 80vh;
      position: relative;
      z-index: 0;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      .img__box {
        width: 60vw;
        height: 10vh;
        .img__box--img {
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
        .remind {
          color: red;
          font-size: 1rem;
          font-weight: 400;
        }
        .input--icon {
          position: relative;
          .input__box--input {
            width: 77vw;
            height: 7.4vh;
            margin-top: 15px;
            border-radius: 30px;
            border: none;
            text-align: center;
            background-color: rgb(255, 254, 254);
            &::-webkit-input-placeholder {
              text-align: center;
              font-weight: 570;
              letter-spacing: 0.05rem;
              color: rgb(175, 175, 175);
            }
            &:focus {
              outline: none;
              text-align: left;
              padding-left: 17vw;
            }
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            margin-top: -4.7vh;
            right: -5vw;
            width: 1.5rem;
            height: 1.5rem;
            background-size: 1.5rem 1.5rem;
          }
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
        #email {
          background-image: url('../assets/邮箱.svg');
          .imggong;
        }
        .input__box--span {
          padding-bottom: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: rgb(247, 248, 248);
        }
      }
      .input__box--span2 {
        margin-top: 1rem;
        font-size: 1.3rem;
        color: rgb(135, 176, 236);
        .strong-up {
          color: rgb(151, 146, 218);
        }
      }
      .login__box {
        width: 60vw;
        height: 10vh;
        // background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
        .login__box--button {
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
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
