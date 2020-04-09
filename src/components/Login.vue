<template>
  <div class="login">
    <div class="title_logo">
      <img src="../../static/images/logo_text.png" alt="">
    </div>
    <div class="login_con">
      <div class="user_ipt" style="margin-top:20px;">
        <img src="../../static/images/user_icon.png" alt="">
        <input type="text" v-model="username" placeholder="昵称/邮箱/手机号码">
      </div>
      <div class="user_ipt" style="margin-top:30px;">
        <img src="../../static/images/pwd_icon.png" alt="">
        <input type="password" v-model="password" placeholder="密码">
      </div>
      <div class="user_ipt" style="margin-top:30px; display: flex; justify-content: space-between;">
        <input type="text" v-model="captcha" placeholder="请输入验证码">
        <img :src="imgSrc" style="width: 100px">
      </div>
      <button class="login_btn" @click="loginSubmit">登录</button>
    </div>
  </div>
</template>

<script>
    import { userLogin, getYzmPic } from '../http/api.js'
    import {getItem, setItem} from '../helpers'
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                username: '',
                password: '',
                captcha: '',
                nowUUid: '',
                imgSrc: ''
            }
        },
        created() {
            this.getYzm();
        },
        methods: {
            loginSubmit() {
                const { username, password, captcha, nowUUid } = this
                userLogin({ username, password, captcha, uuid: nowUUid }).then(res => {
                    if (res.status == 200) {
                        const { header, permissions, user, token } = res.result
                        setItem('user_token', token)
                        setItem('user', user)
                        setItem('header', header)
                        setItem('permissions', JSON.stringify(permissions))
                        this.$router.replace("/home");
                    }
                })
            },
            getYzm() {
                this.nowUUid = new Date().getTime();
                getYzmPic({
                    uuid: this.nowUUid
                }).then(res => {
                    this.imgSrc = 'data:image/png;base64,' + res;
                })
            },
        },
    }
</script>
<style>
  @import "../assets/reset.css";
  .login {
    width: 100%;
    height: 100%;
    background: url("/static/images/login_bg.png") no-repeat;
    position: relative;
    background-size: cover;
    text-align: center;
  }
  .title_logo {
    text-align: center;
    padding-top: 6%;
    box-sizing: border-box;
  }
  .login_con{
    display: inline-block;
    background-color: #ffffff;
    box-shadow: 14px 14px 18px 0px
    rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-top: 40px;
    padding: 30px 30px;
  }
  .login_btn {
    margin-top: 30px;
    width: 316px;
    height: 46px;
    font-size: 16px;
    background-color: #e9460b;
    border-radius: 3px;
    color: #f5f243;
    border: none;
    outline: none;
    outline: 0;
  }
  .user_ipt {
    width: 310px;
    padding: 6px 0;
    border-bottom: solid 1px #d6d3d6;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }
  .user_ipt img {
    margin-right: 6px;
    width: 19px;
    height: 20px;
  }
  .user_ipt input {
    border: none;
    outline: none;
    outline: 0;
    line-height: 24px;
  }
</style>
