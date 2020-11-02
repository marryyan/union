<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="120px" :rules="rules" ref="formLabelAlign" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="工会名称" prop="unionName">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionName"></el-input>
      </el-form-item>
      <el-form-item label="工会级次" prop="unionRank">
        <el-select size="small" style="width:200px" v-model="formLabelAlign.unionRank" placeholder="请选择">
          <el-option
            v-for="item in unionRankOptions"
            :key="item.k"
            :label="item.v"
            :value="item.k">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工会地址" prop="unionAddress">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionAddress"></el-input>
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
        <div class="submit-btn" @click="submitAdd('formLabelAlign')" style="width:80px">确认</div>
      </el-form-item>
      <el-form-item v-else>
        <div class="submit-btn" @click="submitEdit('formLabelAlign')" style="width:80px">修改</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import { basicFileApis, commonApi } from '@/http/api'
    export default {
        data() {
            return {
                showAdd: false,
                formLabelAlign: {
                    "unionName":"",//工会名称（必填）
                    "unionRank":"",//工会级次
                    "unionAddress":"",//工会地址
                    "accountName":"",//账户名
                    "accountNumber":"",//账户号
                    "master":"",//负责人
                    "phone":"",//联系方式
                },
                unionRankOptions: [],
                rules: {
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
                commonApi.getDataDic('unionRank').then(res => {
                    if (res.status === 200) {
                        this.unionRankOptions = res.result
                        this.getBaseBaseunioninfoInfo()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }else{
                this.showAdd = true
                commonApi.getDataDic('unionRank').then(res => {
                    if (res.status === 200) {
                        this.unionRankOptions = res.result
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        },
        methods: {
            // 详情
            getBaseBaseunioninfoInfo(){
                let data ={
                    id: this.$route.query.id
                }
                basicFileApis.getBaseBaseunioninfoInfo(data).then(res => {
                    if (res.status === 200) {
                        this.formLabelAlign = {
                            ...this.formLabelAlign,
                            ...res.result,
                        }
                    } else {
                        this.$message.error(res.message)
                    }
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
                    } else {
                        this.$message.error(res.message)
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
                    } else {
                        this.$message.error(res.message)
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
