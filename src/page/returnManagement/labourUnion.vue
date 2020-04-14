<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="所属区：">
          <el-select size="mini" v-model="searchForm.belongsArea" placeholder="请输入">
            <el-option
              v-for="item in belongsAreaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会经费编码：">
          <el-input size="mini" v-model="searchForm.unionFundCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属税期：">
          <el-date-picker
            v-model="searchForm.taxPeriod"
            size="mini"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input size="mini" v-model="searchForm.compCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input size="mini" v-model="searchForm.taxPayer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处理状态：">
          <el-select size="mini" v-model="searchForm.processStatus" placeholder="请输入">
            <el-option
              v-for="item in processStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="所属税期"></el-table-column>
        <el-table-column prop="belongsArea" label="所属区"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="unionAccount" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="receiveTreasury" label="收款国库"></el-table-column>
        <el-table-column prop="processResult" label="处理结果"></el-table-column>
        <el-table-column prop="processStatus" label="处理状态">
          <template slot-scope="scope">
            <span v-if="scope.row.processStatus == '0'">未处理</span>
            <span v-if="scope.row.processStatus == '1'">已直拨</span>
            <span v-if="scope.row.processStatus == '2'">已回拨</span>
            <span v-if="scope.row.processStatus == '3'">已拨区县工会集中户</span>
          </template>
<!--          <template slot-scope="scope">-->
<!--            <span v-text="oprocessStatusOptions.find(item => Number(item.k) === scope.row.processStatus).v"></span>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column prop="backDate" label="返还日期" width="100"></el-table-column>
        <el-table-column prop="backMoney" label="返还金额"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
                       @click="handleEdit(scope.row)">处理回拨</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin: 15px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="searchForm.currPage"
        :page-size="searchForm.pageSize"
        layout="prev, pager, next, jumper"
        :total="searchForm.totalPage">
      </el-pagination>
      <!-- 处理回拨 -->
      <el-dialog title="拨付回拨" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="处理状态">
            <el-select size="mini" v-model="form.processStatus" placeholder="请选择" style="width:250px">
              <el-option label="未处理" value="0"></el-option>
              <el-option label="已直拨" value="1"></el-option>
              <el-option label="已回拨" value="2"></el-option>
              <el-option label="已拨区县工会集中户" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="返还日期">
            <el-date-picker
              size="mini"
              style="width:250px"
              v-model="form.backDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
<!--          <el-form-item label="返还金额">-->
<!--            <el-input size="mini" v-model="form.backMoney" autocomplete="off" style="width:250px"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="处理结果">
            <el-input size="mini" v-model="form.processResult" autocomplete="off" style="width:250px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false"  size="mini">取 消</el-button>
          <el-button type="primary" @click="sureHandle"  size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import { returnManagementApis, commonApi } from '@/http/api'
    export default {
        data() {
            return {
                searchForm: {
                    "belongsArea": "", //所属区
                    "unionFundCode": "", //工会经费编码
                    "taxPeriod": "", //税期
                    "compCode":"",// 统一社会信用代码
                    "taxPayer":"", // 单位名称
                    "processStatus":'', //处理状态
                    currPage:1, // 当前页
                    pageSize: 10, // 每页条数
                    totalCount: 100
                },
                tableData: [],
                belongsAreaOptions: [],
                processStatusOptions: [],
                processResultOptions: [],
                dialogFormVisible: false,
                form: {
                    "id":"", // 列表的id
                    "backDate":"", // 拨付日期
                    "processStatus":"", //处理状态-0：未处理， 1：已直拨 2：已回拨 3：已拨区县工会集中户
                    "processResult":"", // 处理结果
                },
            }
        },
        mounted(){
            this.postStoretaxcallbackGhjfList()
            commonApi.getDataDic('belongsArea').then(res => {
                if (res.status === 200) {
                    this.belongsAreaOptions = res.result
                }
            })
            commonApi.getDataDic('processStatus').then(res => {
                if (res.status === 200) {
                    this.processStatusOptions = res.result
                }
            })
            commonApi.getDataDic('processResult').then(res => {
                if (res.status === 200) {
                    this.processResultOptions = res.result
                }
            })
        },
        methods: {
            // 列表
            postStoretaxcallbackGhjfList(){
                const newData = {
                    ...this.searchForm,
                    taxPeriod: this.searchForm.taxPeriod.split('-').join('')
                }
                returnManagementApis.postStoretaxcallbackGhjfList(newData).then(res=> {
                    if (res.status === 200) {
                        this.tableData = res.result.list
                        this.searchForm = {
                            ...this.searchForm,
                            totalCount: res.result.totalCount,
                            pageSize: res.result.pageSize,
                            currPage: res.result.currPage
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            onSubmit() {
                this.postStoretaxcallbackGhjfList()
            },
            handleEdit(row) {
                this.dialogFormVisible = true
                this.form = row
                this.form.processStatus = row.processStatus.toString()
            },
            sureHandle(){
                returnManagementApis.postStoretaxcallbackUpdate(this.form).then(res => {
                    if(res.status == 200){
                        this.form = {}
                        this.$message.success('处理回拨成功！');
                        this.postStoretaxcallbackGhjfList()
                        this.dialogFormVisible = false
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            handleCurrentChange(val) {
                this.searchForm.currPage = val
                this.postStoretaxcallbackGhjfList()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
