<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-date-picker
            size="mini"
            v-model="searchForm.taxPeriod"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-cascader size="mini" v-model="searchForm.taxBelongsCompId" placeholder="请选择" :options="selectbynameOption" filterable></el-cascader>
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
        <el-form-item label="企业认定：">
          <el-select size="mini" v-model="searchForm.compFirmlyType" placeholder="请输入">
            <el-option
              v-for="item in compFirmlyTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配时间：">
          <el-date-picker
            size="mini"
            v-model="daterange"
            type="daterange"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button class="xlsButton" size="mini" type="warning" @click="exportList">导出</el-button>
        <el-button class="xlsButton" size="mini" type="warning" @click="choosedistribution">经费分配</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="taxPeriod" label="所属税期" min-width="200"></el-table-column>
        <el-table-column prop="belongsAreaName" label="所属区" min-width="180"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" min-width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" min-width="250"></el-table-column>
        <el-table-column prop="unionFundCode" label="工会经费编码" min-width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" min-width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" min-width="180"></el-table-column>
        <el-table-column prop="unionAccount" label="工会开户名称" min-width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据" min-width="180"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额" min-width="180"></el-table-column>
        <el-table-column prop="compFirmlyType" label="企业认定"></el-table-column>
        <el-table-column prop="unionType" label="工会类别"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="缴费类型" min-width="180"></el-table-column>
        <el-table-column prop="provincePercent" label="省总分配比例" min-width="180"></el-table-column>
        <el-table-column prop="provinceMoney" label="省总分配金额" min-width="180"></el-table-column>
        <el-table-column prop="cityPercent" label="市总分配比例" min-width="180"></el-table-column>
        <el-table-column prop="cityMoney" label="市总分配金额" min-width="180"></el-table-column>
        <el-table-column prop="serviceChargePercent" label="手续费"></el-table-column>
        <el-table-column prop="serviceChargeMoney" label="手续费金额" min-width="180"></el-table-column>
        <el-table-column prop="areaIndustryPercent" label="区县/产业分配比例" min-width="180"></el-table-column>
        <el-table-column prop="areaIndustryMoney" label="区县/产业分配金额" min-width="180"></el-table-column>
        <el-table-column prop="compPercent" label="企业分配比例" min-width="180"></el-table-column>
        <el-table-column prop="compMoney" label="企业分配金额" min-width="180"></el-table-column>
        <el-table-column prop="distributionTypeText" label="分配状态"></el-table-column>
        <el-table-column prop="distributionDate" label="分配时间" min-width="100"></el-table-column>
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
    import { distributionManagementApis, commonApi, basicFileApis } from '@/http/api'
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
                    dataType: 1,
                    taxBelongsCompId: '', // 新增
                    distributionDateStart: '',
                    distributionDateEnd: '',
                    compFirmlyType: "", //企业认定：0 正常缴费企业 ，1：试点企业 2：微型企业 ,3:小型企业  字典key：compFirmlyType
                },
                daterange: [], // 日期数组
                page:{
                    currPage: 1, // 当前页
                    pageSize: 15, // 每页条数
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
                selectbynameOption: [],
                distributionList:[], // 经费分配数组
            }
        },
        mounted() {
            this.getDataDic()
            this.postStoreTaxdistributionList()
            this.postBasetaxinfoSelectbyname()
        },
        methods: {
            choosedistribution(){
              if(this.distributionList.length > 0){
                let data = {
                    ids: this.distributionList
                }
                distributionManagementApis.postStoreTaxdistributionDistribution(data).then(res => {
                    if (res.status === 200) {
                        this.$message.success(res.message)
                        this.tableData = []
                        this.page.currPage = 1
                        this.postStoreTaxdistributionList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
              }else{
                this.$message.error('请先选择需要操作的数据！');
              }
            },
            handleSelectionChange(val){
              this.distributionList = []
              val.forEach(item => {
                this.distributionList.push(item.id)
              })
            },
            changeDate(e) {
                this.searchForm.distributionDateStart = e[0]
                this.searchForm.distributionDateEnd = e[1]
            },
            // 导出
            exportList(){
                let formString = `taxPeriod=${this.searchForm.taxPeriod}&taxBelongsComp=${this.searchForm.taxBelongsComp}&collectionItemsCode=${this.searchForm.collectionItemsCode}&taxPayer=${this.searchForm.taxPayer}&compCode=${this.searchForm.compCode}&distributionType=${this.searchForm.distributionType}&dataType=${this.searchForm.dataType}&unionType=${this.searchForm.unionType}&taxBelongsCompId=${this.searchForm.taxBelongsCompId}&compFirmlyType=${this.searchForm.compFirmlyType}&distributionDateStart=${this.searchForm.distributionDateStart}&distributionDateEnd=${this.searchForm.distributionDateEnd}`
                let pageString = `currPage=${this.page.currPage}&pageSize=${this.page.pageSize}`
                let url = `/union/store/taxdistribution/downexcel?token=${sessionStorage.getItem('user_token')}&${formString}&${pageString}`
                window.location.href = url
            },
            // 所属工会
            postBasetaxinfoSelectbyname(){
                let data = {
                    taxName: ''
                }
                basicFileApis.postBasetaxinfoSelectbyname(data).then(res => {
                    if(res.status == '200'){
                        res.result.map(item => {
                            this.selectbynameOption.push({
                                value: item.id,
                                label: item.taxName
                            })
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
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
                        // this.page = {
                        //     ...this.page,
                        //     totalPage,
                        //     currPage,
                        //     pageSize,
                        // }
                        this.page.totalPage = res.result.totalCount
                        this.tableData = list
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            onSubmit() {
                this.tableData = []
                this.page.currPage = 1
                const { taxBelongsCompId } = this.searchForm
                if (taxBelongsCompId.length > 0) {
                    const taxbelongsCompId = taxBelongsCompId.pop()
                    this.searchForm.taxBelongsCompId = taxbelongsCompId
                    this.searchForm.taxBelongsComp = taxbelongsCompId && this.selectbynameOption.find(item => item.value === taxbelongsCompId).label
                }
                this.postStoreTaxdistributionList()
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
