<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属区：">
          <el-cascader
            size="mini"
            v-model="formInline.belongsAreaId"
            :options="treeList"
            placeholder="请选择"
            :props="{ value: 'id', label: 'title', checkStrictly: true}"></el-cascader>
        </el-form-item>
        <el-form-item label="税款所属期：">
          <el-date-picker
           size="mini"
            v-model="daterange"
            type="monthrange"
            @change="changeDate"
            value-format="yyyy年MM月"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <div class="submit-btn" @click="onSubmit">检索</div>
            <div>（请选择日期后查看数据）</div>
          </div>
        </el-form-item>
      </el-form>
      <div class="list" v-if="listData.length >0">
        <ul class="list-ul" v-for="(item, index) in listData" :key="index">
         <li>
           <span v-for="(itemSmall, indexSmall) in item" :key="indexSmall">{{itemSmall}}</span>
         </li>
        </ul>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="税款所属期" min-width="180"></el-table-column>
        <el-table-column prop="belongsAreaName" label="所属区" min-width="180"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" min-width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" min-width="200"></el-table-column>
        <el-table-column prop="ticketNumber" label="电子税票号码" min-width="180"></el-table-column>
        <el-table-column prop="collectionItems" label="征收品目"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="征收品目代码" min-width="180"></el-table-column>
        <el-table-column prop="taxStart" label="税款所属期起" min-width="180"></el-table-column>
        <el-table-column prop="taxEnd" label="税款所属期止" min-width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="receiveTreasury" label="收款国库" min-width="200"></el-table-column>
        <el-table-column prop="taxBelongsComp" label="征收税务机关" min-width="250"></el-table-column>
        <el-table-column prop="registCode" label="登记序号" min-width="180"></el-table-column>
      </el-table>
      <el-pagination
      style="margin: 15px 0"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.totalPage">
    </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getTreeData } from '@/helpers';
  import {  basicFileApis, commonApi, queryStatsApis} from '@/http/api'
  export default {
    data() {
      return {
        formInline: {
          "dataType": 1, // 1 : 工会经费 2： 筹备金 3 小微企业
          "startDate":"", // 开始格式 yyyy年MM月
          "endDate":"", //结束格式 yyyy年MM月
          "belongsAreaId":[] // 所属区, 企业信息库左侧的树形结构
        },
        daterange: [], // 日期数组
        treeList:[],
        listData:[], // li数组
        tableData: [], // 表格数组
        page:{
          currPage:1, // 当前页
          pageSize: 15, // 每页条数
          totalPage: 1, // 总页数
        }
      }
    },
    mounted(){
      this.getBaseBaseuniontree() //左树
    },
    methods: {
      // 左侧树图
      getBaseBaseuniontree() {
          this.treeList = [];
          basicFileApis.getBaseBaseuniontree().then(res => {
              this.treeList = getTreeData([res.result]);
          })
      },
      changeDate(e) {
          this.formInline.startDate = e[0]
          this.formInline.endDate = e[1]
      },
      // list
      postCountTable(){
        const belongsAreaId = this.formInline.belongsAreaId
        let data = {
          ...this.formInline,
          belongsAreaId: belongsAreaId[belongsAreaId.length - 1]
        }
        queryStatsApis.postCountTable(data).then(res => {
          if(res.status == '200') {
            this.listData = res.result.tableData
          }else {
              this.$message.error(res.message);
          }
        })
      },
      // table
      postCountList(){
        const belongsAreaId = this.formInline.belongsAreaId
        let data = {
          ...this.formInline,
          "currPage": this.page.currPage,//当前页
          "pageSize": this.page.pageSize,//每页显示条数
          belongsAreaId: belongsAreaId[belongsAreaId.length - 1]
        }
        queryStatsApis.postCountList(data).then(res => {
          if(res.status == '200') {
            this.tableData = res.result.list
            this.page.totalPage = res.result.totalCount
          }else {
              this.$message.error(res.message);
          }
        })
      },
      onSubmit() {
        if(this.formInline.startDate || this.formInline.endDate){
          this.page.currPage = 1
          this.tableData = []
          this.listData = []
          this.postCountTable()
          this.postCountList()
        }else{
          this.$message.error('请先选择日期！');
        }
      },
      handleCurrentChange(val) {
        this.tableData = []
        this.page.currPage = val
        this.postCountList()
      }
    }
  }
</script>
<style lang="scss" scoped>
.list{
  width: 100%;
  overflow: scroll;
  border: 1px solid #cccccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  .list-ul{
    box-sizing: border-box;
    width: fit-content;
    margin: 0 auto;
    li{
      width: fit-content;
      line-height: 30px;
      white-space: nowrap;
      span{
        width: 100px;
        display: inline-block;
        text-align: center;
        padding: 10px;
        border-bottom: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
      }
    }
  }
}
</style>
