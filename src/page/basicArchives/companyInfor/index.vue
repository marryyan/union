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
          <el-cascader size="mini" v-model="formInline.unionBelongstoId" placeholder="请选择" :options="selectbynameOption" filterable></el-cascader>
        </el-form-item>
        <el-form-item label="工会类别：">
          <el-select size="mini" v-model="formInline.unionType" placeholder="请选择">
            <el-option
              v-for="item in unionTypeOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工会状态：">
          <el-select size="mini" v-model="formInline.hasUnion" placeholder="请选择">
            <el-option
              v-for="item in hasUnionOptions"
              :key="item.k"
              :label="item.v"
              :value="item.k">
            </el-option>
          </el-select>
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
        <el-tab-pane label="小微企业">
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
            <el-table-column prop="compPerson" label="职工人数"></el-table-column>
            <el-table-column prop="totalAssets" label="资产总额"></el-table-column>
            <el-table-column prop="operatingReceipt" label="营业收入"></el-table-column>
            <el-table-column prop="compStatus" label="企业状态"></el-table-column>
            <el-table-column prop="hasUnion" label="工会状态"></el-table-column>
            <el-table-column prop="compFirmlyType" label="企业认定" width="180"></el-table-column>
            <el-table-column prop="unionType" label="工会类别"></el-table-column>
            <el-table-column prop="unionParentName" label="上级工会"></el-table-column>
            <el-table-column prop="unionCreateDate" label="工会建会时间" width="180"></el-table-column>
            <el-table-column prop="unionHandleBy" label="联系人"></el-table-column>
            <el-table-column prop="unionTel" label="电话"  width="180"></el-table-column>
            <el-table-column prop="taxBelongsComp" label="所属地税分局" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="warning"
                           @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
            <el-table-column prop="compPerson" label="职工人数"></el-table-column>
            <el-table-column prop="totalAssets" label="资产总额"></el-table-column>
            <el-table-column prop="operatingReceipt" label="营业收入"></el-table-column>
            <el-table-column prop="compStatus" label="企业状态"></el-table-column>
            <el-table-column prop="hasUnion" label="工会状态"></el-table-column>
            <el-table-column prop="compFirmlyType" label="企业认定" width="180"></el-table-column>
            <el-table-column prop="unionType" label="工会类别"></el-table-column>
            <el-table-column prop="unionParentName" label="上级工会"></el-table-column>
            <el-table-column prop="unionCreateDate" label="工会建会时间" width="180"></el-table-column>
            <el-table-column prop="unionHandleBy" label="联系人"></el-table-column>
            <el-table-column prop="unionTel" label="电话"  width="180"></el-table-column>
            <el-table-column prop="taxBelongsComp" label="所属地税分局" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="warning"
                           @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            <el-table-column prop="unionManagerCode" label="管理代码" width="180"></el-table-column>
            <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
            <el-table-column prop="unionBelongsto" label="所属系统工会" width="180"></el-table-column>
            <el-table-column prop="compPerson" label="职工人数"></el-table-column>
            <el-table-column prop="totalAssets" label="资产总额"></el-table-column>
            <el-table-column prop="operatingReceipt" label="营业收入"></el-table-column>
            <el-table-column prop="compStatus" label="企业状态"></el-table-column>
            <el-table-column prop="hasUnion" label="工会状态"></el-table-column>
            <el-table-column prop="compFirmlyType" label="企业认定" width="180"></el-table-column>
            <el-table-column prop="unionType" label="工会类别"></el-table-column>
            <el-table-column prop="unionParentName" label="上级工会"></el-table-column>
            <el-table-column prop="unionCreateDate" label="工会建会时间" width="180"></el-table-column>
            <el-table-column prop="unionHandleBy" label="联系人"></el-table-column>
            <el-table-column prop="unionTel" label="电话"  width="180"></el-table-column>
            <el-table-column prop="taxBelongsComp" label="所属地税分局" width="180"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  :headers="{token: userToken}"
                  action="/union/sys/sysfile/upload"
                  :on-success="uploadSuccess"
                  :file-list="fileList"
                  :show-file-list="false"
                  list-type="picture">
                  <el-button size="mini" type="warning" @click="rowId = scope.row.id">上传建会涵</el-button>
                </el-upload>
                <el-button size="mini" type="warning"
                           @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
    </div>
  </div>
</template>
<script>
    import {  basicFileApis, commonApi} from '@/http/api'
    import { getItem } from "../../../helpers";
    export default {
        data() {
            return {
                formInline: {
                    "unionBelongstoId": [],//所属工会id   不能使用公共字典id, <组织机构库>-<右侧工会信息，下拉检索>方法
                    "hasUnion": "", // 是否建会(0:未建会 1:已建会) 字典key：hasUnion
                    "unionType": "", // 工会类型，1 区县工会、 2 ：产业工会  字典key：unionType
                    "compName": "",//企业名称
                    "startDate": "",//建会时间开始
                    "endDate": "",//建会时间结束
                },
                unionTypeOptions: [],
                hasUnionOptions: [],
                selectbynameOption: [],
                daterange: [], // 日期数组
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                treeId: "",//总工会id（点击左侧树节点的id）
                tableData: [],
                page: {
                    currPage: 1, // 当前页
                    pageSize: 10, // 每页条数
                    totalPage: 100, // 总页数
                },
                tabName: '小微企业',
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
                fileList: [],
                formLabelWidth: '120px',
                userToken: '',
                rowId: ''
            }
        },
        mounted() {
            this.getDataDic() // 字典
            this.getBaseBaseuniontree() //左树
            this.postBaseunioninfoSelectbyname() // 所属工会
            this.postPagesmallmicrobusinesses() // 小微企业
            this.userToken = getItem('user_token')
        },
        methods: {
            // 获取字典
            getDataDic() {
                // 工会类型
                commonApi.getDataDic('unionType').then(res => {
                    if (res.status === 200) {
                        this.unionTypeOptions = res.result
                    }
                })
                // 是否建会
                commonApi.getDataDic('hasUnion').then(res => {
                    if (res.status === 200) {
                        this.hasUnionOptions = res.result
                    }
                })
            },
            // 左侧树图
            getBaseBaseuniontree() {
                basicFileApis.getBaseBaseuniontree().then(res => {
                    this.data.push(res.result)
                })
            },
            postBaseunioninfoSelectbyname() {
                let data = {
                    unionName: ''
                }
                basicFileApis.postBaseunioninfoSelectbyname(data).then(res => {
                    if (res.status == '200') {
                        this.selectbynameOption = res.result.map(item => {
                            return {value: item.id, label: item.unionName}
                        })
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            // 小微企业
            postPagesmallmicrobusinesses() {
              console.log(this.formInline.unionBelongstoId)
                let data = {
                    "currPage": this.page.currPage,//当前页
                    "pageSize": this.page.pageSize,//每页显示条数
                    ...this.formInline,
                    "belongsUnionTreeId": this.treeId, // 左侧树形结构的id
                    unionBelongstoId:this.formInline.unionBelongstoId && this.formInline.unionBelongstoId.join(',')
                }
                basicFileApis.postPagesmallmicrobusinesses(data).then(res => {
                    if (res.status == '200') {
                        this.tableData = res.result.list
                        this.page.totalPage = res.result.totalCount
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            // 已建会
            postBaseBasecompanyinfoPagehas() {
                let data = {
                    "currPage": this.page.currPage,//当前页
                    "pageSize": this.page.pageSize,//每页显示条数
                    ...this.formInline,
                    "belongsUnionTreeId": this.treeId, // 左侧树形结构的id
                    unionBelongstoId:this.formInline.unionBelongstoId && this.formInline.unionBelongstoId.join(',')
                }
                basicFileApis.postBaseBasecompanyinfoPagehas(data).then(res => {
                    if (res.status == '200') {
                        this.tableData = res.result.list
                        this.page.totalPage = res.result.totalCount
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            // 未建会
            postBaseBasecompanyinfoPageno() {
                let data = {
                    "currPage": this.page.currPage,//当前页
                    "pageSize": this.page.pageSize,//每页显示条数
                    ...this.formInline,
                    "belongsUnionTreeId": this.treeId, // 左侧树形结构的id
                    unionBelongstoId:this.formInline.unionBelongstoId && this.formInline.unionBelongstoId.join(',')
                }
                basicFileApis.postBaseBasecompanyinfoPageno(data).then(res => {
                    if (res.status == '200') {
                        this.tableData = res.result.list
                        this.page.totalPage = res.result.totalCount
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            changeDate(e) {
                this.formInline.startDate = e[0]
                this.formInline.endDate = e[1]
            },
            onSubmit() {
                this.page.currPage = 1
                this.tableData = []
                if (this.tabName == '已建会') {
                    this.postBaseBasecompanyinfoPagehas()
                } else if (this.tabName == '未建会') {
                    this.postBaseBasecompanyinfoPageno()
                } else if (this.tabName == '小微企业') {
                    this.postPagesmallmicrobusinesses()
                }
            },
            handleNodeClick(data) {
                this.tableData = []
                this.treeId = data.id
                if (this.tabName == '已建会') {
                    this.postBaseBasecompanyinfoPagehas()
                } else if (this.tabName == '未建会') {
                    this.postBaseBasecompanyinfoPageno()
                } else if (this.tabName == '小微企业') {
                    this.postPagesmallmicrobusinesses()
                }
            },
            handleTabClick(tab) {
                this.page.currPage = 1
                this.tableData = []
                this.formInline = {}
                this.daterange = []
                this.tabName = tab.label
                if (this.tabName == '已建会') {
                    this.postBaseBasecompanyinfoPagehas()
                } else if (this.tabName == '未建会') {
                    this.postBaseBasecompanyinfoPageno()
                } else if (this.tabName == '小微企业') {
                    this.postPagesmallmicrobusinesses()
                }
            },
            addInfo() {
                if (this.treeId) {
                    this.$router.push({
                        path: `/companyInforInfoAdd?treeId=${this.treeId}`
                    })
                } else {
                    this.$message.error('请先选择左侧机构后再进行操作！');
                }
            },
            handleDeploy(index, row) {
                this.dialogFormVisible = true
            },
            handleEdit(index, row) {
              if (this.treeId) {
                this.$router.push({
                    path: `/companyInforInfoEdit?id=${row.id}&treeId=${this.treeId}`
                })
              } else {
                this.$message.error('请先选择左侧机构后再进行操作！');
              }
            },
            handleDetail(index, row) {
                this.$router.push({
                    path: `/companyInforDetail?id=${row.id}`
                })
            },
            handleCurrentChange(val) {
                this.tableData = []
                this.page.currPage = val
                if (this.tabName == '已建会') {
                    this.postBaseBasecompanyinfoPagehas()
                } else if (this.tabName == '未建会') {
                    this.postBaseBasecompanyinfoPageno()
                } else if (this.tabName == '小微企业') {
                    this.postPagesmallmicrobusinesses()
                }
            },
            uploadSuccess(response, file, fileList) {
                if (response.status === 200) {
                    console.log('---------', response.result)
                    basicFileApis.postbaseBasecompanyinfoUploadunionLetter({
                        id: this.rowId,
                        unionLetter: response.result
                    }).then(res => {
                        if (res.status === 200) {
                            this.$message.success('上传成功')
                            this.fileList = []
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    if (response.status === 401) {
                        this.$router.replace({
                            path: '/login'
                        })
                    }
                    this.$message.error = response.message
                }
            },
        }
    }
</script>
<style lang="scss" scoped>

</style>
