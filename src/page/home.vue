<template>
  <el-container style="height:100%;">
    <el-header>
      <img src="../../static/images/small_logo.png" alt="">
      <span>西安市总工会经费缴费数据管理平台-费源库</span>
      <div class="logout" @click="handleLogOut">
        <i class="el-icon-switch-button"></i>
        <span>退出</span>
      </div>
    </el-header>
    <el-container style="height:100%;">
      <el-aside width="200px">
        <el-menu router :default-active="$route.path" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>基础档案</span>
            </template>
            <el-menu-item index="/organization">组织机构库</el-menu-item>
            <el-menu-item index="/taxOffice">税所机构库</el-menu-item>
            <el-menu-item index="/companyInfo">企业信息库</el-menu-item>
            <el-menu-item index="/appropriationRatio">拨付比例设置</el-menu-item>
            <el-menu-item index="/basePayment">缴费基数设置</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据入库</span>
            </template>
            <el-menu-item index="/taxWarehousing">税务入库</el-menu-item>
            <el-menu-item index="/bankWarehousing">银行入库</el-menu-item>
            <el-menu-item index="/accountingRecord">入库对账</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分配管理</span>
            </template>
            <el-menu-item index="/tradeUnion">工会经费分配</el-menu-item>
            <el-menu-item index="/preparatoryFund">筹备金分配</el-menu-item>
            <el-menu-item index="/microEnterprise">小微企业经费分配</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>返还管理</span>
            </template>
            <el-menu-item index="/labourUnion">工会经费返还</el-menu-item>
            <el-menu-item index="/preparation">筹备金返还</el-menu-item>
            <el-menu-item index="/peanuts">小微企业经费返还</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>查询统计</span>
            </template>
            <el-menu-item index="/tradeUnionFunds">工会经费缴款统计</el-menu-item>
            <el-menu-item index="/queryPreparatoryFund">筹备金缴款统计</el-menu-item>
            <el-menu-item index="/fullCallback">小微企业缴款统计</el-menu-item>
            <el-menu-item index="/scaleNotOk">缴费异常企业统计</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/userManage">用户管理</el-menu-item>
            <el-menu-item index="/roleManage">角色管理</el-menu-item>
            <el-menu-item index="/logManage">日志管理</el-menu-item>
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
            userTreeMenu: []
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
<style>
  .el-header, .el-footer {
    background-color: #e62111;
    /* background-color: #ffffff; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header {
      color: #f5fb44;
      font-size: 14px;
      display: flex;
      align-items: center;
      position: relative;
  }
  .logout{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4%;
    cursor: pointer;
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
</style>
