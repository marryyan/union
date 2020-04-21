<template>
  <div class="wrapper">
    <div class="flex-right">
      <!-- <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="所属税期：">
          <el-date-picker
            v-model="searchForm.taxPeriod"
            size="mini"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区：">
          <el-select v-model="searchForm.belongsArea" placeholder="请选择" size="mini">
            <el-option
              v-for="item in belongsAreaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税款所属 税务机关:">
          <el-select v-model="searchForm.taxCollectionAuthority" placeholder="请选择" size="mini">
            <el-option
              v-for="item in taxCollectionAuthorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款国库：">
          <el-select v-model="searchForm.receiveTreasury" placeholder="请选择" size="mini">
            <el-option
              v-for="item in receiveTreasuryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="征收品目：">
          <el-select v-model="searchForm.collectionItems" placeholder="请选择" size="mini">
            <el-option
              v-for="item in collectionItemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
          :headers="{token: '666666'}"
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
        <el-table-column prop="taxPeriod" label="所属税期"></el-table-column>
        <el-table-column prop="belongsAreaName" label="所属区"></el-table-column>
        <el-table-column prop="compCode" label="社会信用代码（纳税人识别号）" width="250"></el-table-column>
        <el-table-column prop="taxPayer" label="纳税人名称" width="180"></el-table-column>
        <el-table-column prop="unionFundCode" label="工会经费编码" width="180"></el-table-column>
        <el-table-column prop="unionBank" label="工会开户行" width="180"></el-table-column>
        <el-table-column prop="unionBankAccount" label="工会银行账号" width="180"></el-table-column>
        <el-table-column prop="unionAccount" label="工会开户名称" width="180"></el-table-column>
        <el-table-column prop="ticketNumber" label="电子税票号码" width="180"></el-table-column>
        <el-table-column prop="collectionItems" label="征收品目"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="征收品目代码" width="180"></el-table-column>
        <el-table-column prop="taxStart" label="税款所属期起" width="180"></el-table-column>
        <el-table-column prop="taxEnd" label="税款所属期止" width="180"></el-table-column>
        <el-table-column prop="taxBasis" label="计税依据"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="paidAmount" label="实缴金额"></el-table-column>
        <el-table-column prop="receiveTreasury" label="收款国库"></el-table-column>
        <el-table-column prop="taxBelongsComp" label="征收税务机关" width="180"></el-table-column>
        <el-table-column prop="registCode" label="登记序号"></el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
                       @click="handleSubmit(scope.row)">确认提交</el-button>
            <el-button size="mini" type="warning"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        style="margin: 15px 0"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currPage"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :total="page.totalCount">
      </el-pagination>
      <!-- 弹窗 -->
      <DialogCommon
        :centerText="centerText"
        :centerDialogVisible="centerDialogVisible"
        @delDialog="sureDelDialog"
        @cancleDialog="centerDialogVisible = false"></DialogCommon>
    </div>
  </div>
</template>
<script>
    import DialogCommon from '@/components/dialogCommon';
    import {dataStorageApis, commonApi} from '@/http/api'
    export default {
        components: {
            DialogCommon
        },
        data() {
            return {
                belongsAreaOptions: [], // 所属区下拉选项
                taxCollectionAuthorityOptions: [], // 税务机关下拉选项
                receiveTreasuryOptions: [], // 收款国库下拉选项
                collectionItemsOptions: [], // 征收品目下拉选项
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 10, // 每页条数
                    totalCount: 0, // 总页数
                },
                centerText: '是否确定删除该税务入库信息？',
                centerDialogVisible: false,
                fileList: [],
            }
        },
        mounted(){
            this.postStoretaxtempNosubmitlist()
            // this.getDataDic()
        },
        methods: {
            // 获取字典
            getDataDic() {
                commonApi.getDataDic('belongsArea').then(res => {
                    if (res.status === 200) {
                        this.belongsAreaOptions = res.result
                    }
                })
                commonApi.getDataDic('taxCollectionAuthority').then(res => {
                    if (res.status === 200) {
                        this.taxCollectionAuthorityOptions = res.result
                    }
                })
                commonApi.getDataDic('receiveTreasury').then(res => {
                    if (res.status === 200) {
                        this.receiveTreasuryOptions = res.result
                    }
                })
                commonApi.getDataDic('collectionItems').then(res => {
                    if (res.status === 200) {
                        this.collectionItemsOptions = res.result
                    }
                })
            },
            // 导出
            exportList(){
              let url = `/union/store/storetaxtemp/downloadexceltemplate`
              window.location.href = url
            },
            // 确认提交
            submitEdit(){
              dataStorageApis.postStoretaxtempSubmit().then(res => {
                if(res.status == '200'){
                  this.$message.success('提交成功！');
                  this.tableData = []
                  this.postStoretaxtempNosubmitlist()
                }else{
                  this.$message.error(res.message);
                }
              })
            },
            // 删除
            submitDelete(){
              dataStorageApis.postStoretaxtempNosubmitdelete().then(res => {
                if(res.status == '200'){
                  this.$message.success('删除成功！');
                  this.tableData = []
                  this.postStoretaxtempNosubmitlist()
                }else{
                  this.$message.error(res.message);
                }
              })
            },
            // 获取数据
            postStoretaxtempNosubmitlist(){
                let data = {
                    "currPage": this.page.currPage,
                    "pageSize": this.page.pageSize,
                }
                dataStorageApis.postStoretaxtempNosubmitlist(data).then(res=> {
                  if(res.status == '200'){
                    this.tableData = res.result.list
                    this.page.totalPage = res.result.totalCount
                  }else{
                    this.$message.error(res.message);
                  }
                })
            },
            // 列表翻页
            handleCurrentChange(val) {
                this.page.currPage = val
                this.postStoreStoretaxtempList()
            },
            sureDelDialog() {

            },


            uploadSuccess(response, file, fileList) {
                if (response.status === 200) {
                    const fileId = response.result
                    dataStorageApis.postStoreStoretaxtempImportexcel().then(res => {
                        if (res.status === 200) {

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
