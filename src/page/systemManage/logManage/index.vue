<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="操作人员：">
          <el-input size="mini" v-model="formInline.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="操作时间：">
          <el-date-picker
            size="mini"
            v-model="daterange"
            type="daterange"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
<!--          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>-->
        </el-form-item>
      </el-form>
      <el-tabs type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="近一个月">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="日志编号"></el-table-column>
            <el-table-column prop="age" label="操作模块"></el-table-column>
            <el-table-column prop="resultMsg" label="操作结果"></el-table-column>
            <el-table-column prop="username" label="操作人员"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="createDate" label="操作时间"></el-table-column>
            <el-table-column prop="operation" label="操作内容"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="近三个月">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="日志编号"></el-table-column>
            <el-table-column prop="age" label="操作模块"></el-table-column>
            <el-table-column prop="resultMsg" label="操作结果"></el-table-column>
            <el-table-column prop="username" label="操作人员"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="createDate" label="操作时间"></el-table-column>
            <el-table-column prop="operation" label="操作内容"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="近半年">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="日志编号"></el-table-column>
            <el-table-column prop="age" label="操作模块"></el-table-column>
            <el-table-column prop="resultMsg" label="操作结果"></el-table-column>
            <el-table-column prop="username" label="操作人员"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="createDate" label="操作时间"></el-table-column>
            <el-table-column prop="operation" label="操作内容"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        style="margin: 15px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currPage"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :total="page.totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { systemManagementApis, commonApi } from '@/http/api'
  export default {
    data() {
      return {
        formInline: {
          "username":"",//用户名
          "startTime":"",//开始时间
          "endTime":"",//结束时间
          "operation":"",//操作
          "scope":"one"//one(一个月) three(三个月) six（(六个月)）
        },
        daterange: [], // 日期数组
        tableData: [],
        page:{
          currPage:1, // 当前页
          pageSize: 10, // 每页条数
          totalPage: 1, // 总页数
        },
        tabName: '近一个月',
      }
    },
    mounted(){
      this.postSysLogList()
    },
    methods: {
      postSysLogList(){
        let data ={
          ...this.formInline,
          "currPage": this.page.currPage,//当前页
          "pageSize": this.page.pageSize,//每页显示条数
        }
        systemManagementApis.postSysLogList(data).then(res => {
          if (res.status == '200') {
              this.tableData = res.result.list
              this.page.totalPage = res.result.totalCount
          } else {
              this.$message.error(res.message);
          }
        })
      },
      changeDate(e) {
          this.formInline.startTime = e[0]
          this.formInline.endTime = e[1]
      },
      onSubmit() {
        this.tableData = []
        this.page.currPage = 1
        this.postSysLogList()
      },
      handleTabClick(tab){
        this.tableData = []
        this.page.currPage = 1
        this.tabName = tab.label
        if(this.tabName == '近一个月'){
          this.formInline.scope = 'one'
        }else if(this.tabName == '近三个月'){
          this.formInline.scope = 'three'
        }else if(this.tabName == '近半年'){
          this.formInline.scope = 'six'
        }
        this.postSysLogList()
      },
      handleCurrentChange(val) {
          this.tableData = []
          this.page.currPage = val
          this.postSysLogList()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
