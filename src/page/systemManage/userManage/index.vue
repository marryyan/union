<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户姓名：">
          <el-input size="mini" v-model="formInline.realName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="mini" v-model="formInline.userStatus" placeholder="请输入">
            <el-option
              v-for="item in userStatusOptions"
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
        <el-button class="xlsButton" size="mini" type="warning" @click="addInfo">新增用户</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="username" label="账号" min-width="180"></el-table-column>
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="电话" min-width="180"></el-table-column>
        <el-table-column prop="officeName" label="所属工会" min-width="180"></el-table-column>
        <el-table-column prop="dep" label="所属部门" min-width="180"></el-table-column>
        <el-table-column prop="dutyNames" label="职位" min-width="180"></el-table-column>
        <el-table-column prop="date" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" min-width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
                       @click="prohibitLogin(scope.$index, scope.row)">{{scope.row.status !== 2 ? '禁止登录' : '解禁登录'}}</el-button>
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
                       @click="resetPassword(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
                       @click="stopUsing(scope.$index, scope.row)">{{scope.row.status !== 0 ? '停用' : '启用'}}</el-button>
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
      <!-- 弹窗 -->
      <!-- 禁止登录 -->
      <DialogCommon
        :centerText="prohibitLoginText"
        :centerDialogVisible="prohibitLoginVisible"
        @delDialog="sureProhibitDialog"
        @cancleDialog="prohibitLoginVisible = false"></DialogCommon>
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
        @cancleDialog="stopUsingVisible = false"></DialogCommon>
    </div>
  </div>
</template>
<script>
    import DialogCommon from '@/components/dialogCommon';
    import {commonApi, systemManagementApis} from "../../../http/api";

    export default {
        components: {
            DialogCommon
        },
        data() {
            return {
                formInline: {
                    userStatus: '',
                    realName: ''
                },
                userStatusOptions: [],
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 30, // 每页条数
                    totalPage: 0, // 总页数
                },
                prohibitLoginText:'',
                prohibitLoginVisible: false,
                resetPasswordText: '是否确定重置密码？',
                resetPasswordVisible: false,
                stopUsingText: '',
                stopUsingVisible: false,
                operationUser: {},
                sysRoleList: []
            }
        },
        mounted() {
            this.getDic()
        },
        methods: {
            getDic() {
              commonApi.getDataDic('userStatus').then(res => {
                  if (res.status === 200) {
                      this.userStatusOptions = res.result
                      this.postSysUserList()
                  } else {
                      this.$message.error(res.message)
                  }
              })
            },
            postSysUserList() {
                const params = {
                    ...this.formInline,
                    ...this.page
                }
                systemManagementApis.postSysUserList(params).then(res => {
                    if (res.status === 200) {
                        const { list, totalCount, currPage, pageSize } = res.result
                        this.page = {
                            ...this.page,
                            totalPage:res.result.totalCount,
                            currPage,
                            pageSize
                        }
                        console.log(this.page)
                        this.tableData = list
                    } else {
                        this.$message.error(res.message)
                    }
                })
                // systemManagementApis.postSysRoleSelect().then(res => {
                //     if (res.status === 200) {
                //         this.sysRoleList = res.result
                //     } else {
                //         this.$message.error(res.message)
                //     }
                // })
            },
            onSubmit() {
                this.page.currPage =1
                this.tableData = []
                this.postSysUserList()
            },


            addInfo(){
                this.$router.push({
                    path: `/userManageInfoAdd`
                })
            },
            handleEdit(index, row) {
                this.$router.push({
                    path: `/userManageInfoEdit?id=${row.userId}`
                })
            },


            prohibitLogin(index, row) {
                if (row.status === 2) {
                    this.prohibitLoginText = '是否解除禁止登录？'
                } else {
                    this.prohibitLoginText = '是否确定禁止登录？'
                }
                this.prohibitLoginVisible = true
                this.operationUser = row
            },
            sureProhibitDialog(){
                const params = {
                    userId: this.operationUser.userId
                }
                if (this.operationUser.status === 2) {
                    systemManagementApis.postSysUserUnlock(params).then(res => {
                        if (res.status === 200) {
                            this.prohibitLoginVisible = false
                            this.$message.success('解除禁止用户登录成功')
                            this.postSysUserList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    systemManagementApis.postSysUserLock(params).then(res => {
                        if (res.status === 200) {
                            this.prohibitLoginVisible = false
                            this.$message.success('禁止用户登录成功')
                            this.postSysUserList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            },


            resetPassword(index, row) {
                this.operationUser = row
                this.resetPasswordVisible = true
            },
            sureResetDialog(){
                const params = {
                    userId: this.operationUser.userId
                }
                systemManagementApis.postSysUserReset(params).then(res => {
                    if (res.status === 200) {
                        this.$message.success('重置密码成功')
                        this.resetPasswordVisible = false
                        this.postSysUserList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            cancleResetDialog(){
                this.resetPasswordVisible = false
            },


            stopUsing(index, row){
                if (row.status === 0) {
                    this.stopUsingText = '是否确定启用该账户？'
                } else {
                    this.stopUsingText = '是否确定停用该账户？'
                }
                this.operationUser = row
                this.stopUsingVisible = true
            },
            sureStopDialog(){
                const params = {
                    userId: this.operationUser.userId,
                    status: this.operationUser.status === 0 ? 1 : 0
                }
                systemManagementApis.postSysUserDisable(params).then(res => {
                    if (res.status === 200) {
                        this.stopUsingVisible = false
                        this.$message.success('操作成功')
                        this.postSysUserList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleCurrentChange(val) {
                this.tableData = []
                this.page.currPage = val
                this.postSysUserList()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
