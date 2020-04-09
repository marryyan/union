<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="120px" :rules="rules" ref="formLabelAlign" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="所属税务所id" prop="taxTreeId">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxTreeId"></el-input>
      </el-form-item>
      <el-form-item label="税务局名称" prop="taxName">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxName"></el-input>
      </el-form-item>
      <el-form-item label="归集账户名称">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.accountName"></el-input>
      </el-form-item>
      <el-form-item label="归集账户号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.accountNumber"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.master"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item v-if="showAdd">
        <el-button style="width:80px" size="small" type="primary" @click="submitAdd('formLabelAlign')">确认</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button style="width:80px" size="small" type="primary" @click="submitEdit('formLabelAlign')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getBasebasetaxinfoInfo, postBasebasetaxinfoSave, postBasebasetaxinfoUpdate } from '@/http/api'
  export default {
    data() {
      return {
        showAdd: false, 
        formLabelAlign: {
          "taxTreeId":"",//所属税务所id
          "taxName":"",//税务局名称
          "accountName":"",//账户名
          "accountNumber":"",//账户号
          "master":"",//负责人
          "phone":"",//联系方式
        },
        rules: {
          taxTreeId: [
            { required: true, message: '请填写所属税务所id', trigger: 'blur' }
          ],
          taxName: [
            { required: true, message: '请填写税务局名称', trigger: 'blur' }
          ],
        }
      };
    },
    mounted(){
      // 编辑
      if(this.$route.path == '/taxOfficeInfoEdit') {
        this.showAdd = false
        this.getBasebasetaxinfoInfo()
      }else{
        this.showAdd = true
      }
    },
    methods:{
      // 详情
      getBasebasetaxinfoInfo(){
        let data ={
          id: this.$route.query.id
        }
        getBasebasetaxinfoInfo(data).then(res => {
          this.formLabelAlign = res.result
        })
      },
      // 新增
      postBasebasetaxinfoSave(){
        let data = {
          "taxTreeId":this.formLabelAlign.taxTreeId,//所属税务所id
          "taxName":this.formLabelAlign.taxName,//税务局名称
          "accountName":this.formLabelAlign.accountName,//账户名
          "accountNumber":this.formLabelAlign.accountNumber,//账户号
          "master":this.formLabelAlign.master,//负责人
          "phone":this.formLabelAlign.phone,//联系方式
        }
        postBasebasetaxinfoSave(data).then(res => {
          if (res.status == 200) {
              this.$message.success('新增成功！');
              this.$router.push({
                  path: '/taxOffice'
              })
          }
        })
      },
      // 编辑
      postBasebasetaxinfoUpdate(){
        let data = {
          "id":this.$route.query.id,//id
          "taxTreeId":this.formLabelAlign.taxTreeId,//所属税务所id
          "taxName":this.formLabelAlign.taxName,//税务局名称
          "accountName":this.formLabelAlign.accountName,//账户名
          "accountNumber":this.formLabelAlign.accountNumber,//账户号
          "master":this.formLabelAlign.master,//负责人
          "phone":this.formLabelAlign.phone,//联系方式
        }
        postBasebasetaxinfoUpdate(data).then(res => {
          if (res.status == 200) {
              this.$message.success('编辑成功！');
              this.$router.push({
                  path: '/taxOffice'
              })
          }
        })
      },
      submitAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postBasebasetaxinfoSave()
          } else {
            this.$message.error('请检查输入项！');
            return false;
          }
        });
      },
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postBasebasetaxinfoUpdate()
          } else {
            this.$message.error('请检查输入项！');
            return false;
          }
        });
      },
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