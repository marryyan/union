<template>
  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  :before-close="cancleDialog"
  width="30%"
  center>
  <div class="center-text">{{centerText}}</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancleDialog" style="border-radius:16px">取 消</el-button>
    <el-button size="mini" style="background: rgba(59,119,227,1) !important; color:#fff; border-radius:16px" @click="delDialog">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
    name: 'dialogCommon',
    props: {
      centerDialogVisible: {
        type: Boolean,
        default: false
      },
      centerText:{
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
        delDialog () {
          this.$emit('delDialog', false)
        },
        cancleDialog() {
          this.$emit('cancleDialog', false)
        },
    }
}
</script>
<style lang="scss" scoped>
.center-text{
  text-align: center;
}
</style>