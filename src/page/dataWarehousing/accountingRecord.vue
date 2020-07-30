<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="征收税期：">
          <el-date-picker
            size="mini"
            v-model="searchForm.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-cascader size="mini" v-model="searchForm.taxBelongsComp" placeholder="请选择" :options="selectbynameOption" filterable></el-cascader>
        </el-form-item>
        <el-form-item label="国库名称：">
          <el-input size="mini" v-model="searchForm.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
<!--          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="taxPeriod" label="征收税期"></el-table-column>
        <el-table-column prop="taxBelongsComp" label="税局名称"></el-table-column>
        <el-table-column prop="shouldPay" label="应缴金额"></el-table-column>
        <el-table-column prop="accountName" label="国库名称"></el-table-column>
        <el-table-column prop="accountNumber" label="国库账号"></el-table-column>
        <el-table-column prop="receiveTreasuryPay" label="国库收入金额" min-width="180"></el-table-column>
        <el-table-column prop="accountDifference" label="金额差异"></el-table-column>
        <el-table-column prop="accountCheckingStatusText" label="是否对上"></el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
<!--            金额差异不为0： 不能入库， 为0时： 是否入库， 点击入库成功后： 已入库          -->
            <div style="color: #EC536B" v-if="scope.row.inStorageStatus == 0">未入库</div>
            <div style="color: #24C789" v-if="scope.row.inStorageStatus == 1">已入库</div>
            <el-button size="mini" type="text" style="color: #24C789; border: 0" v-if="scope.row.accountCheckingStatus == 1"
                       @click="handleInstorage(scope.$index, scope.row)">确认入库</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="备注"></el-table-column>
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
    import { dataStorageApis, commonApi, basicFileApis } from '@/http/api'
    export default {
        data() {
            return {
                searchForm: {
                    accountCheckingStatus: '',
                    inStorageStatus: '',
                    versionNo: ''
                },
                accountCheckingStatusVos: [],
                inStorageStatusVos: [],
                versionNoVos: [],
                tableData: [],
                page:{
                    currPage: 1, // 当前页
                    pageSize: 30, // 每页条数
                    totalPage: 100, // 总页数
                },
                centerText: '是否确定删除该入库对账信息？',
                centerDialogVisible: false,
                selectbynameOption: []
            }
        },
        mounted() {
            commonApi.getDataDic('accountCheckingStatus').then(res => {
                if (res.status === 200) {
                    this.accountCheckingStatusVos = res.result
                } else {
                    this.$message.error('获取对账状态字典失败')
                }
            })
            commonApi.getDataDic('versionNo').then(res => {
                if (res.status === 200) {
                    this.versionNoVos = res.result
                } else {
                    this.$message.error('获取对账编号字典失败')
                }
            })
            commonApi.getDataDic('inStorageStatus').then(res => {
                if (res.status === 200) {
                    this.inStorageStatusVos = res.result
                } else {
                    this.$message.error('获取入库状态字典失败')
                }
            })
            this.postStoreStoreversionList()
            this.postBasetaxinfoSelectbyname()
        },
        methods: {
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
            postStoreStoreversionList () {
                dataStorageApis.postStoreStoreversionList({ ...this.page, ...this.searchForm }).then(res => {
                    const { status, result } = res
                    if (status === 200) {
                        const { list, totalPage } = result
                        this.tableData = list
                        this.page.totalPage = totalPage
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            onSubmit() {
                // this.searchForm.taxBelongsComp = this.searchForm.taxBelongsComp ? this.searchForm.taxBelongsComp.pop() : ''
                this.searchForm.taxBelongsComp = typeof this.searchForm.taxBelongsComp == 'object' ? this.searchForm.taxBelongsComp.pop() : this.searchForm.taxBelongsComp
                this.page.currPage = 1
                this.tableData = []
                this.postStoreStoreversionList()
            },
            handleInstorage(index, row) {
                dataStorageApis.postStoreInstorage({id: row.id}).then(res => {
                    if (res.status === 200) {
                        this.$message.success('入库成功')
                        this.page.currPage = 1
                        this.tableData = []
                        this.postStoreStoreversionList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleCurrentChange(val) {
                this.page.currPage = val
                this.tableData = []
                this.postStoreStoreversionList()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
