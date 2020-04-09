<template>
  <div class="wrapper">
    <el-tabs type="border-card">
      <el-tab-pane label="工会信息">
        <el-form label-position="left" label-width="150px" :model="formLabelAlign" class="demo-form-inline">
          <el-form-item label="工会开户名称">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="工会经费编码">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="上级工会名称">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会开户行">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="所属系统工会">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="建会日期">
            <el-date-picker v-model="formLabelAlign.type" size="small" style="width:200px" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="建会人数">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会开户行">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会银行账号">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会经费比例">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="管理代码">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会法人">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会会计">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="工会电话">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="建会涵">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="经办人">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="企业基本信息">
        <el-form label-position="left" label-width="150px" :model="formLabelAlign" class="demo-form-inline">
          <el-form-item label="企业名称">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>人
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="企业经营地址">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="企业注册地址">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="登记注册类型">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="行业门类">
            <el-select size="small" style="width:200px" v-model="formLabelAlign.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人代表">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>万元
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="税务信息">
        <el-form label-position="left" label-width="180px" :model="formLabelAlign" class="demo-form-inline">
          <el-form-item label="税务登记代码">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="收款国库">
            <el-select size="small" style="width:200px" v-model="formLabelAlign.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税款属性">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="税款所属税务机关">
            <el-select size="small" style="width:200px" v-model="formLabelAlign.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主管税务所（科、分局）">
            <el-select size="small" style="width:200px" v-model="formLabelAlign.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="征收税务机关">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="缴费信息">
        <el-form label-position="left" label-width="150px" :model="formLabelAlign" class="demo-form-inline">
          <el-form-item label="银行账号">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="银行营业网点">
            <el-input size="small" style="width:200px" v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="银行行别">
            <el-select size="small" style="width:200px" v-model="formLabelAlign.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showAdd: false, 
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
    },
    mounted(){
      // 编辑
      if(this.$route.path == '/taxOfficeInfoEdit') {
        this.showAdd = false
      }else{
        this.showAdd = true
      }
    },
  }
</script>
<style lang="scss" scoped>
.demo-form-inline{
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  box-sizing: border-box;
}
</style>