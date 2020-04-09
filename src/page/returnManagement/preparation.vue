<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
        <el-form-item label="工会经费编码：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属税期：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处理状态：">
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
        <el-table-column prop="name" label="所属税期" width="80"></el-table-column>
        <el-table-column prop="date" label="所属区" width="180"></el-table-column>
        <el-table-column prop="date" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="date" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="date" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="date" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="date" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="date" label="计税依据" width="180"></el-table-column>
        <el-table-column prop="date" label="税率" width="180"></el-table-column>
        <el-table-column prop="date" label="实缴金额" width="180"></el-table-column>
        <el-table-column prop="date" label="收款国库" width="180"></el-table-column>
        <el-table-column prop="date" label="处理结果" width="180"></el-table-column>
        <el-table-column prop="date" label="处理状态" width="180"></el-table-column>
        <el-table-column prop="date" label="返还日期" width="180"></el-table-column>
        <el-table-column prop="date" label="返还金额" width="180"></el-table-column>
        <el-table-column label="操作" width="200">
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
          <el-select size="mini" v-model="form.region" placeholder="请选择" style="width:250px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返还日期">
          <el-date-picker
            size="mini"
            style="width:250px"
            v-model="form.region"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理结果">
          <el-input size="mini" v-model="form.name" autocomplete="off" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"  size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"  size="mini">确 定</el-button>
      </div>
    </el-dialog>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      onSubmit() {
        this.page.currPage = 1
        this.tableData = []
        console.log('submit!');
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
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