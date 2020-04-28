<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <img src="/static/images/wenzi.png" alt="" class="box-left-top">
        <img src="/static/images/chahua.png" alt="" class="box-left-bottom">
      </div> 
      <div class="login-box-right">
        <img src="/static/images/gonghuilogo.png" alt="" class="box-right-logo">
        <div class="login_con">
          <div class="user_ipt" style="margin-top:20px;">
            <img src="../../static/images/yonghuming.png" alt="">
            <input type="text" v-model="username" placeholder="昵称/邮箱/手机号码">
          </div>
          <div class="user_ipt" style="margin-top:30px;">
            <img src="../../static/images/mima.png" alt="">
            <input type="password" v-model="password" placeholder="密码">
          </div>
          <div class="user_ipt" style="margin-top:30px; display: flex; justify-content: space-between;">
            <div style="display: flex;">
              <img src="../../static/images/yanzhengma.png" alt="">
              <input type="text" v-model="captcha" placeholder="请输入验证码">
            </div>
            <img :src="imgSrc" @click="getYzm" style="width: 100px">
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
    min-width: 1200px;
    background: url("/static/images/beijing.png") no-repeat;
    // background: url("/static/images/login_bg.png") no-repeat;
    position: relative;
    background-size: 100% 100%;
    text-align: center;
    .login-box{
      width: 1200px;
      height: 65%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      .login-box-left{
        width: 50%;
        text-align: center;
        padding-top: 96px;
        box-sizing: border-box;
        .box-left-top{
          width: 55%;
          height: 76px;
          margin-bottom: 40px;
        }
        .box-left-bottom{
          width: 68%;
        }
      }
      .login-box-right{
        position: relative;
        padding-top: 130px;
        box-sizing: border-box;
        width: 400px;
        .box-right-logo{
          width: 80px;
          height: 80px;
          position: absolute;
          top: 52px;
          right: 0;
        }
        .login_con{
          margin-top: 40px;
          padding: 30px 30px;
        }
      }
    }
  }
  .title_logo {
    text-align: center;
    padding-top: 6%;
    box-sizing: border-box;
  }
  .login_con{
    margin-top: 40px;
    padding: 30px 30px;
  }
  .login_btn {
    margin-top: 27px;
    width: 400px;
    height: 50px;
    line-height: 50px;
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
    width: 400px;
    padding: 10px 12px;
    box-sizing: border-box;
    border-bottom: solid 1px #d6d3d6;
    display: flex;
    align-items: center;
  }
  .user_ipt img {
    margin-right: 28px;
    width: 20px;
    height: 20px;
  }
  .user_ipt input {
    border: none;
    outline: none;
    outline: 0;
    line-height: 24px;
    color: #333333;
  }
</style>
