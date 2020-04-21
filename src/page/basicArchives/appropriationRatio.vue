<template>
  <div class="wrapper">
    <div class="flex-right">
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="changeInfo('add')">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="序号" prop="sequenceNumber"></el-table-column>
        <el-table-column prop="code" label="拨付规则编码" width="180"></el-table-column>
        <el-table-column prop="compFirmlyType" label="企业认定" width="180"></el-table-column>
        <el-table-column prop="unionType" label="工会类别" width="180"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="缴费类型" width="180"></el-table-column>
        <el-table-column prop="provincePercent" label="省总"></el-table-column>
        <el-table-column prop="cityPercent" label="市总"></el-table-column>
        <el-table-column prop="serviceChargePercent" label="手续费率"></el-table-column>
        <el-table-column prop="areaIndustryPercent" label="区/产总"></el-table-column>
        <el-table-column prop="compPercent" label="企业"></el-table-column>
        <el-table-column prop="isUseText" label="是否启用"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning"
              @click="changeInfo('edit', scope.row)">修改</el-button>
            <el-button size="mini" type="warning"
              @click="handleUse('use', scope.row)" v-if="scope.row.isUse == '1'">禁用</el-button>
            <el-button size="mini" type="warning"
              @click="handleUse('unUse', scope.row)" v-if="scope.row.isUse == '0'">启用</el-button>
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
      <!-- 新增，修改 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="cancelInfo">
        <el-form :model="formInfo" label-position='right' label-width="130px">
          <el-form-item label="拨付规则编码：">
            <el-input disabled size="mini" v-model="formInfo.code" autocomplete="off" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="缴费类型：">
            <el-select size="mini" v-model="formInfo.collectionItemsCode" placeholder="请选择" style="width:250px" multiple>
              <el-option
                v-for="item in collectionItemsCodeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工会类别：">
            <el-select size="mini" v-model="formInfo.unionType" placeholder="请选择" style="width:250px" multiple>
              <el-option
                v-for="item in unionTypeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业认定：">
            <el-select size="mini" v-model="formInfo.compFirmlyType" placeholder="请选择" style="width:250px">
              <el-option
                v-for="item in compFirmlyTypeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手续费：">
            <el-input size="mini" v-model="formInfo.serviceChargePercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="省总拨付比例：">
            <el-input size="mini" v-model="formInfo.provincePercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="市总拨付比例：">
            <el-input size="mini" v-model="formInfo.cityPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="区县拨付比例：">
            <el-input size="mini" v-model="formInfo.areaIndustryPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="企业拨付比例：">
            <el-input size="mini" v-model="formInfo.compPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInfo"  size="mini">取 消</el-button>
          <el-button type="primary" @click="submitInfo" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DialogCommon from '@/components/dialogCommon';
import { basicFileApis, commonApi } from '@/http/api'
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
        totalPage: 100, // 总页数
      },
      centerText: '是否确定启用该拨付比例设置信息？',
      centerDialogVisible: false,
      useType: '', // 判断显示启用还是禁用
      useRow:'', //启用禁用row
      dialogTitle: '', // 弹窗title
      dialogVisible: false, // 是否打开弹窗
      formInfo: {
        "code": "", // 编号
        "compFirmlyType": "", //企业认定 ?? 是否需要转换成文字
        "unionType": "", // 工会类别
        "collectionItemsCode": "", // 缴费类型
        "serviceChargePercent": null ,// 手续费率
        "provincePercent": null, // 省
        "cityPercent": null, // 市
        "areaIndustryPercent": null, //区/产总
        "compPercent": null, //企业
        "description": "",
        "isUse": null // 是否启用 0：停止 ，1：启用
      }, // 弹窗form
      type:'', // 判断新增或是修改
      compFirmlyTypeOptions:[],// 企业认定
      unionTypeOptions:[],// 工会类型
      collectionItemsCodeOptions:[],// 缴费类型
    }
  },
  mounted(){
    this.getDataDic()
    this.getBaseratiocallbackList()
  },
  methods: {
    // 拨付比例编号
    postBaseratiocallbackGetcode(){
      basicFileApis.postBaseratiocallbackGetcode().then(res => {
        if(res.status == '200'){
          this.formInfo.code = res.result
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 获取字典
    getDataDic() {
      // 企业认定
      commonApi.getDataDic('compFirmlyType').then(res => {
        if (res.status === 200) {
          this.compFirmlyTypeOptions = res.result
        }
      })
      // 工会类型
      commonApi.getDataDic('unionType').then(res => {
        if (res.status === 200) {
          this.unionTypeOptions = res.result
        }
      })
      // 缴费类型
      commonApi.getDataDic('collectionItemsCode').then(res => {
        if (res.status === 200) {
          this.collectionItemsCodeOptions = res.result
        }
      })
    },
    // 获取列表
    getBaseratiocallbackList(){
      let data = {
        "currPage":this.page.currPage,//当前页
        "pageSize":this.page.pageSize,//每页条数
      }
      basicFileApis.getBaseratiocallbackList(data).then(res => {
        if(res.status == '200'){
          this.tableData = res.result.list.map((item, index) => {
              return {
                ...item,
                sequenceNumber: index + 1 + ((res.result.currPage - 1) * res.result.pageSize)
              }
          })
          this.page.totalPage = res.result.totalCount
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 点击新增 / 修改
    changeInfo(e, row){
      this.postBaseratiocallbackGetcode()
      if(e == 'add'){
        // 新增
        this.type = 'add'
        this.dialogTitle = '新增拨付比例'
        this.dialogVisible = true
      }else{
        // 修改
        this.type = 'edit'
        this.dialogTitle = '拨付比例修改'
        this.postBaseratiocallbackInfo(row.id)
      }
    },
    // 提交新增 / 修改
    submitInfo(){
      this.formInfo.unionType = this.formInfo.unionType.join(',')
      this.formInfo.collectionItemsCode = this.formInfo.collectionItemsCode.join(',')
      if(this.type == 'add'){
        // 新增
        let data = {
          ...this.formInfo,
        }
        basicFileApis.postBaseratiocallbackSave(data).then(res => {
          if(res.status == '200'){
            this.$message.success('新增成功！');
            this.dialogVisible = false
            this.formInfo ={}
            this.tableData = []
            this.page.currPage = 1
            this.getBaseratiocallbackList()
          }else{
            this.$message.error(res.message);
          }
        })
      }else{
        // 修改
        let data = {
          ...this.formInfo
        }
        basicFileApis.postBaseratiocallbackUpdate(data).then(res => {
          if(res.status == '200'){
            this.$message.success('修改成功！');
            this.dialogVisible = false
            this.formInfo ={}
            this.tableData = []
            this.page.currPage = 1
            this.getBaseratiocallbackList()
          }else{
            this.$message.error(res.message);
          }
        })
      }
    },
    // 获取单条数据的详情
    postBaseratiocallbackInfo(id){
      let data = {
        id: id
      }
      basicFileApis.postBaseratiocallbackInfo(data).then(res => {
        if(res.status == '200'){
          this.formInfo = res.result
          this.formInfo.unionType = res.result.unionType.split(",")
          this.formInfo.collectionItemsCode = res.result.collectionItemsCode.split(",")
          this.dialogVisible = true
        }else{
          this.$message.error(res.message);
        }
      })
    },
    handleUse(e, row) {
      if(e == 'use'){
        // 启用
        this.centerText = '是否确定禁用该拨付比例设置信息？'
      }else{
        // 禁用
        this.centerText = '是否确定启用该拨付比例设置信息？'
      }
      this.useRow = row
      this.centerDialogVisible = true
    },
    sureDelDialog(){
      let data = {
        id: this.useRow.id,
        isUse: this.useRow.isUse == '0' ? '1' : '0',
      }
      basicFileApis.postBaseratiocallbackIsuse(data).then(res => {
        if(res.status == '200'){
          this.$message.success('修改成功！');
          this.centerDialogVisible = false
          this.tableData = []
          this.page.currPage = 1
          this.getBaseratiocallbackList()
        }else{
          this.$message.error(res.message);
        }
      })
    },
    cancleDelDialog(){
      this.centerDialogVisible = false
    },
    cancelInfo(){
      this.dialogVisible = false
      this.formInfo = {}
      this.postBaseratiocallbackGetcode()
    },
    handleCurrentChange(val) {
      this.tableData = []
      this.page.currPage = val
      this.getBaseratiocallbackList()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>