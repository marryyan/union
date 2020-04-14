<template>
  <div class="wrapper">
    <el-tabs type="border-card">
      <el-tab-pane label="企业基本信息">
        <div class="info-detail">
          <div class="info-detail-li">
            <div class="detail-li-left">企业名称</div>
            <div class="detail-li-right">{{detailInfo.compName}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">统一社会信用代码</div>
            <div class="detail-li-right">{{detailInfo.compCode}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">员工人数</div>
            <div class="detail-li-right">{{detailInfo.compPerson}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">联系方式</div>
            <div class="detail-li-right">{{detailInfo.compTel}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">企业经营地址</div>
            <div class="detail-li-right">{{detailInfo.adress}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">企业注册地址</div>
            <div class="detail-li-right">{{detailInfo.registAddress}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">登记注册类型</div>
            <div class="detail-li-right">{{detailInfo.registType}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">行业门类</div>
            <div class="detail-li-right">{{detailInfo.industryTypeName}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">法人代表</div>
            <div class="detail-li-right">{{detailInfo.compLegal}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">注册资本</div>
            <div class="detail-li-right">{{detailInfo.registMoney}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">经营范围</div>
            <div class="detail-li-right">{{detailInfo.compScope}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工会信息">
        <div class="info-detail">
          <div class="info-detail-li">
            <div class="detail-li-left">工会开户名称</div>
            <div class="detail-li-right">{{detailInfo.unionAccount}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会经费编码</div>
            <div class="detail-li-right">{{detailInfo.unionFundCode}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">上级工会名称</div>
            <div class="detail-li-right">{{detailInfo.unionParentName}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会开户行</div>
            <div class="detail-li-right">{{detailInfo.unionParentBank}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">所属系统工会</div>
            <div class="detail-li-right">{{detailInfo.unionBelongsto}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">建会日期</div>
            <div class="detail-li-right">{{detailInfo.unionCreateDate}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">建会人数</div>
            <div class="detail-li-right">{{detailInfo.unionPerson}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会开户行</div>
            <div class="detail-li-right">{{detailInfo.unionBank}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会银行账号</div>
            <div class="detail-li-right">{{detailInfo.unionBankAccount}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会经费比例</div>
            <div class="detail-li-right">{{detailInfo.unionFundPercent}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">管理代码</div>
            <div class="detail-li-right">{{detailInfo.unionManagerCode}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会法人</div>
            <div class="detail-li-right">{{detailInfo.unionLegal}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">工会电话</div>
            <div class="detail-li-right">{{detailInfo.unionTel}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">建会涵</div>
            <div class="detail-li-right">{{detailInfo.unionLetter}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">经办人</div>
            <div class="detail-li-right">{{detailInfo.unionHandleBy}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="税务信息">
        <div class="info-detail">
          <div class="info-detail-li">
            <div class="detail-li-left">税务登记代码</div>
            <div class="detail-li-right">{{detailInfo.taxRegistCode}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">收款国库</div>
            <div class="detail-li-right">{{detailInfo.receiveTreasury}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">税款属性</div>
            <div class="detail-li-right">{{detailInfo.taxAttr}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">税款所属税务机关</div>
            <div class="detail-li-right">{{detailInfo.taxBelongsComp}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">主管税务所（科、分局）</div>
            <div class="detail-li-right">{{detailInfo.masterTaxComp}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">征收税务机关</div>
            <div class="detail-li-right">{{detailInfo.collTaxComp}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="缴费信息">
        <div class="info-detail">
          <div class="info-detail-li">
            <div class="detail-li-left">银行账号</div>
            <div class="detail-li-right">{{detailInfo.payAccount}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">银行营业网点</div>
            <div class="detail-li-right">{{detailInfo.payNetwork}}</div>
          </div>
          <div class="info-detail-li">
            <div class="detail-li-left">银行行别</div>
            <div class="detail-li-right">{{detailInfo.bankType}}</div>
          </div>
        </div>
        <div class="table-title">费用缴纳情况</div>
        <el-table :data="tableData" border stripe style="width: 100%; margin-bottom: 20px">
          <el-table-column prop="compCode" label="税款所属期"></el-table-column>
          <el-table-column prop="compCode" label="征收品目"></el-table-column>
          <el-table-column prop="compCode" label="计税依据"></el-table-column>
          <el-table-column prop="compCode" label="税率"></el-table-column>
          <el-table-column prop="compCode" label="实缴金额"></el-table-column>
          <el-table-column prop="compCode" label="个税人数"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-button style="width:80px; margin-left:100px" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
    </el-tabs>
  </div>
</template>
<script>
import { basicFileApis } from '@/http/api'
export default {
  data() {
    return {
      tableData:[],
      detailInfo: {}
    }
  },
  mounted(){
    this.getBasecompanyinfoInfo()
  },
  methods:{
    getBasecompanyinfoInfo(){
      let data = {
        id: this.$route.query.id
      }
      basicFileApis.getBasecompanyinfoInfo(data).then(res => {
        if(res.status == '200'){
          this.detailInfo = res.result
        }else{
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-title{
  font-size: 18px;
  text-align: center;
  margin: 20px auto;
}
.detail-li-left{
  width: 160px;
}
</style>