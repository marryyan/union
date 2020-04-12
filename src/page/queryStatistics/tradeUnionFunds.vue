<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-date-picker
            size="mini" v-model="formInline.user"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
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
        <el-table-column prop="name" label="税款所属期" width="180"></el-table-column>
        <el-table-column prop="date" label="所属区"></el-table-column>
        <el-table-column prop="date" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="date" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="date" label="电子税票号码" width="180"></el-table-column>
        <el-table-column prop="date" label="征收品目"></el-table-column>
        <el-table-column prop="date" label="征收品目代码" width="180"></el-table-column>
        <el-table-column prop="date" label="税款所属期起" width="180"></el-table-column>
        <el-table-column prop="date" label="税款所属期止" width="180"></el-table-column>
        <el-table-column prop="date" label="计税依据"></el-table-column>
        <el-table-column prop="date" label="税率"></el-table-column>
        <el-table-column prop="date" label="实缴金额"></el-table-column>
        <el-table-column prop="date" label="收款国库"></el-table-column>
        <el-table-column prop="date" label="征收税务机关" width="180"></el-table-column>
        <el-table-column prop="date" label="登记序号"></el-table-column>
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
  export default {
    data() {
      return {
        formInline: {
          user: '',
          name: ''
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
        }
      }
    },
    methods: {
      onSubmit() {
        this.page.currPage = 1
        this.tableData = []
        console.log('submit!');
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
