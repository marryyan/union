<template>
  <div class="wrapper">
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="工会信息">
        <el-form label-position="left" label-width="150px" :model="formLabour" class="demo-form-inline">
          <el-form-item label="工会编号">
            <el-input size="small" style="width:200px" v-model="formLabour.unionCode"></el-input>
          </el-form-item>
          <el-form-item label="工会名称">
            <el-input size="small" style="width:200px" v-model="formLabour.unionName"></el-input>
          </el-form-item>
          <el-form-item label="上级工会名称">
            <el-cascader size="small" style="width:200px" v-model="formLabour.unionBelongstoId" placeholder="请选择" :options="selectbynameOption" filterable></el-cascader>
          </el-form-item>
          <el-form-item label="工会类别">
            <el-select size="small" style="width:200px" v-model="formLabour.unionType" placeholder="请选择">
              <el-option
                v-for="item in unionTypeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业认定">
            <el-select size="small" style="width:200px" v-model="formLabour.compFirmlyType" placeholder="请选择">
              <el-option
                v-for="item in compFirmlyTypeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建会状态">
            <el-select size="small" style="width:200px" v-model="formLabour.hasUnion" placeholder="请选择">
              <el-option
                v-for="item in hasUnionOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建会日期">
           <el-date-picker size="small" style="width:200px" v-model="formLabour.unionCreateDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="职工人数">
            <el-input size="small" style="width:200px" v-model="formLabour.unionPerson" type="number"></el-input>人
          </el-form-item>
          <el-form-item label="工会开户行">
            <el-input size="small" style="width:200px" v-model="formLabour.unionBank"></el-input>
          </el-form-item>
          <el-form-item label="工会银行账号">
            <el-input size="small" style="width:200px" v-model="formLabour.unionBankAccount"></el-input>
          </el-form-item>
          <el-form-item label="工会经费比例">
            <el-input size="small" style="width:200px" v-model="formLabour.unionFundPercent"></el-input>
          </el-form-item>
          <el-form-item label="管理代码">
            <el-input size="small" style="width:200px" v-model="formLabour.unionManagerCode"></el-input>
          </el-form-item>
          <el-form-item label="工会法人">
            <el-input size="small" style="width:200px" v-model="formLabour.unionLegal"></el-input>
          </el-form-item>
          <el-form-item label="工会会计">
            <el-input size="small" style="width:200px" v-model="formLabour.unionAccounting"></el-input>
          </el-form-item>
          <el-form-item label="工会电话">
            <el-input size="small" style="width:200px" v-model="formLabour.unionTel"></el-input>
          </el-form-item>
          <el-form-item label="建会涵">
            <el-input size="small" style="width:200px" v-model="formLabour.unionLetter"></el-input>
          </el-form-item>
          <el-form-item label="经办人">
            <el-input size="small" style="width:200px" v-model="formLabour.unionHandleBy"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="企业基本信息">
        <el-form label-position="left" label-width="150px" :model="formBusiness" class="demo-form-inline">
          <el-form-item label="企业名称">
            <el-input size="small" style="width:200px" v-model="formBusiness.compName"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input size="small" style="width:200px" v-model="formBusiness.compCode"></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input size="small" style="width:200px" v-model="formBusiness.compPerson"></el-input>人
          </el-form-item>
          <el-form-item label="资产总额">
            <el-input size="small" style="width:200px" v-model="formBusiness.totalAssets"></el-input>万元
          </el-form-item>
          <el-form-item label="营业收入">
            <el-input size="small" style="width:200px" v-model="formBusiness.operatingReceipt"></el-input>万元
          </el-form-item>
          <el-form-item label="企业状态">
            <el-select size="small" style="width:200px" v-model="formBusiness.compStatus" placeholder="请选择">
              <el-option
                v-for="item in compStatusOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input size="small" style="width:200px" v-model="formBusiness.compTel"></el-input>
          </el-form-item>
          <el-form-item label="企业经营地址">
            <el-input size="small" style="width:200px" v-model="formBusiness.adress"></el-input>
          </el-form-item>
          <el-form-item label="企业注册地址">
            <el-input size="small" style="width:200px" v-model="formBusiness.registAddress"></el-input>
          </el-form-item>
          <el-form-item label="登记注册类型">
            <el-input size="small" style="width:200px" v-model="formBusiness.registType"></el-input>
          </el-form-item>
          <el-form-item label="行业门类">
            <el-input size="small" style="width:200px" v-model="formBusiness.industryType"></el-input>
          </el-form-item>
          <el-form-item label="法人代表">
            <el-input size="small" style="width:200px" v-model="formBusiness.compLegal"></el-input>
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input size="small" style="width:200px" v-model="formBusiness.registMoney"></el-input>
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input size="small" style="width:200px" v-model="formBusiness.compScope"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="税务信息">
        <el-form label-position="left" label-width="180px" :model="formTaxation" class="demo-form-inline">
          <el-form-item label="所属税务机关">
            <el-cascader size="small" style="width:200px" v-model="formTaxation.taxBelongsCompId" placeholder="请选择" :options="basetaxinfoOption" filterable></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="缴费信息">
        <el-form label-position="left" label-width="150px" :model="formPay" class="demo-form-inline">
          <el-form-item label="开户名称">
            <el-input size="small" style="width:200px" v-model="formPay.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input size="small" style="width:200px" v-model="formPay.payAccount"></el-input>
          </el-form-item>
          <el-form-item label="银行营业网点">
            <el-input size="small" style="width:200px" v-model="formPay.payNetwork"></el-input>
          </el-form-item>
          <el-form-item label="银行行别">
            <el-select size="small" style="width:200px" v-model="formPay.bankType" placeholder="请选择">
              <el-option
                v-for="item in unionTypeOptions"
                :key="item.k"
                :label="item.v"
                :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <div class="table-title">费用缴纳情况</div>
        <el-table :data="tableData" border stripe style="width: 100%; margin-bottom: 20px">
          <el-table-column prop="compCode" label="税款所属期"></el-table-column>
          <el-table-column prop="compCode" label="征收品目"></el-table-column>
          <el-table-column prop="compCode" label="计税依据"></el-table-column>
          <el-table-column prop="compCode" label="税率"></el-table-column>
          <el-table-column prop="compCode" label="实缴金额"></el-table-column>
          <el-table-column prop="compCode" label="个税人数"></el-table-column>
        </el-table> -->
      </el-tab-pane>
      <el-button style="width:80px; margin-left:100px" size="small" type="primary" @click="submitAdd(tabName)">确定</el-button>
    </el-tabs>
  </div>
</template>
<script>
import {  basicFileApis, commonApi} from '@/http/api'
  export default {
    data() {
      return {
        formLabour:{
          "id":null,
          "belongsUnionTreeId": "", //左侧树形结构的id(好像没有选择的地方)
          "unionName":"", // 工会名称
          "unionCode":"", // 工会编码
          "unionBelongstoId":null, //所属系统工会Id   需要单独的方法进行查询 <组织机构库>-<右侧工会信息，下拉检索>方法 id
          "unionType":null, // 工会类型，1 区县工会、 2 ：产业工会 字典key: unionType
          "compFirmlyType":null, //企业认定：0 正常缴费企业 ，1：试点企业 2：微型企业 ,3:小型企业 字典key: compFirmlyType
          "hasUnion":null, //建会状态(0:未建会 1:已建会) 字典key: hasUnion
          "unionCreateDate":null, // 建会日期
          "unionPerson":null, // 职工人数 
          "unionBank":null, // 工会开户行 是否可能是字典？？？
          "unionBankAccount":null,// 工会银行账号
          "unionFundPercent":null, //工会经费比例
          "unionManagerCode":null, // 管理代码
          "unionLegal":null, //工会法人
          "unionAccounting":null, //工会会计
          "unionTel":null ,//公会电话
          "unionLetter":null, //建会函id
          "unionHandleBy":null, //经办人
        },// 工会
        formBusiness:{
          "id":null,
          "belongsUnionTreeId": "", //左侧树形结构的id(好像没有选择的地方)
          "compName":null,// 企业名称 
          "compCode":null, // 统一社会信用代码
          "compPerson":null, //员工人数
          "totalAssets":null, // 资产总额万元
          "operatingReceipt":null, //营业收入 万元
          "compStatus":null, // 企业状态：0 正常 ，1：注销 2：空壳 字典key: compStatus 
          "minTax":null,// 历史最小缴费额
          "compTel":null, //联系方式 
          "adress":null, // 企业经营地址
          "registAddress":null, // 企业注册地址 
          "registType":null, // 登记注册类型 》》》？？？？可能是字典，需要注意核实 
          "industryType":null, // 行业门类 ？？？？可能也是字典，需要注意？？
          "industryTypeName":null,// 行业门类名称
          "compLegal":null, // 法人代表
          "registMoney":null, // 注册资本 单位万元
          "compScope":null, // 经营范围
        },// 企业
        formTaxation:{
          "id":null,
          "belongsUnionTreeId": "", //左侧树形结构的id(好像没有选择的地方)
          "taxBelongsCompId":null // 税款所属税务机关 (id) 需要单独的搜索该信息《税所机构库》-《右侧税务信息，下拉检索》
        },// 税务
        formPay:{
          "id":null,
          // 账户名称直接使用企业名称不可更改
          "belongsUnionTreeId": "", //左侧树形结构的id(好像没有选择的地方)
          "payAccount":null, //银行账号
          "payNetwork":null, //银行营业网点
          "bankType":null// 银行类型(农行，工行 ）下拉框 字典key: bankType
        }, // 缴费
        unionTypeOptions:[],
        compFirmlyTypeOptions:[],
        hasUnionOptions:[],
        compStatusOptions:[],
        bankTypeOptions:[],
        selectbynameOption: [],
        basetaxinfoOption:[],
        tableData:[],
        tabName: '工会信息',
        id: ''
      };
    },
    mounted(){
      this.formLabour.belongsUnionTreeId = this.$route.query.treeId
      this.formBusiness.belongsUnionTreeId = this.$route.query.treeId
      this.formTaxation.belongsUnionTreeId = this.$route.query.treeId
      this.formPay.belongsUnionTreeId = this.$route.query.treeId
      this.getDataDic() // 字典
      this.postBaseunioninfoSelectbyname() // 所属机构id
      this.postBasetaxinfoSelectbyname() // 所属税务机关
      // 新增
      if(this.$route.path == '/companyInforInfoAdd') {
      }else{
        // 编辑
        this.formLabour.id = this.$route.query.id
        this.formBusiness.id = this.$route.query.id
        this.formTaxation.id = this.$route.query.id
        this.formPay.id = this.$route.query.id
        this.getBasecompanyinfoInfo()
      }
    },
    methods:{
      // 获取详情
      getBasecompanyinfoInfo(){
        let data = {
          id: this.$route.query.id,
          type:''
        }
        basicFileApis.getBasecompanyinfoInfo(data).then(res => {
          if(res.status == '200'){
            this.formLabour = res.result
            this.formBusiness = res.result
            this.formTaxation = res.result
            this.formPay = res.result
            console.log('unionBelongstoId',res.result.unionBelongstoId)
            console.log('unionCode',res.result.unionCode)
            console.log('unionName',res.result.unionName)
          }else{
            this.$message.error(res.message);
          }
        })
      },
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
        // 企业认定
        commonApi.getDataDic('compFirmlyType').then(res => {
          if (res.status === 200) {
            this.compFirmlyTypeOptions = res.result
          }
        })
        // 企业状态
        commonApi.getDataDic('compStatus').then(res => {
          if (res.status === 200) {
            this.compStatusOptions = res.result
          }
        })
        // 银行类型
        commonApi.getDataDic('bankType').then(res => {
          if (res.status === 200) {
            this.bankTypeOptions = res.result
          }
        })
      },
      // 所属工会
      postBaseunioninfoSelectbyname(){
        let data = {
          unionName: ''
        }
        basicFileApis.postBaseunioninfoSelectbyname(data).then(res => {
            if(res.status == '200'){
              res.result.map(item => {
                this.selectbynameOption.push({
                  value: item.id,
                  label: item.unionName
                })
              })
            }else{
              this.$message.error(res.message);
            }
        })
      },
      // 所属税务机关
      postBasetaxinfoSelectbyname(){
        let data = {
          taxName: ''
        }
        basicFileApis.postBasetaxinfoSelectbyname(data).then(res => {
            if(res.status == '200'){
              res.result.map(item => {
                this.basetaxinfoOption.push({
                  value: item.id,
                  label: item.taxName
                })
              })
            }else{
              this.$message.error(res.message);
            }
        })
      },
      handleTabClick(tab) {
        this.tabName = tab.label
      },
      // 添加修改工会信息
      postBasecompanyinfoUnion(){
        this.formLabour.unionBelongstoId = this.formLabour.unionBelongstoId && this.formLabour.unionBelongstoId.join(',')
        let data = {
          ...this.formLabour
        }
        basicFileApis.postBasecompanyinfoUnion(data).then(res => {
          if(res.status == '200'){
            this.$message.success('编辑成功！');
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 添加修改企业信息
      postBasecompanyinfoComp(){
        let data = {
          ...this.formBusiness
        }
        basicFileApis.postBasecompanyinfoComp(data).then(res => {
          if(res.status == '200'){
            this.$message.success('编辑成功！');
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 添加编辑税务信息
      postBasecompanyinfoTax(){
        if(this.formTaxation.taxBelongsCompId){
          this.formTaxation.taxBelongsCompId = this.formTaxation.taxBelongsCompId.join(',')
        }
        let data = {
          ...this.formTaxation
        }
        basicFileApis.postBasecompanyinfoTax(data).then(res => {
          if(res.status == '200'){
            this.$message.success('编辑成功！');
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 添加修改缴费信息
      postBasecompanyinfoPay(){
        let data = {
          ...this.formPay
        }
        basicFileApis.postBasecompanyinfoPay(data).then(res => {
          if(res.status == '200'){
            this.$message.success('编辑成功！');
          }else{
            this.$message.error(res.message);
          }
        })
      },
      submitAdd(name){
        if(name == '工会信息'){
          this.postBasecompanyinfoUnion()
        }else if(name == '企业基本信息') {
          this.postBasecompanyinfoComp()
        }else if(name == '税务信息'){
          this.postBasecompanyinfoTax()
        }else{
          this.postBasecompanyinfoPay()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.demo-form-inline{
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  box-sizing: border-box;
}
.table-title{
  font-size: 18px;
  text-align: center;
  margin: 20px auto;
}
</style>