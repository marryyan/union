<template>
  <div class="wrapper">
    <div class="flex-right">
      <div class="operation_btns">
        <el-button size="mini" type="warning" @click="addInfo">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="code" label="序号"></el-table-column>
        <!-- 没有拨付规则编码 -->
        <el-table-column prop="name" label="拨付规则编码" width="180"></el-table-column>
        <el-table-column prop="compFirmlyType" label="企业认定"></el-table-column>
        <el-table-column prop="unionType" label="工会类别"></el-table-column>
        <el-table-column prop="collectionItemsCode" label="缴费类型"></el-table-column>
        <el-table-column prop="provincePercent" label="省总"></el-table-column>
        <el-table-column prop="cityPercent" label="市总"></el-table-column>
        <el-table-column prop="serviceChargePercent" label="手续费率"></el-table-column>
        <el-table-column prop="areaIndustryPercent" label="区/产总"></el-table-column>
        <el-table-column prop="compPercent" label="企业"></el-table-column>
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
      <el-dialog title="新增拨付比例" :visible.sync="dialogAddVisible">
        <el-form :model="formAdd" label-position='right' label-width="130px">
          <el-form-item label="拨付规则编码：">
            <el-input disabled size="mini" v-model="formAdd.code" autocomplete="off" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="缴费类型：">
            <el-select size="mini" v-model="formAdd.collectionItemsCode" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工会类别：">
            <el-select size="mini" v-model="formAdd.unionType" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业认定：">
            <el-select size="mini" v-model="formAdd.compFirmlyType" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手续费：">
            <el-input size="mini" v-model="formAdd.serviceChargePercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="省总拨付比例：">
            <el-input size="mini" v-model="formAdd.provincePercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="市总拨付比例：">
            <el-input size="mini" v-model="formAdd.cityPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="区县拨付比例：">
            <el-input size="mini" v-model="formAdd.areaIndustryPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
          <el-form-item label="企业拨付比例：">
            <el-input size="mini" v-model="formAdd.compPercent" style="width:250px" type="number"></el-input>%
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false"  size="mini">取 消</el-button>
          <el-button type="primary" @click="clickAddSure" size="mini">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="拨付比例修改" :visible.sync="dialogEditVisible">
        <el-form :model="formInfo" label-position='right' label-width="130px">
          <el-form-item label="缴费类型：">
            <el-select size="mini" v-model="formInfo.collectionItemsCode" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工会类别：">
            <el-select size="mini" v-model="formInfo.unionType" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型：">
            <el-select size="mini" v-model="formInfo.compFirmlyType" placeholder="请选择" style="width:250px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
          <el-button @click="dialogEditVisible = false"  size="mini">取 消</el-button>
          <el-button type="primary" @click="clickEditSure" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DialogCommon from '@/components/dialogCommon';
import { basicFileApis } from '@/http/api'
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
      centerText: '是否确定删除该拨付比例设置信息？',
      centerDialogVisible: false,
      dialogAddVisible: false, // 是否打开新增
      formAdd: {
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
      }, // 新增的form
      formInfo:{}, // 单条数据详情
      dialogEditVisible: false, // 是否打开修改
    }
  },
  mounted(){
    this.getBaseratiocallbackList()
  },
  methods: {
    // 获取列表
    getBaseratiocallbackList(){
      let data = {
        "currPage":this.page.currPage,//当前页
        "pageSize":this.page.pageSize,//每页条数
      }
      basicFileApis.getBaseratiocallbackList(data).then(res => {
        if(res.status == '200'){
          this.tableData = res.result.list
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 点击新增
    addInfo(){
      this.dialogAddVisible = true
      this.formAdd = {}
    },
    clickAddSure(){
      let data = {
        ...this.formAdd
      }
      basicFileApis.postBaseratiocallbackSave(data).then(res => {
        if(res.status == '200'){
          this.$message.success('新增成功！');
          this.dialogAddVisible = false
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 获取单条数据的详情
    postBaseratiocallbackInfo(id){
      let data = {
        id: id
      }
      basicFileApis.postBaseratiocallbackInfo(data).then(res => {
        if(res.status == '200'){
          this.formInfo = res.result
          this.dialogEditVisible = true
        }else{
          this.$message.error(res.message);
        }
      })
    },
    handleDetail(index, row){
      this.$router.push({
        path: `/infoDetail?id=${row.date}`
      })
    },
    // 修改
    handleEdit(index, row){
      this.formInfo ={}
      this.postBaseratiocallbackInfo(row.id)
    },
    clickEditSure(){
      let data = {
        ...this.formInfo
      }
      basicFileApis.postBaseratiocallbackUpdate(data).then(res => {
        if(res.status == '200'){
          this.$message.success('修改成功！');
          this.dialogEditVisible = false
        }else{
          this.$message.error(res.message);
        }
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