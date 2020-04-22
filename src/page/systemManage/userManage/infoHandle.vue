<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.realName"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.mobile"></el-input>
      </el-form-item>
      <el-form-item label="所属工会">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.officeName"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.dep"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.dutyNames"></el-input>
      </el-form-item>
      <el-form-item v-if="showAdd">
        <el-button style="width:80px" size="small" type="primary" v-on:click="userAdd">确认</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button style="width:80px" size="small" type="primary" v-on:click="userUpdate">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { systemManagementApis } from "../../../http/api";

  export default {
    data() {
      return {
        showAdd: false,
        formLabelAlign: {
            username: '',
            realName: '',
            mobile: '',
            officeName: '',
            dep: '',
            dutyNames: '',
        }
      };
    },
    mounted(){
      // 编辑
      if(this.$route.path == '/userManageInfoEdit') {
          this.postSysUserInfo()
          this.showAdd = false
      }else{
        this.showAdd = true
      }
    },
      methods: {
          postSysUserInfo() {
              const params = {
                  userId: this.$route.query.id
              }
              systemManagementApis.postSysUserInfo(params).then(res => {
                  if (res.status === 200) {
                      // const
                      this.formLabelAlign = {
                          ...this.formLabelAlign,
                          ...res.result
                      }
                  } else {
                      this.$message.error(res.message)
                  }
              })
          },
          userUpdate() {
              const params = {
                  ...this.formLabelAlign
              }
              systemManagementApis.postSysUserUpdate(params).then(res => {
                  if (res.status === 200) {
                      this.$message.success('修改成功')
                      this.$router.go(-1)
                  } else {
                      this.$message.error(res.message)
                  }
              })
          },
          userAdd () {
              const params = {
                  ...this.formLabelAlign
              }
              systemManagementApis.postSysUserSave(params).then(res => {
                  if (res.status === 200) {
                      this.$message.success('添加用户成功')
                      this.$router.go(-1)
                  } else {
                      this.$message.error(res.message)
                  }
              })
          }
      }
  }
</script>
<style lang="scss" scoped>
.demo-form-inline{
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  box-sizing: border-box;
}
</style>
