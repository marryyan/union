<template>
  <div class="wrapper">
    <div class="flex-right">
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="addInfo">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="序号"></el-table-column>
        <el-table-column prop="date" label="缴费类型"></el-table-column>
        <el-table-column prop="date" label="省"></el-table-column>
        <el-table-column prop="date" label="市"></el-table-column>
        <el-table-column prop="date" label="区县"></el-table-column>
        <el-table-column prop="date" label="企业"></el-table-column>
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
export default {
  components: {
    DialogCommon
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      page:{
        currPage:1, // 当前页
        pageSize: 10, // 每页条数
        totalPage: 100, // 总页数
      },
      centerText: '是否确定删除该拨付比例设置信息？',
      centerDialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
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
    handleDelete(index, row) {
      console.log(row)
      this.centerDialogVisible = true
    },
    sureDelDialog(){
      this.centerDialogVisible = false
    },
    cancleDelDialog(){
      this.centerDialogVisible = false
    },
    handleCurrentChange(val) {
      this.tableData = []
      this.page.currPage = val
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>