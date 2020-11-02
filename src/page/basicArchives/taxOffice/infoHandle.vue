<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="120px" :rules="rules" ref="formLabelAlign" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="税务局名称" prop="taxName">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxName"></el-input>
      </el-form-item>
      <el-form-item label="征收税务机关">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.collTaxComp"></el-input>
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
        <div class="submit-btn" @click="submitAdd('formLabelAlign')" style="width:80px">确认</div>
      </el-form-item>
      <el-form-item v-else>
        <div class="submit-btn" @click="submitEdit('formLabelAlign')" style="width:80px">修改</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { basicFileApis } from '@/http/api'
  export default {
    data() {
      return {
        showAdd: false,
        formLabelAlign: {
          "taxName":"",//税务局名称
          "accountName":"",//账户名
          "accountNumber":"",//账户号
          "master":"",//负责人
          "phone":"",//联系方式
          "collTaxComp": '', //征收税务机关
        },
        rules: {
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
        basicFileApis.getBasebasetaxinfoInfo(data).then(res => {
          if(res.status == '200'){
            this.formLabelAlign = res.result
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 新增
      postBasebasetaxinfoSave(){
        let data = {
          taxTreeId: this.$route.query.treeId,
          ...this.formLabelAlign
        }
        basicFileApis.postBasebasetaxinfoSave(data).then(res => {
          if (res.status == 200) {
              this.$message.success('新增成功！');
              this.$router.push({
                  path: '/taxOffice'
              })
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 编辑
      postBasebasetaxinfoUpdate(){
        let data = {
          "id":this.$route.query.id,//id
          taxTreeId: this.$route.query.treeId,
          ...this.formLabelAlign
        }
        basicFileApis.postBasebasetaxinfoUpdate(data).then(res => {
          if (res.status == 200) {
            this.$message.success('编辑成功！');
            this.$router.push({
                path: '/taxOffice'
            })
          }else{
            this.$message.error(res.message);
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
