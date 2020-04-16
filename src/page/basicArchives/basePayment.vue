<template>
  <div class="wrapper">
    <div class="flex-right">
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="addInfo">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sequenceNumber" label="序号"></el-table-column>
        <el-table-column prop="code" label="缴费基数编码" width="180"></el-table-column>
        <el-table-column prop="payInfo" label="基数类型"></el-table-column>
        <el-table-column prop="payPercent" label="缴费比例"></el-table-column>
        <el-table-column prop="payCount" label="基数（元）" width="180"></el-table-column>
        <el-table-column prop="minPercent" label="最小值（历次最小值）" width="180"></el-table-column>
        <el-table-column prop="isNormal" label="是否正常">
          <template slot-scope="scope">
            <span v-html="scope.row.isNormal === 0 ? '正常' : '不正常'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
                       @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="warning"
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
      <!-- 新增 -->
      <el-dialog title="新增缴费基数" :visible.sync="dialogVisible">
        <el-form :model="formInfo" label-position='right' label-width="130px">
          <el-form-item label="缴费基数编码：">
            <el-input size="mini" v-model="formInfo.code" style="width:250px" type="number"></el-input>
          </el-form-item>
          <el-form-item label="基数类型：">
            <el-input size="mini" v-model="formInfo.payInfo" style="width:250px" type="number"></el-input>
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
            <el-input size="mini" v-model="formInfo.payPercentCen" style="width:120px" type="number"></el-input>
            <el-input size="mini" v-model="formInfo.payPercentSuf" style="width:120px" type="number"></el-input>
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
            <el-input size="mini" v-model="formInfo.payCountCen" style="width:120px" type="number"></el-input>
            <el-input size="mini" v-model="formInfo.payCountSuf" style="width:120px" type="number"></el-input>
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
            <el-input size="mini" v-model="formInfo.minPercentCen" style="width:120px" type="number"></el-input>
            <el-input size="mini" v-model="formInfo.minPercentSuf" style="width:120px" type="number"></el-input>
          </el-form-item>
          <el-form-item label="是否正常：">
            <template>
              <el-radio v-model="formInfo.isNormal" label="0">是</el-radio>
              <el-radio v-model="formInfo.isNormal" label="1">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input size="mini" v-model="formInfo.description" style="width:250px" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false"  size="mini">取 消</el-button>
          <el-button type="primary" @click="clickEditSure" size="mini">确 定</el-button>
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
                    pageSize: 10, // 每页条数
                    totalCount: 100, // 总页数
                },
                centerText: '是否确定删除该缴费基数设置信息？',
                centerDialogVisible: false,
                dialogVisible: false,
                computeSignOptions: [],
                formInfo: {
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
        },
        methods: {
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
            onSubmit() {
                console.log('submit!');
            },
            addInfo(){
                this.dialogVisible = true
            },
            handleEdit(index, row) {
                this.$router.push({
                    path: `/infoEdit?id=${row.id}`
                })
            },
            handleDetail(index, row){
                this.$router.push({
                    path: `/infoDetail?id=${row.date}`
                })
            },
            handleDelete(index, row) {
                console.log(row)
                this.centerDialogVisible = true
            },
            sureDelDialog(){
                this.centerDialogVisible = false
            },
            cancleDelDialog(){
                this.centerDialogVisible = false
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
