<template>
  <div class="wrapper">
    <div class="flex-right">
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="对方名称：">
          <el-input size="mini" v-model="formInline.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="征收税期：">
          <el-date-picker
            size="mini"
            v-model="formInline.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="税款所属机关：">
          <el-select v-model="value" placeholder="请选择"  size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对方账号：">
          <el-input size="mini" v-model="formInline.accountNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form> -->
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="exportList">下载模板</el-button>
        <el-upload
          class="upload-demo"
          action="/union/sys/sysfile/upload"
          :limit="1"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :file-list="fileList">
          <el-button size="small" type="warning">xls导入</el-button>
        </el-upload>
        <el-button size="mini" type="warning" @click="submitEdit">确认提交</el-button>
        <el-button size="mini" type="warning" @click="submitDelete">删除</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="征收税期"></el-table-column>
        <el-table-column prop="proDate" label="日期"></el-table-column>
        <el-table-column prop="transactionType" label="交易类型"></el-table-column>
        <el-table-column prop="certificateCategory" label="凭证种类"></el-table-column>
        <el-table-column prop="certificateCode" label="凭证代码"></el-table-column>
        <el-table-column prop="accountName" label="对方名称"></el-table-column>
        <el-table-column prop="accountNumber" label="对方账号"></el-table-column>
        <el-table-column prop="summary" label="摘要"></el-table-column>
        <el-table-column prop="borrowMoney" label="借方发生额" width="180"></el-table-column>
        <el-table-column prop="loanMoney" label="贷方发生额" width="180"></el-table-column>
        <el-table-column prop="balance" label="余额"></el-table-column>
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
    import { dataStorageApis } from '@/http/api'
    export default {
        components: {
            DialogCommon
        },
        data() {
            return {
                formInline: {
                    "accountName": "", //对方账户名
                    "proDate": "", //日期
                    "accountNumber": "", //对方账户号
                    "summary": "", // 摘要
                },
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 10, // 每页条数
                    totalPage: 100, // 总页数
                },
                centerText: '是否确定删除该银行入库信息？',
                centerDialogVisible: false,
                versionNoList: [], // versionNo列表
                fileList: [],
            }
        },
        mounted(){
            this.postStorebanktempNosubmitlist()
        },
        methods: {
            // 导出
            exportList(){
              let url = `/union/store/storebanktemp/downloadexceltemplate`
              window.location.href = url
            },
            // 确认提交
            submitEdit(){
              dataStorageApis.postStorebanktempSubmit().then(res => {
                if(res.status == '200'){
                  this.$message.success('提交成功！');
                  this.tableData = []
                  this.postStorebanktempNosubmitlist()
                }else{
                  this.$message.error(res.message);
                }
              })
            },
            // 删除
            submitDelete(){
              dataStorageApis.postStorebanktempNosubmitdelete().then(res => {
                if(res.status == '200'){
                  this.$message.success('删除成功！');
                  this.tableData = []
                  this.postStorebanktempNosubmitlist()
                }else{
                  this.$message.error(res.message);
                }
              })
            },
            // 获取数据
            postStorebanktempNosubmitlist(){
                let data = {
                    "currPage": this.page.currPage,
                    "pageSize": this.page.pageSize,
                }
                dataStorageApis.postStorebanktempNosubmitlist(data).then(res=> {
                  if(res.status == '200'){
                    this.tableData = res.result.list
                    this.page.totalPage = res.result.totalCount
                  }else{
                    this.$message.error(res.message);
                  }
                })
            },
            handleCurrentChange(val) {
                this.tableData = []
                this.page.currPage = val
                this.postStorebanktempNosubmitlist()
            },
            sureDelDialog(){
                this.centerDialogVisible = false
            },
            cancleDelDialog(){
                this.centerDialogVisible = false
            },
            uploadSuccess(response, file, fileList) {
                if (response.status === 200) {

                } else {
                    if (response.status === 401) {
                        this.$router.replace({
                            path: '/login'
                        })
                    }
                    this.$message.error = response.message
                }
            },
            beforeUpload(file) {
                if (this.fileList.length > 0) {
                    this.$confirm('是否覆盖当前上传文件？')
                        .then(_ => {
                            this.fileList = []
                            return true
                            done();
                        })
                        .catch(_ => {});
                } else {
                    return true
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
  .upload-demo {
    margin: 0 10px;
  }
</style>
