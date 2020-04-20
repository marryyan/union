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
        <el-form-item label="经费类型：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税款所属 税务机关：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input size="mini" v-model="formInline.master" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码：">
          <el-input size="mini" v-model="formInline.master" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分配状态：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业认定：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会类别：">
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
        <el-table-column prop="name" label="所属税期"></el-table-column>
        <el-table-column prop="date" label="所属区"></el-table-column>
        <el-table-column prop="date" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="date" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="date" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="date" label="职工人数"></el-table-column>
        <el-table-column prop="date" label="计税依据"></el-table-column>
        <el-table-column prop="date" label="税率"></el-table-column>
        <el-table-column prop="date" label="实缴金额"></el-table-column>
        <el-table-column prop="date" label="应缴金额"></el-table-column>
        <el-table-column prop="date" label="企业认定"></el-table-column>
        <el-table-column prop="date" label="工会类别"></el-table-column>
        <el-table-column prop="date" label="缴费类型"></el-table-column>
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
          "dataType": 3, // 1 : 工会经费 2： 筹备金 3 小微企业 
          "taxPeriod":null, // 税款所属期
          "taxPayer":null, //企业名称
          "compCode":null,//社会统一信用代码
          "unionType":null, //工会类别 字典: unionType
          "taxBelongsComp":null, //  税款所属税务机关 检索下拉框税务局下拉的接口， 只要文本，不要id
          "collectionItemsCode":null, // 缴费类型=征收品目 字典key:collectionItemsCode
          "distributionType":null, // 分配状态 字典key:distributionType
          "compFirmlyType": "2", //企业认定：0 正常缴费企业 ，1：试点企业 2：微型企业 ,3:小型企业  字典key：compFirmlyType
        },
        tableData: [],
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
