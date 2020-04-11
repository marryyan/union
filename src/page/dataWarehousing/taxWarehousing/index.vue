<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属税期：">
          <el-input size="mini" v-model="formInline.taxPeriod" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属区：">
          <el-select v-model="formInline.taxPeriod" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税款所属 税务机关:">
          <el-select v-model="formInline.taxPeriod" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款国库：">
          <el-select v-model="formInline.taxPeriod" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="征收品目：">
          <el-select v-model="formInline.taxPeriod" placeholder="请选择" size="mini">
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
      <div class="operation_btns">
        <el-button size="mini" type="warning">xls导入</el-button>
        <!-- <el-button size="mini" type="warning" @click="clickAnalysis">分析（足额）</el-button> -->
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="所属税期"></el-table-column>
        <el-table-column prop="belongsArea" label="所属区"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="ticketNumber" label="电子税票号码" width="180"></el-table-column>
        <el-table-column prop="collectionItems" label="征收品目"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="征收品目代码" width="180"></el-table-column>
        <el-table-column prop="taxStart" label="税款所属期起" width="180"></el-table-column>
        <el-table-column prop="taxEnd" label="税款所属期止" width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="receiveTreasury" label="收款国库"></el-table-column>
        <el-table-column prop="taxCollectionAuthority" label="征收税务机关" width="180"></el-table-column>
        <el-table-column prop="registCode" label="登记序号"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">确认提交</el-button>
            <el-button size="mini" type="warning"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 弹窗 -->
    <DialogCommon 
    :centerText="centerText" 
    :centerDialogVisible="centerDialogVisible" 
    @delDialog="sureDelDialog"
    @cancleDialog="cancleDelDialog"></DialogCommon>
    </div>
  </div>
</template>
<script>
import DialogCommon from '@/components/dialogCommon';
import {dataStorageApis} from '@/http/api'
export default {
  components: {
    DialogCommon
  },
  data() {
    return {
      formInline: {
        "taxPeriod": "", //税期
        "collectionItems": "", //征收品目
        "belongsArea": "", //所属区
        "receiveTreasury": "", // 收款国库
        "compCode": "", //社会信用代码（纳税人识别号）
        "taxPayer": "", // 那随人名称
        "taxCollectionAuthority":""// 征收税务机关
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
      value: '',
      tableData: [],
      page:{
        currPage:1, // 当前页
        pageSize: 10, // 每页条数
        totalPage: 100, // 总页数
      },
      centerText: '是否确定删除该税务入库信息？',
      centerDialogVisible: false,
      deleteId: ''
    }
  },
  mounted(){
    this.postStoreStoretaxtempList()
  },
  methods: {
    // 列表
    postStoreStoretaxtempList(){
      let data = {
        "taxPeriod": this.formInline.taxPeriod, //税期
        "collectionItems": this.formInline.collectionItems, //征收品目
        "belongsArea": this.formInline.belongsArea, //所属区
        "receiveTreasury": this.formInline.receiveTreasury, // 收款国库
        "compCode": this.formInline.compCode, //社会信用代码（纳税人识别号）
        "taxPayer": this.formInline.taxPayer, // 那随人名称
        "taxCollectionAuthority": this.formInline.taxCollectionAuthority,// 征收税务机关
        "currPage":this.page.currPage,
        "pageSize":this.page.pageSize,
      }
      dataStorageApis.postStoreStoretaxtempList(data).then( res=> {
        this.tableData = res.result.list
        this.page.totalPage = res.result.totalCount
      })
    },
    // 足额分析
    postStoreStoretaxtempHasfulllist(){
      let data = {
        "taxPeriod": this.formInline.taxPeriod, //税期
        "collectionItems": this.formInline.collectionItems, //征收品目
        "belongsArea": this.formInline.belongsArea, //所属区
        "receiveTreasury": this.formInline.receiveTreasury, // 收款国库
        "compCode": this.formInline.compCode, //社会信用代码（纳税人识别号）
        "taxPayer": this.formInline.taxPayer, // 那随人名称
        "taxCollectionAuthority": this.formInline.taxCollectionAuthority,// 征收税务机关
        "currPage":this.page.currPage,
        "pageSize":this.page.pageSize,
      }
      dataStorageApis.postStoreStoretaxtempHasfulllist(data).then( res=> {
        this.tableData = res.result.list
        this.page.totalPage = res.result.totalCount
      })
    },
    onSubmit() {
      this.page.currPage = 1
      this.tableData = []
      this.postStoreStoretaxtempList()
    },
    // 分析足额
    clickAnalysis(){
      this.tableData = []
      this.postStoreStoretaxtempHasfulllist()
    },
    handleEdit(index, row) {
      this.$router.push({
        path: `/taxWarehousingInfoHandle?id=${row.id}`
      })
    },
    handleDelete(index, row) {
      this.centerDialogVisible = true
      this.deleteId = row.id
    },
    sureDelDialog(){
      this.centerDialogVisible = false
      dataStorageApis.postStoreStoretaxtempDelete({
        ids: this.deleteId
      }).then(res => {
        if (res.status == 200) {
          this.$message.success('删除成功！');
          this.page.currPage = 1
          this.tableData = []
          this.postStoreStoretaxtempList()
        }
      })
    },
    cancleDelDialog(){
      this.centerDialogVisible = false
    },
    handleCurrentChange(val) {
      this.tableData = []
      this.page.currPage = val
      this.postStoreStoretaxtempList()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
