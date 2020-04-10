<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="220px" ref="formLabelAlign" :model="formLabelAlign" class="demo-form-inline">
      <el-form-item label="所属税期">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxPeriod"></el-input>
      </el-form-item>
      <el-form-item label="所属区">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.belongsArea"></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码（纳税人识别号）">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.compCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="纳税人名称">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxPayer" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会经费编码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionFundCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会开户行">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionBank" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会银行账号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionBankAccount" disabled></el-input>
      </el-form-item>
      <el-form-item label="工会开户名称">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.unionAccount" disabled></el-input>
      </el-form-item>
      <el-form-item label="电子税票号码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.ticketNumber" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收品目">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.collectionItems" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收品目代码">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.collectionItemsCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="税款所属期起">
        <el-date-picker
          v-model="formLabelAlign.taxStart"
          size="small" style="width:200px"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="税款所属期止">
        <el-date-picker
          v-model="formLabelAlign.taxEnd"
          size="small" style="width:200px"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计税依据">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxBasis"></el-input>
      </el-form-item>
      <el-form-item label="税率">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxRate" disabled></el-input>
      </el-form-item>
      <el-form-item label="实缴金额">
        <el-input type="number" size="small" style="width:200px" v-model="formLabelAlign.paidAmount"></el-input>
      </el-form-item>
      <el-form-item label="收款国库">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.receiveTreasury" disabled></el-input>
      </el-form-item>
      <el-form-item label="征收税务机关">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.taxCollectionAuthority" disabled></el-input>
      </el-form-item>
      <el-form-item label="登记序号">
        <el-input size="small" style="width:200px" v-model="formLabelAlign.registCode" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:80px" size="small" type="primary" @click="submitEdit('formLabelAlign')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {dataStorageApis} from '@/http/api'
  export default {
    data() {
      return {
        formLabelAlign: {
          taxPeriod: '',
          belongsArea: '',
          compCode: '',
          taxPayer: '',
          unionFundCode: '',
          unionBank: '',
          unionBankAccount: '',
          unionAccount: '',
          ticketNumber: '',
          collectionItems: '',
          collectionItemsCode: '',
          taxStart: '',
          taxEnd: '',
          taxBasis: '',
          taxRate: '',
          paidAmount: '',
          receiveTreasury: '',
          taxCollectionAuthority: '',
          registCode: '',
        }
      };
    },
    mounted(){
      this.postStoreStoretaxtempInfo()
    },
    methods:{
      // 详情
      postStoreStoretaxtempInfo(){
        let data ={
          id: this.$route.query.id
        }
        dataStorageApis.postStoreStoretaxtempInfo(data).then(res => {
          this.formLabelAlign = res.result
        })
      },
      // 编辑
      postStoreStoretaxtempUpdate(){
        let data = {
          "id":this.$route.query.id,//id
          ...this.formLabelAlign
        }
        dataStorageApis.postStoreStoretaxtempUpdate(data).then(res => {
          if (res.status == 200) {
              this.$message.success('编辑成功！');
              this.$router.push({
                  path: '/taxWarehousing'
              })
          }
        })
      },
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postStoreStoretaxtempUpdate()
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