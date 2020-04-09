<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="220px" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="所属税期">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="所属区">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码（纳税人识别号）">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="纳税人名称">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会经费编码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会开户行">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会银行账号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会开户名称">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="电子税票号码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收品目">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收品目代码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="税款所属期起">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="税款所属期止">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="计税依据">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="税率">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="实缴金额">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="收款国库">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.region" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收税务机关">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="登记序号">
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