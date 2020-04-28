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
        <el-button class="xlsButton" size="mini" type="warning" @click="exportList">下载模板</el-button>
        <el-button class="xlsButton" size="small" type="warning" @click="dialogVisible = true">xls导入</el-button>
        <el-button class="xlsButton" size="mini" type="warning" @click="submitEdit">确认提交</el-button>
        <el-button class="xlsButton" size="mini" type="warning" @click="submitDelete">删除</el-button>
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
      <el-dialog title="xls导入" :visible.sync="dialogVisible" :destroy-on-close="true">
        <el-upload
          class="upload-demo"
          action="/union/sys/sysfile/upload"
          :limit="1"
          :headers="{token: userToken}"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          accept=".xls, .xlsx"
          :file-list="fileList">
          <el-button class="xlsButton" size="small" type="warning">xls导入</el-button>
        </el-upload>
        <br/>
        <el-form :model="xlsUploadInfo" label-position='right' label-width="130px">
          <el-form-item label="所属税期：">
            <el-date-picker
              v-model="xlsUploadInfo.taxPeriod"
              size="mini"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="征收税务机关：">
            <el-cascader size="mini" :props="{value: 'id', label: 'collTaxComp'}" v-model="xlsUploadInfo.taxBelongsCompId" placeholder="请选择" :options="taxBelongsCompOptions" filterable></el-cascader>
          </el-form-item>
          <el-form-item label="国库名称：">
            <el-cascader size="mini" :props="{value: 'accountName', label: 'accountName'}" v-model="xlsUploadInfo.receiveTreasury" placeholder="请选择" :options="receiveTreasuryOptions" filterable></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="() => { this.dialogVisible = false; this.xlsUploadInfo = {}; this.fileList = []; this.fileId = ''}"  size="mini">取 消</el-button>
          <el-button type="primary" @click="xlsUpload" size="mini">确 定</el-button>
        </div>
      </el-dialog>
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
    import { getItem } from "../../../helpers";

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
                userToken: '',
                dialogVisible: false,
                xlsUploadInfo: {},
                taxBelongsCompOptions: [],
                fileId: ''
            }
        },
        mounted(){
            this.postStoretaxtempNosubmitlist()
            // this.getDataDic()
            this.userToken = getItem('user_token')
            this.getTaxBelongsCompOptions()
            this.getReceiveTreasuryOptions()
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
              let url = `/union/store/storetaxtemp/downloadexceltemplate?token=${sessionStorage.getItem('user_token')}`
              window.location.href = url
            },
            // 确认提交
            submitEdit(){
              if(this.tableData.length > 0){
                dataStorageApis.postStoretaxtempSubmit().then(res => {
                  if(res.status == '200'){
                    this.$message.success('提交成功！');
                    this.tableData = []
                    this.postStoretaxtempNosubmitlist()
                  }else{
                    this.$message.error(res.message);
                  }
                })
              }else{
                this.$message.error('暂无可提交的数据！');
              }
            },
            // 删除
            submitDelete(){
              if(this.tableData.length > 0){
                dataStorageApis.postStoretaxtempNosubmitdelete().then(res => {
                  if(res.status == '200'){
                    this.$message.success('删除成功！');
                    this.tableData = []
                    this.postStoretaxtempNosubmitlist()
                  }else{
                    this.$message.error(res.message);
                  }
                })
              }else{
                this.$message.error('暂无可删除的数据！');
              }
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
                    this.fileId = response.result
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
            },
            getTaxBelongsCompOptions() {
                dataStorageApis.postBaseBasetaxinfoSelectbyCollTaxComp({ collTaxComp: '' }).then(res => {
                    if (res.status === 200) {
                        this.taxBelongsCompOptions = res.result
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            getReceiveTreasuryOptions() {
                dataStorageApis.postBaseBasetaxinfoSelectbyAccountName({ accountName: '' }).then(res => {
                    if (res.status === 200) {
                        this.receiveTreasuryOptions = res.result
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            xlsUpload() {
                const params = {
                    ...this.xlsUploadInfo,
                    fileId: this.fileId,
                    taxBelongsCompId: this.xlsUploadInfo.taxBelongsCompId ? this.xlsUploadInfo.taxBelongsCompId.join(',') : '',
                    receiveTreasury: this.xlsUploadInfo.receiveTreasury ? this.xlsUploadInfo.receiveTreasury.join(',') : '',
                    collTaxComp: this.xlsUploadInfo.taxBelongsCompId ? this.taxBelongsCompOptions.find(item => item.id === Number(this.xlsUploadInfo.taxBelongsCompId)).collTaxComp : ''
                }
                console.log('--------------', params)
                dataStorageApis.postStoreStoretaxtempImportexcel(params).then(res => {
                    if (res.status === 200) {
                        this.$message.success('文件上传成功')
                        this.xlsUploadInfo = {}
                        this.fileList = []
                        this.fileId = ''
                        this.dialogVisible = false
                        this.postStoretaxtempNosubmitlist()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.upload-demo {
  margin: 0 10px;
}
</style>
