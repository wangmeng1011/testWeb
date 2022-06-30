<template>
  <div class="login-container">
    <div class="h_cent">
      <h1 class="logo h_icon">
<!--        <img src="../../assets/img.png" alt="FUSION">-->
<!--        <img src="" alt="FUSION">-->

      </h1>
    </div>
    <div class="loginFormContainer">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <el-form-item prop="username" class="w_200">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入手机号"
            name="username"
            type="text"
            autofocus=true
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="200"

            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <div>
<!--          <el-button v-if="!register" class = "forgetPassword" type="text">忘记密码?</el-button>-->
<!--          <el-button  class ="register" type="text" @click="()=>{$router.push({name:'register'})}">立即注册</el-button>-->
        </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>


      </el-form>
    </div>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import CryptoJS from 'crypto-js';
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('111'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码请输入大于6位小于18位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        register:""
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted(){
      this.getNewPassWord();
    },
    methods: {
      // 加密方法
      encrypt(word, keyM){
        let words  = CryptoJS.enc.Utf8.parse(word);
        let keyMs  = CryptoJS.enc.Utf8.parse(keyM);
        let encrypted = CryptoJS.AES.encrypt(words, keyMs, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
      },
      getNewPassWord(){
        // 需要加密的内容
        let word = this.loginForm.password;
        // 加密密钥
        let keyM = `${this.loginForm.username}fusion`.toString();
        // 密钥处理截取16位，不够后面补0
        keyM = keyM.length > 16 ? keyM.substr(0,16) :this.pad(keyM,16);
        // 加密方法
        let encryptData = this.encrypt(word,keyM);
        return  encryptData;
      },
      // 解密方法
      decrypt(word, keyM){
        let keyMs  = CryptoJS.enc.Utf8.parse(keyM);
        let bytes  = CryptoJS.AES.decrypt(word, keyMs, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText)
      },
      // 补充0
      pad(str, n) {
        let len = str.length;
        while(len < n) {
          str =str + "0";
          len++;
        }
        return str;
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', {
              username: this.loginForm.username,
              password: this.getNewPassWord(),
            }).then(() => {
              console.log("Dasd")
              this.$router.push({ path: '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #555;
        height: 47px;
        // caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #fff;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#fff;
  $dark_gray:#35c2bc;
  $light_gray:#eee;

  .login-container {
    position: relative;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .h_cent{
      height: 105px;
      padding-top: 30px;
      position: relative;
      z-index: 15;
      zoom: 1;
    }
    .logo{
      position: absolute;
      width: 210px;
      height: 70px;
      left: 200px;
      box-sizing: border-box;
      bottom: 15px;
    }
    .login_in_header .h_icon {
      display: inline-block;
      overflow: hidden;
      position: relative;
      z-index: 2;
      zoom: 1;
    }

    .login-form {
      background: rgba(255,255,255,.6);
      min-height: 505px;
      position: relative;
      zoom: 1;
      z-index: 50;
      float: right;
      top: 76px;
      right: 70px;
      min-width: 410px;
      padding: 80px 50px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;


      .title {
        font-size: 26px;
        color: #555;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  .loginFormContainer{
    z-index: 600;
    min-height: 700px;
    width: 100%;
    border-top: 1px solid #e8e8e6;
    //background-image:url('https://static.liweijia.com/liweijia/pc/sales_login/imgages/cloud_bg_20201118.jpg');
    background-image:url('../../assets/img_1.png');

    background-repeat: no-repeat;
    background-size :cover;
  }
  .register{
    float: right;
    padding-top:0 ;
  }
  .forgetPassword{
    padding-top:0 ;
  }
</style>
