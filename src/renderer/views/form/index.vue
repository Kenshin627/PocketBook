<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="名称">
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="form.region" placeholder="选择一个类别" size="small" filterable>
          <el-option label="餐饮" value="cy"></el-option>
          <el-option label="购物" value="gw"></el-option>
          <el-option label="交通" value="jt"></el-option>
          <el-option label="居家" value="jj"></el-option>
          <el-option label="通讯" value="tx"></el-option>
          <el-option label="旅行" value="lx"></el-option>
          <el-option label="医疗" value="yl"></el-option>
          <el-option label="礼金" value="lj"></el-option>
          <el-option label="水电" value="sd"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="7">
          <el-date-picker type="datetime" placeholder="选择时间" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc" rows="4"></el-input>
      </el-form-item><el-form-item label="操作">
       
      </el-form-item>
      <el-form-item>
        <el-button round type="success" @click="onSubmit" size="small"><svg-icon icon-class="today" ></svg-icon>记一笔</el-button>
        <el-button round type="info" @click="onCancel" size="small"><svg-icon icon-class="cancel"></svg-icon> 取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

