<template>
  <div class="wrapper wrapper-flex">
    <div class="flex-left">
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工会名称：">
          <el-input size="mini" v-model="formInline.unionName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input size="mini" v-model="formInline.master" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button size="mini" type="warning">xls导入</el-button>
        <el-button size="mini" type="warning" @click="addInfo">新建</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="unionTreeId" label="序号"></el-table-column>
        <el-table-column label="工会名称">
          <template slot-scope="scope">
            <div class="hover-color" @click="handleDetail(scope.$index, scope.row)">{{scope.row.unionName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="accountName" label="工会账户名称"></el-table-column>
        <el-table-column prop="accountNumber" label="工会账户号"></el-table-column>
        <el-table-column prop="master" label="负责人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
import { getBaseBaseuniontree, postBaseunioninfoPage, postBaseBaseunioninfoDelete } from '@/http/api'
export default {
  components: {
    DialogCommon
  },
  data() {
    return {
      formInline: {
        "unionName":"",//工会名称
        "master":"",//负责人
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
        pageSize: 10, // 每页条数
        totalPage: 100, // 总页数
      },
      centerText: '是否确定删除该组织机构会信息？',
      centerDialogVisible: false,
      deleteId: ''
    }
  },
  mounted(){
    this.getBaseBaseuniontree()
    this.postBaseunioninfo()
  },
  methods: {
    getBaseBaseuniontree(){
      getBaseBaseuniontree().then(res => {
        this.data.push(res.result)
      })
    },
    postBaseunioninfo(){
      let data = {
        "treeId":this.treeId,//总工会id（点击左侧树节点的id）
        "currPage":this.page.currPage,//当前页
        "pageSize":this.page.pageSize,//每页条数
        "unionName":this.formInline.unionName,//工会名称
        "master":this.formInline.master,//负责人
      }
      postBaseunioninfoPage(data).then(res => {
        this.tableData = res.result.list
        this.page.totalPage = res.result.totalCount
      })
    },
    onSubmit() {
      this.page.currPage = 1
      this.tableData = []
      this.postBaseunioninfo()
    },
    handleNodeClick(data) {
      this.tableData = []
      this.treeId = data.id
      this.postBaseunioninfo()
    },
    addInfo(){
      this.$router.push({
        path: `/infoAdd`
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: `/infoEdit?id=${row.id}`
      })
    },
    handleDelete(index, row) {
      this.centerDialogVisible = true
      this.deleteId = row.id
    },
    sureDelDialog(){
      this.centerDialogVisible = false
      postBaseBaseunioninfoDelete({
        id: this.deleteId
      }).then(res => {
        if (res.status == 200) {
          this.$message.success('删除成功！');
          this.page.currPage = 1
          this.tableData = []
          this.postBaseunioninfo()
        }
      })
    },
    cancleDelDialog(){
      this.centerDialogVisible = false
    },
    handleDetail(index, row){
      this.$router.push({
        path: `/infoDetail?id=${row.id}`
      })
    },
    handleCurrentChange(val) {
      this.tableData = []
      this.page.currPage = val
      this.postBaseunioninfo()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>