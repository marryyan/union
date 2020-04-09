<template>
  <div class="wrapper">
    <div class="flex-right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="税款所属期：">
          <el-input size="mini" v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属区：">
          <el-select size="mini" v-model="formInline.user" placeholder="请输入">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">检索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          name: ''
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
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>