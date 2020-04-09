<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="日期">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="凭证种类">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="凭证代码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="对方户名">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="对方账号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="借方发生额">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="贷方发生额">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="余额">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item>
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
      if(this.$route.path == '/infoEdit') {
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