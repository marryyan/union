<template>
  <div class="wrapper-other">
    <div class="content_title">
        <h3>{{formInfo.roleName}}</h3>
        <p>{{formInfo.remark}}</p>
    </div>
    <el-tree
    :data="dataTree"
    show-checkbox
    node-key="menuId"
    :default-checked-keys="defalutCheckedKeys"
    :default-expand-all="true"
    @check="checkboxChange"
    :props="defaultProps">
  </el-tree>
  <el-button v-if="type == '1'" size="mini" type="warning"
            @click="$router.go('-1')">返回</el-button>
  <el-button v-if="type != '1'" size="mini" type="warning"
            @click="handleEdit">确认</el-button>
  </div>
</template>
<script>
  import { systemManagementApis, commonApi } from '@/http/api'
  export default {
    data() {
      return {
        type: '', // 判断是否转换字典
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          disabled: (data, node) => {
            if (this.type == '1') {
              return true
            }
            return false
          }
        },
        defalutCheckedKeys:[],
        checkedKeys:[],
        formInfo: {},
      }
    },
    mounted(){
      // 修改
      if(this.$route.path == '/roleManageInfoEdit'){
        this.type = ''
      }else{
        this.type = '1'
      }
      this.postSysRoleInfo()
      this.postSysRoleGetMenuTree()
    },
    methods: {
      // 获取权限详情
      postSysRoleInfo(){
        let data = {
          roleId: this.$route.query.id,
          type: this.type
        }
        systemManagementApis.postSysRoleInfo(data).then(res => {
          if (res.status == '200') {
            console.log(res)
            this.formInfo = res.result
          } else {
              this.$message.error(res.message);
          }
        })
      },
      // 角色详情树
      postSysRoleGetMenuTree(){
        let data = {
          roleId: this.$route.query.id
        }
        systemManagementApis.postSysRoleGetMenuTree(data).then(res => {
          if (res.status == '200') {
            this.dataTree = res.result
            this.defalutCheckedKeys = this.forfor(res.result)
          } else {
              this.$message.error(res.message);
          }
        })
      },
      forfor(arr, keyArr) {
        let keys = keyArr || []
        arr.forEach(item =>{
          if (item.checkStatus == 1) {
            keys.push(item.menuId)
            if (item.children) {
              this.forfor(item.children, keys)
            }
          }
        })
        return keys
      },
      checkboxChange(data, checkedData) {
        this.checkedKeys = checkedData.checkedKeys
      },
      handleEdit() {
        const menuIds = this.checkedKeys.join(',')
        const params = {
          roleId: this.$route.query.id,
          menuIds
        }
        systemManagementApis.postSysRoleAuth(params).then(res => {
          if (res.status === 200) {
            this.$message.success('修改角色权限成功')
            this.$router.go('-1')
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.wrapper-other{
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  h3{
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 30px;
  }
}
</style>