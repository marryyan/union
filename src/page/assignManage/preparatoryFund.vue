<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-date-picker
            size="mini"
            v-model="searchForm.taxPeriod"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-input size="mini" v-model="searchForm.taxBelongsComp" placeholder="请输入"></el-input>
<!--          <el-select size="mini" v-model="searchForm.taxBelongsComp" placeholder="请输入">-->
<!--            <el-option-->
<!--              v-for="item in taxBelongsCompOptions"-->
<!--              :key="item.k"-->
<!--              :label="item.v"-->
<!--              :value="item.k">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input size="mini" v-model="searchForm.taxPayer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码：">
          <el-input size="mini" v-model="searchForm.compCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分配状态：">
          <el-select size="mini" v-model="searchForm.distributionType" placeholder="请输入">
            <el-option
              v-for="item in distributionTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费类型：">
          <el-select size="mini" v-model="searchForm.collectionItemsCode" placeholder="请输入">
            <el-option
              v-for="item in collectionItemsCodeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会类别：">
          <el-select size="mini" v-model="searchForm.unionType" placeholder="请输入">
            <el-option
              v-for="item in unionTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="exportList">分配(下载打印)</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="所属税期" width="180"></el-table-column>
        <el-table-column prop="belongsAreaName" label="所属区" width="180"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" width="250"></el-table-column>
        <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="unionAccount" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="compFirmlyType" label="企业认定"></el-table-column>
        <el-table-column prop="unionType" label="工会类别"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="缴费类型" width="180"></el-table-column>
        <el-table-column prop="provincePercent" label="省总分配比例" width="180"></el-table-column>
        <el-table-column prop="provinceMoney" label="省总分配金额" width="180"></el-table-column>
        <el-table-column prop="cityPercent" label="市总分配比例" width="180"></el-table-column>
        <el-table-column prop="cityMoney" label="市总分配金额" width="180"></el-table-column>
        <el-table-column prop="serviceChargePercent" label="手续费"></el-table-column>
        <el-table-column prop="serviceChargeMoney" label="手续费金额" width="180"></el-table-column>
        <el-table-column prop="areaIndustryPercent" label="区县/产业分配比例" width="180"></el-table-column>
        <el-table-column prop="areaIndustryMoney" label="区县/产业分配金额" width="180"></el-table-column>
        <el-table-column prop="compPercent" label="企业分配比例" width="180"></el-table-column>
        <el-table-column prop="compMoney" label="企业分配金额" width="180"></el-table-column>
        <el-table-column prop="distributionType" label="分配状态"></el-table-column>
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
  import { distributionManagementApis, commonApi } from '@/http/api'
  export default {
    data() {
      return {
          searchForm: {
              taxPeriod: '',
              taxPayer: '',
              compCode: '',
              unionType: '',
              taxBelongsComp: '',
              collectionItemsCode: '',
              distributionType: '',
              dataType: 2,
              taxBelongsCompId:"", // 新增
          },
          page:{
              currPage: 1, // 当前页
              pageSize: 10, // 每页条数
              totalPage: 0, // 总页数
          },
          tableData: [],
        formInline: {
          user: '',
          name: ''
        },
          taxBelongsCompOptions: [],
          unionTypeOptions: [],
          collectionItemsCodeOptions: [],
          distributionTypeOptions: [],
          compFirmlyTypeOptions: [],
      }
    },
      mounted() {
        this.getDataDic()
        this.postStoreTaxdistributionList()
      },
    methods: {
        // 导出
        exportList(){
          let formString = `taxPeriod=${this.searchForm.taxPeriod}&taxBelongsComp=${this.searchForm.taxBelongsComp}&collectionItemsCode=${this.searchForm.collectionItemsCode}&taxPayer=${this.searchForm.taxPayer}&compCode=${this.searchForm.compCode}&distributionType=${this.searchForm.distributionType}&dataType=${this.searchForm.dataType}&unionType=${this.searchForm.unionType}&taxBelongsCompId=${this.searchForm.taxBelongsCompId}`
          let pageString = `currPage=${this.page.currPage}&pageSize=${this.page.pageSize}`
          let url = `/union/store/taxdistribution/downexcel?token=${sessionStorage.getItem('user_token')}&${formString}&${pageString}`
          window.location.href = url
        },
        getDataDic() {
            commonApi.getDataDic('unionType').then(res => {
                if (res.status === 200) {
                    this.unionTypeOptions = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
            commonApi.getDataDic('collectionItemsCode').then(res => {
                if (res.status === 200) {
                    this.collectionItemsCodeOptions = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
            commonApi.getDataDic('distributionType').then(res => {
                if (res.status === 200) {
                    this.distributionTypeOptions = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
            commonApi.getDataDic('compFirmlyType').then(res => {
                if (res.status === 200) {
                    this.compFirmlyTypeOptions = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        postStoreTaxdistributionList() {
            const data = {
                ...this.searchForm,
                ...this.page
            }
          distributionManagementApis.postStoreTaxdistributionList(data).then(res => {
              if (res.status === 200) {
                  const { list, pageSize, totalPage, currPage } = res.result
                  this.page = {
                      ...this.page,
                      totalPage,
                      currPage,
                      pageSize,
                  }
                  this.tableData = list
              } else {
                  this.$message.error(res.message)
              }
          })
        },
      onSubmit() {
        this.tableData = []
        this.page.currPage = 1
        this.getBaseratiocallbackList()
      },
      handleCurrentChange(val) {
        this.tableData = []
        this.page.currPage = val
        this.postStoreTaxdistributionList()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
