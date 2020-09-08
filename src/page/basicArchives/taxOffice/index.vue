<template>
  <div class="wrapper wrapper-flex">
    <div class="flex-left" v-if="showTree">
      <div class="flex-left-icon" @click="handleSlideLeft" v-if="showTree">
          <i class="el-icon-s-fold"></i>收起
      </div>
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="flex-right">
      <div class="flex-left-icon" @click="handleSlideRight" v-if="!showTree">
            <i class="el-icon-s-unfold"></i>展开
        </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="税务局名称：">
          <el-input size="mini" v-model="formInline.taxName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="归集账户名称：">
          <el-input size="mini" v-model="formInline.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="onSubmit">检索</div>
          <!-- <el-button size="mini" type="primary" @click="onSubmit">检索</el-button> -->
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <!-- <el-button class="xlsButton" size="mini" type="warning">xls导入</el-button> -->
        <el-button class="xlsButton" size="mini" type="warning" @click="addInfo">新建</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxTreeId" label="序号"></el-table-column>
        <el-table-column label="税务局名称" min-width="180">
          <template slot-scope="scope">
            <div class="hover-color" @click="handleDetail(scope.$index, scope.row)">{{scope.row.taxName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="collTaxComp" label="征收税务机关" min-width="180"></el-table-column>
        <el-table-column prop="accountName" label="归集账户名称" min-width="180"></el-table-column>
        <el-table-column prop="accountNumber" label="归集账户号" min-width="180"></el-table-column>
        <el-table-column prop="master" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="180"></el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="text" style="color: #EC536B; border: 0"
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
    </div>
    <!-- 弹窗 -->
    <DialogCommon
    :centerText="centerText"
    :centerDialogVisible="centerDialogVisible"
    @delDialog="sureDelDialog"
    @cancleDialog="cancleDelDialog"></DialogCommon>
  </div>
</template>
<script>
import DialogCommon from '@/components/dialogCommon';
import { basicFileApis } from '@/http/api'
export default {
  components: {
    DialogCommon
  },
  data() {
    return {
      formInline: {
        "taxName":"",//税所名称
        "accountName":"",//账户名称
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      treeId:"",//总工会id（点击左侧树节点的id）
      tableData: [],
      page:{
        currPage:1, // 当前页
        pageSize: 20, // 每页条数
        totalPage: 100, // 总页数
      },
      centerText: '是否确定删除该税所机构库信息？',
      centerDialogVisible: false,
      deleteId: '',
      showTree: true
    }
  },
  mounted(){
    this.getBasebasetaxtreetree()
    this.postBasebasetaxinfoPage()
  },
  methods: {
    handleSlideLeft(){
        this.showTree = false
    },
    handleSlideRight(){
        this.showTree = true
    },
    // 左树
    getBasebasetaxtreetree(){
      basicFileApis.getBasebasetaxtreetree().then(res => {
        if(res.status == '200'){
          this.data.push(res.result)
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 列表
    postBasebasetaxinfoPage(){
      let data = {
        "currPage":this.page.currPage,//当前页
        "pageSize":this.page.pageSize,//每页条数
        ...this.formInline,
        "treeId":this.treeId,//所属税所树id（点击左侧树节点的id）
      }
      basicFileApis.postBasebasetaxinfoPage(data).then(res => {
        if(res.status == '200'){
          this.tableData = res.result.list
          this.page.totalPage = res.result.totalCount
        }else{
          this.$message.error(res.message);
        }
      })
    },
    onSubmit() {
      this.page.currPage = 1
      this.tableData = []
      this.postBasebasetaxinfoPage()
    },
    handleNodeClick(data) {
      this.tableData = []
      this.treeId = data.id
      this.postBasebasetaxinfoPage()
    },
    addInfo(){
      // if(!isNaN(this.treeId) && this.treeId){
      if(this.treeId){
        this.$router.push({
          path: `/taxOfficeInfoAdd?treeId=${this.treeId}`
        })
      }else{
        this.$message.error('请先选择左侧有效机构后再进行操作！');
      }
    },
    handleEdit(index, row) {
      // if(!isNaN(this.treeId) && this.treeId){
      if(this.treeId){
        this.$router.push({
        path: `/taxOfficeInfoEdit?treeId=${this.treeId}&id=${row.id}`
      })
      }else{
        this.$message.error('请先选择左侧有效机构后再进行操作！');
      }
    },
    handleDetail(index, row){
      this.$router.push({
        path: `/taxOfficeInfoDetail?id=${row.id}`
      })
    },
    handleDelete(index, row) {
      this.deleteId = row.id
      this.centerDialogVisible = true
    },
    sureDelDialog(){
      this.centerDialogVisible = false
        basicFileApis.getBasebasetaxinfoDelete({
        id: this.deleteId
      }).then(res => {
        if (res.status == 200) {
          this.$message.success('删除成功！');
          this.page.currPage = 1
          this.tableData = []
          this.postBasebasetaxinfoPage()
        }else{
          this.$message.error(res.message);
        }
      })
    },
    cancleDelDialog(){
      this.centerDialogVisible = false
    },
    handleCurrentChange(val) {
      this.tableData = []
      this.page.currPage = val
      this.postBasebasetaxinfoPage()
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-left-icon{
    font-size: 16px;
    margin-bottom: 20px;
    color: #999;
    cursor: pointer;
    i{
        font-size: 18px;
        margin-right: 5px;
    }
}
</style>
