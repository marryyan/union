<template>
  <div class="wrapper">
    <div class="info-detail">
      <div class="info-detail-li">
        <div class="detail-li-left">税务局名称</div>
        <div class="detail-li-right">{{detailContent.taxName}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">征收税务机关</div>
        <div class="detail-li-right">{{detailContent.collTaxComp}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">归集账户名称</div>
        <div class="detail-li-right">{{detailContent.accountName}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">归集账户号</div>
        <div class="detail-li-right">{{detailContent.accountNumber}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">联系人</div>
        <div class="detail-li-right">{{detailContent.master}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">联系电话</div>
        <div class="detail-li-right">{{detailContent.phone}}</div>
      </div>
      <el-button style="width:80px; margin-left:100px" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import { basicFileApis } from '@/http/api'
export default {
  data() {
    return {
      detailContent: {}
    }
  },
  mounted(){
    this.getBasebasetaxinfoInfo()
  },
  methods:{
    getBasebasetaxinfoInfo(){
      let data ={
        id: this.$route.query.id
      }
      basicFileApis.getBasebasetaxinfoInfo(data).then(res => {
        if(res.status == '200'){
          this.detailContent = res.result
        }else{
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>