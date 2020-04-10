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
        <el-form-item label="所属工会：">
          <el-input size="mini" v-model="formInline.unionBelongsto" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属地税局：">
          <el-input size="mini" v-model="formInline.taxBelongsComp" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属区县：">
          <el-input size="mini" v-model="formInline.areaName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input size="mini" v-model="formInline.compCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input size="mini" v-model="formInline.compName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建会时间段：">
          <el-date-picker
            size="mini"
            v-model="daterange"
            type="daterange"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button size="mini" type="warning">xls导入</el-button>
        <el-button size="mini" type="warning" @click="addInfo">新建</el-button>
      </div>
      <el-tabs type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="已建会">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="单位名称" width="180">
              <template slot-scope="scope">
                <div class="hover-color" @click="handleDetail(scope.$index, scope.row)">{{scope.row.compName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="compCode" label="统一社会信用代码" width="180"></el-table-column>
            <el-table-column prop="unionManagerCode" label="管理代码" width="180"></el-table-column>
            <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
            <el-table-column prop="unionBelongsto" label="所属系统工会" width="180"></el-table-column>
            <el-table-column prop="compPerson" label="职工人数" width="180"></el-table-column>
            <el-table-column prop="unionParentName" label="上级工会" width="180"></el-table-column>
            <el-table-column prop="unionCreateDate" label="工会建会时间" width="180"></el-table-column>
            <el-table-column prop="unionTel" label="电话" width="180"></el-table-column>
            <el-table-column prop="taxBelongsComp" label="所属地税分局" width="180"></el-table-column>
            <el-table-column prop="areaName" label="试点区县" width="180"></el-table-column>
            <el-table-column label="缴费比例" width="200">
              <template slot-scope="scope">
                <el-button size="mini" type="warning"
                  @click="handleDeploy(scope.$index, scope.row)">配置缴费比例</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="warning"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="未建会">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="单位名称" width="180">
              <template slot-scope="scope">
                <div class="hover-color" @click="handleDetail(scope.$index, scope.row)">{{scope.row.compName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="compCode" label="统一社会信用代码" width="180"></el-table-column>
            <el-table-column prop="compPerson" label="职工人数" width="180"></el-table-column>
            <el-table-column prop="compTel" label="电话" width="180"></el-table-column>
            <el-table-column prop="compLegal" label="企业法人" width="180"></el-table-column>
            <el-table-column prop="taxBelongsComp" label="所属地税分局" width="180"></el-table-column>
            <el-table-column prop="areaName" label="试点区县" width="180"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" type="warning"
                  @click="handleEdit(scope.$index, scope.row)">上传建会涵</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
      style="margin: 15px 0"
      @current-change="handleCurrentChange" 
      :current-page.sync="page.currPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.totalPage">
    </el-pagination>
    <!-- 配置缴费比例 -->
    <el-dialog title="配置缴费比例" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="缴费类型">
          <el-select size="mini" v-model="form.region" placeholder="请选择活动区域" style="width:250px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费比例">
          <el-select size="mini" v-model="form.region" placeholder="请选择活动区域" style="width:250px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费比例">
          <el-input size="mini" v-model="form.name" autocomplete="off" style="width:250px"></el-input>%
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
import {basicFileApis} from '@/http/api'
  export default {
    data() {
      return {
        formInline: {
          "unionBelongsto":"",//所属公会
          "taxBelongsComp":"",//所属地税局
          "areaName":"",//所属区县
          "compCode":"",//统一社会信用代码
          "compName":"",//企业名称
          "startDate":"",//建会时间开始
          "endDate":"",//建会时间结束
        },
        daterange:[],
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [],
        page:{
          currPage:1, // 当前页
          pageSize: 10, // 每页条数
          totalPage: 100, // 总页数
        },
        tabName: '已建会',
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
    mounted(){
      this.postBaseBasecompanyinfoPagehas()
    },
    methods: {
      // 已建会
      postBaseBasecompanyinfoPagehas(){
        let data = {
          "currPage":this.page.currPage,//当前页
          "pageSize":this.page.pageSize,//每页显示条数
          "unionBelongsto":this.formInline.unionBelongsto,//所属公会
          "taxBelongsComp":this.formInline.taxBelongsComp,//所属地税局
          "areaName":this.formInline.areaName,//所属区县
          "compCode":this.formInline.compCode,//统一社会信用代码
          "compName":this.formInline.compName,//企业名称
          "startDate":this.formInline.startDate,//建会时间开始
          "endDate":this.formInline.endDate,//建会时间结束
        }
        basicFileApis.postBaseBasecompanyinfoPagehas(data).then(res=> {
          this.tableData = res.result.list
          this.page.totalPage = res.result.totalCount
        })
      },
      // 未建会
      postBaseBasecompanyinfoPageno(){
        let data = {
          "currPage":this.page.currPage,//当前页
          "pageSize":this.page.pageSize,//每页显示条数
          "unionBelongsto":this.formInline.unionBelongsto,//所属公会
          "taxBelongsComp":this.formInline.taxBelongsComp,//所属地税局
          "areaName":this.formInline.areaName,//所属区县
          "compCode":this.formInline.compCode,//统一社会信用代码
          "compName":this.formInline.compName,//企业名称
          "startDate":this.formInline.startDate,//建会时间开始
          "endDate":this.formInline.endDate,//建会时间结束
        }
        basicFileApis.postBaseBasecompanyinfoPageno(data).then(res=> {
          this.tableData = res.result.list
          this.page.totalPage = res.result.totalCount
        })
      },
      changeDate(e){
        this.formInline.startDate = e[0]
        this.formInline.endDate = e[1]
      },
      onSubmit() {
        this.page.currPage = 1
        this.tableData = []
        if(this.tabName == '已建会'){
          this.postBaseBasecompanyinfoPagehas()
        }else{
          this.postBaseBasecompanyinfoPageno()
        }
      },
      handleNodeClick(data) {
        console.log(data);
      },
      handleTabClick(tab) {
        this.page.currPage = 1
        this.tableData = []
        this.formInline.unionBelongsto = ''
        this.formInline.taxBelongsComp = ''
        this.formInline.areaName = ''
        this.formInline.compCode = ''
        this.formInline.compName = ''
        this.formInline.startDate = ''
        this.formInline.endDate = ''
        this.daterange = []
        this.tabName = tab.label
        if(this.tabName == '已建会'){
          this.postBaseBasecompanyinfoPagehas()
        }else{
          this.postBaseBasecompanyinfoPageno()
        }
      },
      addInfo(){
        this.$router.push({
          path: `/companyInforInfoAdd`
        })
      },
      handleDeploy(index, row) {
        this.dialogFormVisible = true
      },
      handleEdit(index, row){
        this.$router.push({
          path: `/companyInforInfoEdit?id=${row.id}`
        })
      },
      handleDetail(index, row){
        this.$router.push({
          path: `/companyInforDetail?id=${row.id}`
        })
      },
      handleCurrentChange(val) {
        this.tableData = []
        this.page.currPage = val
        if(this.tabName == '已建会'){
          this.postBaseBasecompanyinfoPagehas()
        }else{
          this.postBaseBasecompanyinfoPageno()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
