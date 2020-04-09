<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="所属工会">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item v-if="showAdd">
        <el-button style="width:80px" size="small" type="primary">确认</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button style="width:80px" size="small" type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showAdd: false, 
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    mounted(){
      // 编辑
      if(this.$route.path == '/userManageInfoEdit') {
        this.showAdd = false
      }else{
        this.showAdd = true
      }
    },
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