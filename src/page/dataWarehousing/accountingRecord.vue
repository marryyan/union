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
          <el-select size="mini" v-model="searchForm.versionNo" placeholder="请选择">
            <el-option
              v-for="item in versionNoVos"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国库名称：">
          <el-input size="mini" v-model="searchForm.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="序号"></el-table-column>
        <el-table-column prop="name" label="征收税期"></el-table-column>
        <el-table-column prop="name" label="税局名称"></el-table-column>
        <el-table-column prop="name" label="应缴金额"></el-table-column>
        <el-table-column prop="name" label="国库名称"></el-table-column>
        <el-table-column prop="name" label="国库账号"></el-table-column>
        <el-table-column prop="name" label="国库收入金额" width="180"></el-table-column>
        <el-table-column prop="accountDifference" label="金额差异"></el-table-column>
        <el-table-column prop="accountCheckingStatus" label="是否对上">
          <template slot-scope="scope">
            <span v-if="scope.row.accountCheckingStatus === '0'">未对账</span>
            <span v-if="scope.row.accountCheckingStatus === '1'">已对上</span>
            <span v-if="scope.row.accountCheckingStatus === '2'">未对上</span>
            <span v-if="scope.row.accountCheckingStatus === '-1'">--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
<!--            金额差异不为0： 不能入库， 为0时： 是否入库， 点击入库成功后： 已入库          -->
            <div style="color: #606266" v-if="scope.row.accountDifference !== 0">不能入库</div>
            <div style="color: #e6a23c" v-if="scope.row.accountDifference === 0">已入库</div>
            <el-button size="mini" type="warning" v-if="scope.row.accountDifference === 0"
                       @click="handleInstorage(scope.$index, scope.row)">是否入库</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="备注"></el-table-column>
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
    import { dataStorageApis, commonApi } from '@/http/api'
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
                    pageSize: 10, // 每页条数
                    totalPage: 100, // 总页数
                },
                centerText: '是否确定删除该入库对账信息？',
                centerDialogVisible: false
            }
        },
        created() {
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
        },
        methods: {
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
                this.postStoreStoreversionList()
            },
            addInfo(){
                this.$router.push({
                    path: `/infoAdd`
                })
            },
            handleEdit(index, row) {
                this.$router.push({
                    path: `/infoEdit?id=${row.date}`
                })
            },
            handleDetail(index, row){
                this.$router.push({
                    path: `/infoDetail?id=${row.date}`
                })
            },
            handleInstorage(index, row) {
                dataStorageApis.postStoreInstorage(row).then(res => {
                    if (res.status === 200) {
                        this.$message.success('入库成功')
                        this.postStoreStoreversionList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleCurrentChange(val) {
                this.postStoreStoreversionList()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
