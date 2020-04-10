<template>
  <div class="wrapper">
    <div class="flex-right">
      <!-- 此处检索条件是否是select框不明确 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属区：">
          <el-select size="mini" v-model="formInline.belongsArea" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会经费编码：">
          <el-input size="mini" v-model="formInline.unionFundCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属税期：">
          <el-input size="mini" v-model="formInline.taxPeriod" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input size="mini" v-model="formInline.compCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input size="mini" v-model="formInline.taxPayer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处理状态：">
          <el-select size="mini" v-model="formInline.processStatus" placeholder="请输入">
            <el-option
              v-for="item in options"
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
        <el-table-column prop="taxPeriod" label="所属税期" width="80"></el-table-column>
        <el-table-column prop="belongsArea" label="所属区" width="180"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="unionAccount" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据" width="180"></el-table-column>
        <el-table-column prop="taxRate" label="税率" width="180"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额" width="180"></el-table-column>
        <el-table-column prop="receiveTreasury" label="收款国库" width="180"></el-table-column>
        <el-table-column prop="processResult" label="处理结果" width="180"></el-table-column>
        <el-table-column prop="processStatus" label="处理状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.processStatus == '0'">未处理</span>
            <span v-if="scope.row.processStatus == '1'">已直拨</span>
            <span v-if="scope.row.processStatus == '2'">已回拨</span>
            <span v-if="scope.row.processStatus == '3'">已拨区县工会集中户</span>
          </template>
        </el-table-column>
        <el-table-column prop="backDate" label="返还日期" width="180"></el-table-column>
        <el-table-column prop="backMoney" label="返还金额" width="180"></el-table-column>
        <el-table-column label="操作" width="200">
          <!-- 当状态为几的时候显示处理回拨按钮 -->
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">处理回拨</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="margin: 15px 0"
      @current-change="handleCurrentChange" 
      :current-page.sync="page.currPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.totalPage">
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
        <el-form-item label="返还金额">
          <el-input size="mini" v-model="form.backMoney" autocomplete="off" style="width:250px"></el-input>
        </el-form-item>
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
import { returnManagementApis } from '@/http/api'
  export default {
    data() {
      return {
        formInline: {
          "belongsArea": "", //所属区
          "unionFundCode": "", //工会经费编码
          "taxPeriod": "", //税期
          "compCode":"",// 统一社会信用代码
          "taxPayer":"", // 单位名称
          "processStatus":'' //处理状态
        },
        tableData: [],
        page:{
          currPage:1, // 当前页
          pageSize: 10, // 每页条数
          totalPage: 100, // 总页数
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        dialogFormVisible: false,
        form: {
          "id":"", // 列表的id
          "backDate":"", // 拨付日期
          "processStatus":"", //处理状态-0：未处理， 1：已直拨 2：已回拨 3：已拨区县工会集中户
          "processResult":"", // 处理结果
          "backMoney":"" //拨付金额
        },
        formLabelWidth: '120px'
      }
    },
    mounted(){
      this.postStoretaxcallbackGhjfList()
    },
    methods: {
      // 列表
      postStoretaxcallbackGhjfList(){
        let data = {
          "belongsArea": this.formInline.belongsArea, //所属区
          "unionFundCode": this.formInline.unionFundCode, //工会经费编码
          "taxPeriod": this.formInline.taxPeriod, //税期
          "compCode":this.formInline.compCode,// 统一社会信用代码
          "taxPayer":this.formInline.taxPayer, // 单位名称
          "processStatus":this.formInline.processStatus, //处理状态
          "currPage":this.page.currPage,
          "pageSize":this.page.pageSize,
        }
        returnManagementApis.postStoretaxcallbackGhjfList(data).then( res=> {
          this.tableData = res.result.list
          this.page.totalPage = res.result.totalCount
        })
      },
      onSubmit() {
        this.page.currPage = 1
        this.tableData = []
        this.postStoretaxcallbackGhjfList()
      },
      handleEdit(index, row) {
        this.form = {}
        this.dialogFormVisible = true
        this.form = row
        this.form.processStatus = row.processStatus.toString()
      },
      sureHandle(){
        returnManagementApis.postStoretaxcallbackUpdate({
          "id":this.form.id, // 列表的id
          "backDate":this.form.backDate, // 拨付日期
          "processStatus":this.form.processStatus, //处理状态-0：未处理， 1：已直拨 2：已回拨 3：已拨区县工会集中户
          "processResult":this.form.processResult, // 处理结果
          "backMoney":this.form.backMoney //拨付金额
        }).then(res => {
          if(res.status == 200){
            this.$message.success('处理回拨成功！');
            this.tableData = []
            this.page.currPage = 1
            this.postStoretaxcallbackGhjfList()
            this.dialogFormVisible = false
          }else{
            this.$message.error(res.message);
          }
        })
      },
      handleCurrentChange(val) {
        this.tableData = []
        this.page.currPage = val
        this.postStoretaxcallbackGhjfList()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>