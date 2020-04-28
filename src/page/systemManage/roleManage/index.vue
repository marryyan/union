<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名：">
          <el-input size="mini" v-model="formInline.roleName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="mini" v-model="formInline.roleStatus" placeholder="请输入">
            <el-option
              v-for="item in roleStatusOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
<!--          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>-->
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button class="xlsButton" size="mini" type="warning" @click="addInfo">新增角色</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="createUserId" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
            @click="handleDetail(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
            @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin: 15px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currPage"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :total="page.totalPage">
      </el-pagination>
      <!-- 新增 -->
      <el-dialog title="新增角色" :visible.sync="dialogAddVisible" :before-close="cancelInfo">
        <el-form :model="formInfo" label-position='right' label-width="130px">
          <el-form-item label="角色名称：">
            <el-input size="mini" v-model="formInfo.roleName" autocomplete="off" style="width:250px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInfo"  size="mini">取 消</el-button>
          <el-button type="primary" @click="submitInfo" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { systemManagementApis, commonApi } from '@/http/api'
  export default {
    data() {
      return {
        formInline: {
          "roleName":'', //工会名称
          "roleStatus":''  // 角色状态 0 ：正常 1：停用 2禁止登录 字典的key : roleStatus
        },
        tableData: [],
        page:{
          currPage:1, // 当前页
          pageSize: 10, // 每页条数
          totalPage: 1, // 总页数
        },
        roleStatusOptions: [],
        dialogAddVisible: false,
        formInfo: {
           "roleName":null //角色名称
        }
      }
    },
    mounted(){
      this.getDataDic()
      this.postSysRoleList()
    },
    methods: {
      // 获取字典
      getDataDic() {
        commonApi.getDataDic('roleStatus').then(res => {
            if (res.status === 200) {
                this.roleStatusOptions = res.result
            }
        })
      },
      postSysRoleList(){
        let data = {
          ...this.formInline,
          "currPage": this.page.currPage,//当前页
          "pageSize": this.page.pageSize,//每页显示条数
        }
        systemManagementApis.postSysRoleList(data).then(res => {
          if (res.status == '200') {
              this.tableData = res.result.list
              this.page.totalPage = res.result.totalCount
          } else {
              this.$message.error(res.message);
          }
        })
      },
      // 提交新增
      addInfo(){
        this.dialogAddVisible = true
      },
      cancelInfo(){
        this.dialogAddVisible = false
        this.formInfo = {}
      },
      submitInfo(){
        if(this.formInfo.roleName){
          let data = {
            ...this.formInfo
          }
          systemManagementApis.postSysRoleSave(data).then(res => {
            if (res.status == '200') {
              this.$message.success('新增角色成功！');
              this.dialogAddVisible = false
              this.page.currPage = 1
              this.tableData = []
              this.postSysRoleList()
            } else {
                this.$message.error(res.message);
            }
          })
        }else{
          this.$message.error("请填写角色名称后提交！");
        }
      },
      onSubmit() {
        this.page.currPage = 1
        this.tableData = []
        this.postSysRoleList()
      },
      handleEdit(index, row) {
        this.$router.push({
          path: `/roleManageInfoEdit?id=${row.roleId}`
        })
      },
      handleDetail(index, row){
        this.$router.push({
          path: `/roleManageInfoDetail?id=${row.roleId}`
        })
      },
      handleCurrentChange(val) {
          this.tableData = []
          this.page.currPage = val
          this.postSysRoleList()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
