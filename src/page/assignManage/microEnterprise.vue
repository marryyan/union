<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-date-picker
            size="mini"
            v-model="searchForm.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="征收品目：">
          <el-select size="mini" v-model="searchForm.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-select size="mini" v-model="searchForm.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input size="mini" v-model="searchForm.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码：">
          <el-input size="mini" v-model="searchForm.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分配状态：">
          <el-select size="mini" v-model="searchForm.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业认定：">
          <el-select size="mini" v-model="searchForm.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会类别：">
          <el-select size="mini" v-model="searchForm.user" placeholder="请输入">
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
        <el-button size="mini" type="warning">分配(下载打印)</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="所属税期"></el-table-column>
        <el-table-column prop="name" label="所属区"></el-table-column>
        <el-table-column prop="name" label="社会信用代码（纳税人识别号）" width="180"></el-table-column>
        <el-table-column prop="name" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="name" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="name" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="name" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="name" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="name" label="计税依据"></el-table-column>
        <el-table-column prop="name" label="税率"></el-table-column>
        <el-table-column prop="name" label="实缴金额"></el-table-column>
        <el-table-column prop="name" label="企业认定"></el-table-column>
        <el-table-column prop="name" label="工会类别"></el-table-column>
        <el-table-column prop="name" label="缴费类型"></el-table-column>
        <el-table-column prop="name" label="省总分配比例" width="180"></el-table-column>
        <el-table-column prop="name" label="省总分配金额" width="180"></el-table-column>
        <el-table-column prop="name" label="市总分配比例" width="180"></el-table-column>
        <el-table-column prop="name" label="市总分配金额" width="180"></el-table-column>
        <el-table-column prop="name" label="手续费"></el-table-column>
        <el-table-column prop="name" label="手续费金额" width="180"></el-table-column>
        <el-table-column prop="name" label="区县/产业分配比例" width="180"></el-table-column>
        <el-table-column prop="name" label="区县/产业分配金额" width="180"></el-table-column>
        <el-table-column prop="name" label="企业分配比例" width="180"></el-table-column>
        <el-table-column prop="name" label="企业分配金额" width="180"></el-table-column>
        <el-table-column prop="name" label="分配状态"></el-table-column>
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
                searchForm: {

                },
                page:{
                    currPage: 1, // 当前页
                    pageSize: 10, // 每页条数
                    totalPage: 100, // 总页数
                },
                tableData: [],
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
                }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleCurrentChange(val) {
                console.log('val', val)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
