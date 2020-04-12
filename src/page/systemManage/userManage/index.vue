<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户姓名：">
          <el-input size="mini" v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="addInfo">新增用户</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="date" label="电话"></el-table-column>
        <el-table-column prop="date" label="所属工会"></el-table-column>
        <el-table-column prop="date" label="所属部门"></el-table-column>
        <el-table-column prop="date" label="职位"></el-table-column>
        <el-table-column prop="date" label="角色"></el-table-column>
        <el-table-column prop="date" label="状态"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="warning"
            @click="prohibitLogin(scope.$index, scope.row)">禁止登录</el-button>
            <el-button size="mini" type="warning"
            @click="resetPassword(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" type="warning"
            @click="stopUsing(scope.$index, scope.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="margin: 15px 0"
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page.sync="page.currPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.totalPage">
    </el-pagination>
    <!-- 弹窗 -->
    <!-- 禁止登录 -->
    <DialogCommon 
    :centerText="prohibitLoginText" 
    :centerDialogVisible="prohibitLoginVisible" 
    @delDialog="sureProhibitDialog"
    @cancleDialog="cancleProhibitDialog"></DialogCommon>
    <!-- 重置密码 -->
    <DialogCommon
    :centerText="resetPasswordText" 
    :centerDialogVisible="resetPasswordVisible" 
    @delDialog="sureResetDialog"
    @cancleDialog="cancleResetDialog"></DialogCommon>
    <!-- 停用 -->
    <DialogCommon 
    :centerText="stopUsingText" 
    :centerDialogVisible="stopUsingVisible" 
    @delDialog="sureStopDialog"
    @cancleDialog="cancleStopDialog"></DialogCommon>
    </div>
  </div>
</template>
<script>
import DialogCommon from '@/components/dialogCommon';
export default {
  components: {
    DialogCommon
  },
  data() {
    return {
      formInline: {
        user: '',
        name: ''
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      page:{
        currPage:1, // 当前页
        pageSize: 10, // 每页条数
        totalPage: 100, // 总页数
      },
      prohibitLoginText:'是否确定禁止登录？',
      prohibitLoginVisible: false,
      resetPasswordText: '是否确定重置密码？',
      resetPasswordVisible: false,
      stopUsingText: '是否确定停用该账户？',
      stopUsingVisible: false,
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    addInfo(){
      this.$router.push({
        path: `/userManageInfoAdd`
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: `/userManageInfoEdit?id=${row.date}`
      })
    },
    handleDetail(index, row){
      this.$router.push({
        path: `/infoDetail?id=${row.date}`
      })
    },
    prohibitLogin(index, row) {
      this.prohibitLoginVisible = true
    },
    sureProhibitDialog(){
      this.prohibitLoginVisible = false
    },
    cancleProhibitDialog(){
      this.prohibitLoginVisible = false
    },
    resetPassword(index, row) {
      this.resetPasswordVisible = true
    },
    sureResetDialog(){
      this.resetPasswordVisible = false
    },
    cancleResetDialog(){
      this.resetPasswordVisible = false
    },
    stopUsing(){
      this.stopUsingVisible = true
    },
    sureStopDialog(){
      this.stopUsingVisible = false
    },
    cancleStopDialog(){
      this.stopUsingVisible = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>