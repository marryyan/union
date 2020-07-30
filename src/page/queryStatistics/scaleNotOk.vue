<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-date-picker
            size="mini"
            v-model="formInline.taxPeriod"
            value-format="yyyy年MM月"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经费类型：">
          <el-select size="mini" v-model="formInline.collectionItemsCode" placeholder="请输入">
            <el-option
              v-for="item in collectionItemsCodeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-cascader size="mini" v-model="formInline.taxBelongsComp" placeholder="请选择" :options="selectbynameOption" filterable></el-cascader>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input size="mini" v-model="formInline.taxPayer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码：">
          <el-input size="mini" v-model="formInline.compCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分配状态：">
          <el-select size="mini" v-model="formInline.distributionType" placeholder="请输入">
            <el-option
              v-for="item in distributionTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业认定：">
          <el-select size="mini" v-model="formInline.compFirmlyType" placeholder="请输入">
            <el-option
              v-for="item in compFirmlyTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会类别：">
          <el-select size="mini" v-model="formInline.unionType" placeholder="请输入">
            <el-option
              v-for="item in unionTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
<!--          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="所属税期"></el-table-column>
        <el-table-column prop="belongsAreaName" label="所属区"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" min-width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" min-width="180"></el-table-column>
        <el-table-column prop="unionType" label="工会经费编码" min-width="180"></el-table-column>
        <el-table-column prop="compPerson" label="职工人数"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="shoudPay" label="应缴金额"></el-table-column>
        <el-table-column prop="compFirmlyTypeText" label="企业认定"></el-table-column>
        <el-table-column prop="unionTypeText" label="工会类别"></el-table-column>
        <el-table-column prop="collectionItemsCodeText" label="缴费类型"></el-table-column>
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
    import { basicFileApis, commonApi, queryStatsApis } from '@/http/api'
    export default {
        data() {
            return {
                formInline: {
                    "taxPeriod":null, // 税款所属期 yyyy年MM月
                    "taxPayer":null, //企业名称
                    "compCode":null,//社会统一信用代码
                    "unionType":null, //工会类别 字典: unionType
                    "taxBelongsComp":[], //  税款所属税务机关 检索下拉框税务局下拉的接口， 只要文本，不要id
                    taxBelongsCompName: '',
                    "collectionItemsCode":null, // 缴费类型=征收品目 字典key:collectionItemsCode
                    "distributionType":null, // 分配状态 字典key:distributionType
                    "compFirmlyType": "", //企业认定：0 正常缴费企业 ，1：试点企业 2：微型企业 ,3:小型企业  字典key：compFirmlyType
                },
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 30, // 每页条数
                    totalPage: 1, // 总页数
                },
                unionTypeOptions: [],
                collectionItemsCodeOptions: [],
                distributionTypeOptions: [],
                compFirmlyTypeOptions: [],
                selectbynameOption: [],
                taxBelongsCompList:[],
            }
        },
        mounted(){
            this.getDataDic()
            this.postBasetaxinfoSelectbyname()
            this.postCountErrorlist()
        },
        methods: {
            // 获取字典
            getDataDic() {
                // 工会类型
                commonApi.getDataDic('unionType').then(res => {
                    if (res.status === 200) {
                        this.unionTypeOptions = res.result
                    }
                })
                // 缴费类型=征收品目
                commonApi.getDataDic('collectionItemsCode').then(res => {
                    if (res.status === 200) {
                        this.collectionItemsCodeOptions = res.result
                    }
                })
                // 分配状态
                commonApi.getDataDic('distributionType').then(res => {
                    if (res.status === 200) {
                        this.distributionTypeOptions = res.result
                    }
                })
                // 企业认定
                commonApi.getDataDic('compFirmlyType').then(res => {
                    if (res.status === 200) {
                        this.compFirmlyTypeOptions = res.result
                    }
                })
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
            postCountErrorlist(){
                let data = {
                    ...this.formInline,
                    "currPage": this.page.currPage,//当前页
                    "pageSize": this.page.pageSize,//每页显示条数
                    taxBelongsComp: this.formInline.taxBelongsCompName,
                }
                delete data.taxBelongsCompName
                queryStatsApis.postCountErrorlist(data).then(res => {
                    if(res.status == '200') {
                        this.tableData = res.result.list
                        this.page.totalPage = res.result.totalCount
                    }else {
                        this.$message.error(res.message);
                    }
                })
            },
            onSubmit() {
                this.page.currPage = 1
                this.tableData = []
                const { taxBelongsComp } = this.formInline
                if (taxBelongsComp.length > 0) {
                    const taxbelongsCompId = taxBelongsComp.pop()
                    this.formInline.taxBelongsCompName = taxbelongsCompId && this.selectbynameOption.find(item => item.value === taxbelongsCompId).label
                }
                this.postCountErrorlist()
            },
            handleCurrentChange(val) {
                this.tableData = []
                this.page.currPage = val
                this.postCountErrorlist()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
