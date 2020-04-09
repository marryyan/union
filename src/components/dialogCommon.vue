<template>
  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  :before-close="cancleDialog"
  width="30%"
  center>
  <div class="center-text">{{centerText}}</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancleDialog">取 消</el-button>
    <el-button size="mini" type="warning" @click="delDialog">确 定</el-button>
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