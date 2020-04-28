<template>
  <el-container style="height:100%;">
    <el-header>
      <div class="header-box">
        <img src="../../static/images/logo-white.png" alt="" class="header-box-logo">
        <span>西安市总工会小微企业工会经费返还平台</span>
        <div class="logout" @click="handleLogOut">
          <i class="el-icon-switch-button"></i>
          <span>退出</span>
        </div>
      </div>
    </el-header>
    <el-container style="height:100%;">
      <el-aside width="200px">
        <el-menu router
        :default-active="$route.path"
        :unique-opened="true"
        :collapse='collapse' >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>基础档案</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/organization">组织机构库</el-menu-item>
              <el-menu-item index="/taxOffice">税所机构库</el-menu-item>
              <el-menu-item index="/companyInfo">企业信息库</el-menu-item>
              <el-menu-item index="/appropriationRatio">拨付比例设置</el-menu-item>
              <el-menu-item index="/basePayment">缴费基数设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据入库</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/taxWarehousing">税务入库</el-menu-item>
              <el-menu-item index="/bankWarehousing">银行入库</el-menu-item>
              <el-menu-item index="/accountingRecord">入库对账</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分配管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/tradeUnion">工会经费分配</el-menu-item>
              <el-menu-item index="/preparatoryFund">筹备金分配</el-menu-item>
              <el-menu-item index="/microEnterprise">小微企业经费分配</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>返还管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/labourUnion">工会经费返还</el-menu-item>
              <el-menu-item index="/preparation">筹备金返还</el-menu-item>
              <el-menu-item index="/peanuts">小微企业经费返还</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>查询统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/tradeUnionFunds">工会经费缴款统计</el-menu-item>
              <el-menu-item index="/queryPreparatoryFund">筹备金缴款统计</el-menu-item>
              <el-menu-item index="/fullCallback">小微企业缴款统计</el-menu-item>
              <el-menu-item index="/scaleNotOk">缴费异常企业统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/userManage">用户管理</el-menu-item>
              <el-menu-item index="/roleManage">角色管理</el-menu-item>
              <el-menu-item index="/logManage">日志管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="dataThree">日志管理</el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main style="height:100%;">
        <div class="page_title"><i  @click="$router.go(-1)" class="el-icon-arrow-left" style="font-size:18px; font-weight:bold;margin-right:5px" ></i>{{$route.name}}</div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {commonApi, loginApis} from "../http/api";

export default {
    name: 'home',
    data() {
        return {
            userTreeMenu: [],
            collapse: false
        }
    },
    mounted() {
        this.getUserTreeMenu()
    },
    methods: {
      handleLogOut(){
        loginApis.handleLogOut({}).then(res => {
          if (res.status == 200) {
              this.$router.push({
                  path: '/login'
              })
          }
        })
      },
        getUserTreeMenu() {
            commonApi.getUserTreeMenu().then(res => {
                if (res.status === 200) {
                    this.userTreeMenu = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  height: 58px;
  background: url('../../static/images/line-blue.png') no-repeat;
  background-size: 100% 100%;
  padding-left: 30px;
  box-sizing: border-box;
  line-height: 58px;
  display: flex;
  position: relative;
  .header-box-logo{
    width: 30px;
    height: 30px;
    margin-right: 15px;
    margin-top: 10px;
  }
  span{
    font-size: 16px;
    color: #FEFEFE;
  }
  .logout{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4%;
    cursor: pointer;
    color: #ffffff;
  }
}
.aside-top{
  width: 100%;
  height: 58px;
  background-color: #3B77E3;
  position: relative;
  img{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
  }
}
  .el-header, .el-footer {
    color: #333;
    line-height: 60px;
    padding: 0 !important;
  }
  .el-header {
      color: #f5fb44;
      font-size: 14px;
      display: flex;
      align-items: center;
      position: relative;
  }
  .el-header img {
      width: 30px;
      margin-right: 6px;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #f5f7f9;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .page_title{
    margin-bottom: 20px;
    font-weight: bolder;
    font-size: 16px;
  }
  .img{
    width: 13px;
    height: 16px;
  }
</style>
