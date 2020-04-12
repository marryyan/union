<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="120px" :rules="rules" ref="formLabelAlign" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="所属总工会id" prop="unionTreeId">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionTreeId"></el-input>
      </el-form-item>
      <el-form-item label="工会名称" prop="unionName">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionName"></el-input>
      </el-form-item>
      <el-form-item label="工会账户名">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.accountName"></el-input>
      </el-form-item>
      <el-form-item label="工会账户号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.accountNumber"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
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
import { basicFileApis } from '@/http/api'
  export default {
    data() {
      return {
        showAdd: false,
        formLabelAlign: {
          "unionTreeId":"",//所属总工会id（必填）
          "unionName":"",//工会名称（必填）
          "accountName":"",//账户名
          "accountNumber":"",//账户号
          "master":"",//负责人
          "phone":"",//联系方式
        },
        rules: {
          unionTreeId: [
            { required: true, message: '请填写所属总工会id', trigger: 'blur' }
          ],
          unionName: [
            { required: true, message: '请填写工会名称', trigger: 'blur' }
          ],
        }
      };
    },
    mounted(){
      // 编辑
      if(this.$route.path == '/infoEdit') {
        this.showAdd = false
        this.getBaseBaseunioninfoInfo()
      }else{
        this.showAdd = true
      }
    },
    methods: {
      // 详情
      getBaseBaseunioninfoInfo(){
        let data ={
          id: this.$route.query.id
        };
        basicFileApis.getBaseBaseunioninfoInfo(data).then(res => {
          this.formLabelAlign = res.result
        })
      },
      // 新增
      postBaseBaseunioninfoSave(){
        let data = {
          ...this.formLabelAlign
        };
        basicFileApis.postBaseBaseunioninfoSave(data).then(res => {
          if (res.status == 200) {
              this.$message.success('新增成功！');
              this.$router.push({
                  path: '/organization'
              })
          }
        })
      },
      // 编辑
      postBaseBaseunioninfoUpdate(){
        let data = {
          "id":this.$route.query.id,//id
          ...this.formLabelAlign
        }
          basicFileApis.postBaseBaseunioninfoUpdate(data).then(res => {
          if (res.status == 200) {
              this.$message.success('编辑成功！');
              this.$router.push({
                  path: '/organization'
              })
          }
        })
      },
      submitAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postBaseBaseunioninfoSave()
          } else {
            this.$message.error('请检查输入项！');
            return false;
          }
        });
      },
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postBaseBaseunioninfoUpdate()
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
