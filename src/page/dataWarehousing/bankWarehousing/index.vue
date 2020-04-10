<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="对方户名：">
          <el-input size="mini" v-model="formInline.accountName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            size="mini"
            v-model="formInline.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="税款所属 税务机关：">-->
<!--          <el-input size="mini" v-model="formInline.user" placeholder="请输入"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="对方账号：">
          <el-input size="mini" v-model="formInline.accountNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="摘要：">
          <el-input size="mini" v-model="formInline.summary" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="openDrawer">xls导入</el-button>
        <el-drawer
          title="xls导入"
          :visible.sync="drawer"
          direction="rtl"
          custom-class="demo-drawer"
          :destroy-on-close="true"
          :before-close="closeDrawer">
          <div class="demo-drawer__content">
            <el-form :model="form">
              <el-form-item required>
                <el-upload
                  action="/union/sys/sysfile/upload"
                  :headers="{ token: '666666' }"
                  :on-success="handleSuccess"
                  :limit="1"
                  :file-list="form.fileList">
                  <el-button style="margin-left: 20px" size="mini" type="warning">xls导入</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="数据版本号" required>
                <el-select v-model="form.versionNo" placeholder="请选择数据版本号">
                  <el-option v-for="(item, index) in versionNoList" :key="index" :value="item.versionNo" ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="closeDrawer">取 消</el-button>
              <el-button type="primary" @click="submitDrawer">确 定</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="taxPeriod" label="征收税期" width="80"></el-table-column>
        <el-table-column prop="proDate" label="日期" width="180"></el-table-column>
        <el-table-column prop="transactionType" label="交易类型" width="180"></el-table-column>
        <el-table-column prop="certificateCategory" label="凭证种类" width="180"></el-table-column>
        <el-table-column prop="certificateCode" label="凭证代码" width="180"></el-table-column>
        <el-table-column prop="accountName" label="对方户名" width="180"></el-table-column>
        <el-table-column prop="accountNumber" label="对方账号" width="180"></el-table-column>
        <el-table-column prop="summary" label="摘要" width="180"></el-table-column>
        <el-table-column prop="borrowMoney" label="借方发生额" width="180"></el-table-column>
        <el-table-column prop="loanMoney" label="贷方发生额" width="180"></el-table-column>
        <el-table-column prop="balance" label="余额" width="180"></el-table-column>
<!--        <el-table-column label="操作" width="200">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" type="warning"-->
<!--                       @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->
<!--            <el-button size="mini" type="warning"-->
<!--                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
                drawer: false, // 抽屉开关
                versionNoList: [], // versionNo列表
                form: {
                    fileList: [],
                    versionNo: ''
                }, // xls导入抽屉form
            }
        },
        mounted(){
            this.postStoreStorebanktempList()
        },
        methods: {
            postStoreStorebanktempList(){
                let data = {
                    "currPage": this.page.currPage,
                    "pageSize": this.page.pageSize,
                    "accountName": this.formInline.accountName, //对方账户名
                    "proDate": this.formInline.proDate, //日期
                    "accountNumber": this.formInline.accountNumber, //对方账户号
                    "summary": this.formInline.summary, // 摘要
                    "user": this.formInline.user
                }
                dataStorageApis.postStoreStorebanktempList(data).then(res=> {
                    this.tableData = res.result.list
                    this.page.totalPage = res.result.totalCount
                })
            },
            onSubmit() {
                this.page.currPage = 1
                this.tableData = []
                this.postStoreStorebanktempList()
            },
            handleEdit(index, row) {
                this.$router.push({
                    path: `/bankWarehousingInfoHandle?id=${row.id}`
                })
            },
            handleDelete(index, row) {
                this.centerDialogVisible = true
            },
            sureDelDialog(){
                this.centerDialogVisible = false
            },
            cancleDelDialog(){
                this.centerDialogVisible = false
            },
            handleCurrentChange(val) {
                // this.tableData = []
                this.page.currPage = val
                this.postStoreStorebanktempList()
            },
            handleSuccess(response, file, fileList) {
                this.form.fileList = fileList
                const { status } = response
                if(status === 200) {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                }
            },
            closeDrawer(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.drawer = false
                        this.form = {
                            fileList: [],
                            versionNo: ''
                        }
                        done();
                    })
                    .catch(_ => {});
            },
            openDrawer() {
                dataStorageApis.postStoreStoreversionListNotInStorage().then(res => {
                    const { status, result } = res
                    if (status === 200) {
                        this.drawer = true
                        this.versionNoList = result
                    }
                })
            },
            submitDrawer () {
                const { fileList, versionNo } = this.form
                if (fileList.length === 0) {
                    this.$message.error('请导入xls')
                    return
                }
                if (versionNo === '') {
                    this.$message.error('请选择数据版本号')
                    return
                }
                const { response: { result } } = fileList[0]
                dataStorageApis.postStoreStorebanktempImportexcel({
                    fileId: result,
                    versionNo
                }).then(res => {
                    if (res.status === 200) {
                        this.postStoreStorebanktempList()
                        this.drawer = false
                        this.form = {
                            fileList: [],
                            versionNo: ''
                        }
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                    }
                })
            }

        }
    }
</script>
<style lang="scss" scoped>
  .demo-drawer__content {
    padding: 0 20px;
  }
  .demo-drawer__footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
