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
        <el-form-item label="工会名称：">
          <el-input size="mini" v-model="formInline.unionName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input size="mini" v-model="formInline.master" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
            <div class="submit-btn" @click="onSubmit">检索</div>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button class="xlsButton" size="mini" type="warning" @click="addInfo">新建</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sequenceNumber" label="序号"></el-table-column>
        <el-table-column label="工会名称">
          <template slot-scope="scope">
            <div class="hover-color" @click="handleDetail(scope.$index, scope.row)">{{scope.row.unionName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="unionRank" label="工会级次"></el-table-column>
        <el-table-column prop="unionAddress" label="工会地址"></el-table-column>
        <el-table-column prop="accountName" label="工会账户名称" min-width="180"></el-table-column>
        <el-table-column prop="accountNumber" label="工会账户号" min-width="180"></el-table-column>
        <el-table-column prop="master" label="负责人"></el-table-column>
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
    import {basicFileApis, commonApi } from '@/http/api'
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
                unionRankOptions: [],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                treeId:"",//总工会id（点击左侧树节点的id）
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 15, // 每页条数
                    totalPage: 100, // 总页数
                },
                centerText: '是否确定删除该组织机构会信息？',
                centerDialogVisible: false,
                deleteId: '',
                showTree: true
            }
        },
        mounted(){
            this.getBaseBaseuniontree()
            commonApi.getDataDic('unionRank').then(res => {
                if (res.status === 200) {
                    this.unionRankOptions = res.result
                    this.postBaseunioninfo()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        methods: {
            handleSlideLeft(){
                this.showTree = false
            },
            handleSlideRight(){
                this.showTree = true
            },
            getBaseBaseuniontree(){
                basicFileApis.getBaseBaseuniontree().then(res => {
                    this.data.push(res.result)
                })
            },
            postBaseunioninfo(){
                let data = {
                    "treeId":this.treeId,//总工会id（点击左侧树节点的id）
                    "currPage":this.page.currPage,//当前页
                    "pageSize":this.page.pageSize,//每页条数
                    ...this.formInline
                }
                basicFileApis.postBaseunioninfoPage(data).then(res => {
                    this.tableData = res.result.list.map((item, index) => {
                        return {
                            ...item,
                            // unionRankText: item.unionRank ? this.unionRankOptions.find(it => it.k === item.unionRank).v : '',
                            sequenceNumber: index + 1 + ((res.result.currPage - 1) * res.result.pageSize)
                        }
                    })
                    this.page.totalPage = res.result.totalCount
                    this.page.currPage = res.result.currPage
                    this.page.pageSize = res.result.pageSize
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
                this.centerDialogVisible = false;
                basicFileApis.postBaseBaseunioninfoDelete({
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
