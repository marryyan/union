<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="征收税期：">
          <el-input size="mini" v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="国库名称：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="税局名称：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否入库：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="序号" width="80"></el-table-column>
        <el-table-column prop="date" label="征收税期" width="180"></el-table-column>
        <el-table-column prop="date" label="税局名称" width="180"></el-table-column>
        <el-table-column prop="date" label="应缴金额" width="180"></el-table-column>
        <el-table-column prop="date" label="国库名称" width="180"></el-table-column>
        <el-table-column prop="date" label="国库账号" width="180"></el-table-column>
        <el-table-column prop="date" label="国库收入金额" width="180"></el-table-column>
        <el-table-column prop="date" label="金额差异" width="180"></el-table-column>
        <el-table-column prop="date" label="是否对上" width="180"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">是</el-button>
            <el-button size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">否</el-button>
            <el-button size="mini" type="warning"
              @click="handleDelete(scope.$index, scope.row)">入库</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="备注" width="180"></el-table-column>
      </el-table>
      <el-pagination
      style="margin: 15px 0"
      @size-change="handleSizeChange" 
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
export default {
  data() {
    return {
      formInline: {
        user: '',
        name: ''
      },
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
      centerText: '是否确定删除该入库对账信息？',
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
      this.centerDialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>