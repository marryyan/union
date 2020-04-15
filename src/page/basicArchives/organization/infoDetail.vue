<template>
  <div class="wrapper">
    <div class="info-detail">
      <div class="info-detail-li">
        <div class="detail-li-left">工会名称</div>
        <div class="detail-li-right">{{detailContent.unionName}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">工会级次</div>
        <div class="detail-li-right">{{detailContent.unionRank}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">工会地址</div>
        <div class="detail-li-right">{{detailContent.unionAddress}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">开户银行</div>
        <div class="detail-li-right">{{detailContent.accountBank}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">工会账户名</div>
        <div class="detail-li-right">{{detailContent.accountName}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">工会账户号</div>
        <div class="detail-li-right">{{detailContent.accountNumber}}</div>
      </div>
      <div class="info-detail-li">
        <div class="detail-li-left">负责人</div>
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
    import { basicFileApis, commonApi } from '@/http/api'
    export default {
        data() {
            return {
                detailContent: {},
                unionRankOptions: []
            }
        },
        mounted(){
            commonApi.getDataDic('unionRank').then(res => {
                if (res.status === 200) {
                    this.unionRankOptions = res.result
                    this.getBaseBaseunioninfoInfo()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        methods:{
            getBaseBaseunioninfoInfo(){
                let data ={
                    id: this.$route.query.id
                }
                basicFileApis.getBaseBaseunioninfoInfo(data).then(res => {
                    if (res.status === 200) {
                        this.detailContent = {
                            ...this.detailContent,
                            ...res.result,
                            unionRank: this.unionRankOptions.find(item => item.k === res.result.unionRank).v
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
