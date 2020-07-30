<template>
  <div class="wrapper">
    <div class="flex-right">
      <div class="operation_btns">
        <el-button class="xlsButton" size="mini" type="warning" @click="handleInfo">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sequenceNumber" label="序号"></el-table-column>
        <el-table-column prop="code" label="缴费基数编码" min-width="180"></el-table-column>
        <el-table-column prop="payInfo" label="缴费类型"></el-table-column>
        <el-table-column prop="payPercent" label="缴费比例">
          <template slot-scope="scope">
            <span>{{`${scope.row.payPercentPre}${scope.row.payPercentCen}${scope.row.payPercentSuf}`}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payCount" label="基数（元）" min-width="180">
          <template slot-scope="scope">
            <span>{{`${scope.row.payCountPre}${scope.row.payCountCen}${scope.row.payCountSuf}`}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="minPercent" label="最小值（历次最小值）" min-width="180">
          <template slot-scope="scope">
            <span>{{`${scope.row.minPercentPre}${scope.row.minPercentCen}${scope.row.minPercentSuf}`}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isNormal" label="是否正常"></el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="color: #24C789; border: 0"
                       @click="handleInfo(scope.$index, scope.row)">修改</el-button>
            <el-button v-if="scope.row.isUse === '1'" size="mini" type="text" style="color: #24C789; border: 0"
                       @click="handleIsuse(scope.$index, scope.row)">停用</el-button>
            <el-button v-if="scope.row.isUse === '0'" size="mini" type="text" style="color: #24C789; border: 0"
                       @click="handleIsuse(scope.$index, scope.row)">启用</el-button>
          </template>
        </el-table-column>
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
        @cancleDialog="cancleDelDialog"></DialogCommon>
      <!-- 新增 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="cancelInfo">
        <el-form :model="formInfo" label-position='right' label-width="130px">
          <el-form-item label="缴费基数编码：">
            <el-input placeholder="请输入" size="mini" v-model="formInfo.code" style="width:250px" disabled></el-input>
          </el-form-item>
          <el-form-item label="缴费类型：">
            <el-select size="mini" v-model="formInfo.payInfo" style="width: 120px" placeholder="请选择">
              <el-option
                v-for="item in collectionItemsCodeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
            <!-- <el-input placeholder="请输入" size="mini" v-model="formInfo.payInfo" style="width:250px"></el-input> -->
          </el-form-item>
          <el-form-item label="缴费比例：">
            <el-select size="mini" v-model="formInfo.payPercentPre" style="width: 120px" placeholder="请选择">
              <el-option
                v-for="item in computeSignOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.payPercentCen" style="width:120px"></el-input>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.payPercentSuf" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="缴费基数：">
            <el-select size="mini" v-model="formInfo.payCountPre" style="width: 120px" placeholder="请选择">
              <el-option
                v-for="item in computeSignOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.payCountCen" style="width:120px"></el-input>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.payCountSuf" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="历次最小值比：">
            <el-select size="mini" v-model="formInfo.minPercentPre" style="width: 120px" placeholder="请选择">
              <el-option
                v-for="item in computeSignOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.minPercentCen" style="width:120px"></el-input>
            <el-input placeholder="请输入" size="mini" v-model="formInfo.minPercentSuf" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="是否正常：">
            <template>
              <el-radio v-model="formInfo.isNormal" label="0">是</el-radio>
              <el-radio v-model="formInfo.isNormal" label="1">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input placeholder="请输入" size="mini" v-model="formInfo.description" style="width:250px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInfo"  size="mini" style="border-radius:16px">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="mini" style="background: rgba(59,119,227,1) !important; color:#fff; border-radius:16px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import DialogCommon from '@/components/dialogCommon';
    import {basicFileApis, commonApi} from "../../http/api";

    export default {
        components: {
            DialogCommon
        },
        data() {
            return {
                tableData: [],
                page:{
                    currPage:1, // 当前页
                    pageSize: 30, // 每页条数
                    totalCount: 1, // 总页数
                },
                centerText: '',
                dialogTitle: '新增缴费基数',
                centerDialogVisible: false,
                dialogVisible: false,
                computeSignOptions: [],
                collectionItemsCodeOptions:[],
                handleData: {},
                formInfo: {
                    id: '',
                    code: '',
                    payInfo: '',
                    payPercentPre: '',
                    payPercentCen: '',
                    payPercentSuf: '',
                    payCountPre: '',
                    payCountCen: '',
                    payCountSuf: '',
                    minPercentPre: '',
                    minPercentCen: '',
                    minPercentSuf: '',
                    minPercent: '',
                    isNormal: '',
                    description: '',
                },
            }
        },
        mounted() {
            commonApi.getDataDic('computeSign').then(res => {
                if (res.status === 200) {
                    this.computeSignOptions = res.result
                    this.postBaseratiopayList()
                } else {
                    this.$message.error(res.message)
                }
            })
            commonApi.getDataDic('collectionItemsCode').then(res => {
                if (res.status === 200) {
                    this.collectionItemsCodeOptions = res.result
                    this.postBaseratiopayList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        methods: {
            // 缴费基数编码
            postbaseratiopayGetcode(){
              basicFileApis.postbaseratiopayGetcode().then(res => {
                if(res.status == '200'){
                  this.formInfo.code = res.result
                }else{
                  this.$message.error(res.message);
                }
              })
            },
            postBaseratiopayList() {
                basicFileApis.postBaseratiopayList({...this.page}).then(res => {
                    if (res.status === 200) {
                        const { totalCount, pageSize, currPage, list } = res.result
                        this.page = {
                            ...this.page,
                            totalCount,
                            pageSize,
                            currPage,
                        }
                        this.tableData = list.map((item, index) => {
                            return {
                                ...item,
                                sequenceNumber: index + 1 + ((res.result.currPage - 1) * res.result.pageSize)
                            }
                        })
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleInfo(index, row){
                this.postbaseratiopayGetcode()
                if (row && row.id) {
                    this.dialogTitle = '修改缴费基数'
                    basicFileApis.postBaseratipayInfo({...row}).then(res => {
                        if (res.status === 200) {
                            this.formInfo = {
                                ...this.formInfo,
                                ...res.result,
                            }
                            this.dialogVisible = true
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.dialogTitle = '新增缴费基数'
                    this.dialogVisible = true
                }
            },
            onSubmit() {
                const { id } = this.formInfo
                this.dialogVisible = false
                if (id) {
                    basicFileApis.postBaseratiopayUpdate(this.formInfo).then(res => {
                        if (res.status === 200) {
                            this.formInfo = {}
                            this.$message.success('修改成功')
                            this.tableData = []
                            this.page.currPage = 1
                            this.postBaseratiopayList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    basicFileApis.postBaseratiopaySave(this.formInfo).then(res => {
                        if (res.status === 200) {
                            this.formInfo = {}
                            this.$message.success('添加成功')
                            this.tableData = []
                            this.page.currPage = 1
                            this.postBaseratiopayList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            },
            handleIsuse(index, row) {
                this.handleData = row
                this.centerText = row.isUse === '0' ? '是否确定启用该缴费基数设置信息？' : '是否确定停用该缴费基数设置信息？'
                this.centerDialogVisible = true
            },
            sureDelDialog(){
                const data = {
                    id: this.handleData.id,
                    isUse: this.handleData.isUse === '0' ? '1' : '0'
                }
                basicFileApis.postBaseratiopayIsuse(data).then(res => {
                    if (res.status === 200) {
                        this.$message.success('操作成功')
                        this.tableData = []
                        this.page.currPage = 1
                        this.postBaseratiopayList()
                        this.centerDialogVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            cancleDelDialog(){
                this.centerDialogVisible = false
            },
            cancelInfo(){
              this.dialogVisible = false
              this.formInfo = {}
              this.postbaseratiopayGetcode()
            },
            handleCurrentChange(val) {
                this.tableData = []
                this.page.currPage = val
                this.postBaseratiopayList()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
