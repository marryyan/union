<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <div class="login-box-left-img">
          <img src="/static/images/wenzi.png" alt="" class="box-left-top">
          <img src="/static/images/chahua.png" alt="" class="box-left-bottom">
        </div>
      </div>
      <div class="login-box-right">
        <div class="box-right-logo">
          <img src="/static/images/gonghuilogo.png" alt="">
        </div>
        <div class="login_con">
          <div class="user_ipt">
            <img src="../../static/images/yonghuming.png" alt="">
            <input type="text" v-model="username" placeholder="昵称/邮箱/手机号码">
          </div>
          <div class="user_ipt">
            <img src="../../static/images/mima.png" alt="">
            <input type="password" v-model="password" placeholder="密码">
          </div>
          <div class="user_ipt" style="position: relative">
            <img src="../../static/images/yanzhengma.png" alt="">
            <input type="text" v-model="captcha" placeholder="请输入验证码">
            <div style="position: absolute; top: 0;right: 0; width: 30%; height: 100%">
              <img style="height: 100%; width: 100%" :src="imgSrc" @click="getYzm">
            </div>
          </div>
          <button class="login_btn" @click="loginSubmit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { loginApis } from '../http/api.js'
    import { setItem } from '../helpers'
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
                loginApis.userLogin({ username, password, captcha, uuid: nowUUid }).then(res => {
                    if (res.status == 200) {
                        const { header, permissions, user, token } = res.result
                        setItem('user_token', token)
                        setItem('user', user)
                        setItem('header', header)
                        setItem('permissions', JSON.stringify(permissions))
                        this.$router.replace("/home");
                    } else {
                        this.getYzm()
                        this.$message.error(res.message)
                    }
                })
            },
            getYzm() {
                this.nowUUid = new Date().getTime();
                loginApis.getYzmPic({
                    uuid: this.nowUUid
                }).then(res => {
                    this.imgSrc = 'data:image/png;base64,' + res;
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
  @import "../assets/reset.css";
  .login {
    width: 100%;
    height: 100%;
    /*min-width: 1200px;*/
    background: url("/static/images/beijing.png") no-repeat;
    // background: url("/static/images/login_bg.png") no-repeat;
    position: fixed;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    text-align: center;
    .login-box{
      width: 62%;
      height: 62%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      .login-box-left{
        width: 50%;
        height: 100%;
        position: relative;
        .login-box-left-img {
          width: 100%;
          height: 60%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          img {
            width: 70%;
          }
        }
      }
      .login-box-right{
        position: relative;
        width: 50%;
        .box-right-logo{
          width: 100%;
          height: 10%;
          text-align: right;
          padding-top: 10%;
          padding-right: 15%;
          box-sizing: border-box;
          img {
            width: 15%
          }
        }
        .login_con{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 70%;
          padding: 0 10%;
          box-sizing: border-box;
        }
      }
    }
  }
  .title_logo {
    text-align: center;
    padding-top: 6%;
    box-sizing: border-box;
  }
  .login_btn {
    margin-top: 13%;
    width: 100%;
    height: 13%;
    line-height: 13%;
    font-size: 16px;
    background:linear-gradient(94deg,rgba(59,119,227,1),rgba(86,147,254,1));
    border-radius: 6px;
    font-size: 22px;
    color: #fff;
    border: none;
    outline: none;
    outline: 0;
  }
  .user_ipt {
    width: 100%;
    margin: 5% 0;
    padding: 1% 1%;
    box-sizing: border-box;
    border-bottom: solid 1px #d6d3d6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user_ipt img {
    width: 5%;
  }
  .user_ipt input {
    width: 90%;
    font-size: 18px;
    border: none;
    outline: none;
    outline: 0;
    color: #333333;
  }
</style>
