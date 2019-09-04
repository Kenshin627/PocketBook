<template>
  <div class="app-container">
    <el-form ref="submitForm" :model="formmodel" label-width="50px" status-icon :rules="rules" size='mini'>
      <el-form-item label="金额" required prop="money">
        <el-input placeholder="请输入消费金额" v-model.number="formmodel.money" size="small" type="number">
          <template slot="append">
            <svg-icon icon-class="money_2" class-name="card-panel-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="类别" required prop="region">
        <el-select v-model="formmodel.region" placeholder="选择一个类别" size="small" filterable>
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
      <el-form-item label="时间" required prop="date">
        <el-col :span="7">
          <el-date-picker type="datetime" placeholder="选择时间" v-model="formmodel.date" style="width: 100%;" size="small"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="明细" prop="desc">
        <el-input type="textarea" v-model="formmodel.desc" rows="4"></el-input>
      </el-form-item><el-form-item >
       
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click.native.prevent="onSubmit" size="small" class="submitPocket"><svg-icon icon-class="today" ></svg-icon>记一笔</el-button>
        <el-button  type="info" @click="resetForm" size="small" class="resetPocket"><svg-icon icon-class="reset"></svg-icon> 重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { readFileByNode, writeFileByNode, MakeGUID } from '@/utils/util'

export default {
  data() {
    return {
      formmodel: {
        money: '',
        region: '',
        date: '',
        desc: ''
      },
      rules: {
        money: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      jsonData: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          readFileByNode((param) => {
            this.jsonData = param
            if (this.jsonData !== 'ERR') {
              const jsonObj = JSON.parse(this.jsonData)
              const guid = MakeGUID()
              const newData = {}
              newData.guid = guid
              newData.money = this.formmodel.money
              newData.region = this.formmodel.region
              newData.date = this.formmodel.date
              newData.desc = this.formmodel.desc
              jsonObj.push(newData)
              const newJson = JSON.stringify(jsonObj)
              console.log(newJson)
              writeFileByNode(newJson, this.notice)
            } else {
              this.$notify({
                title: 'warning',
                message: '数据读取出错啦!',
                type: 'warning',
                duration: 1500,
                position: 'bottom-right'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.submitForm.resetFields()
    },
    notice(message) {
      this.$store.dispatch('init_Data')
      let messageNotice = ''
      let typeNotice = 'success'
      if (message === 1) {
        messageNotice = '记录成功'
        this.resetForm()
      } else {
        messageNotice = '更新失败!'
        typeNotice = 'warning'
      }
      this.$notify({
        title: '信息',
        message: messageNotice,
        type: typeNotice,
        duration: 1500,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

.submitPocket {
  background-color: rgb(56, 55, 52);
  border: 1px solid rgb(56, 55, 52);
}

.resetPocket {
  background-color: rgb(207, 206, 202);
  border: 1px solid rgb(207, 206, 202);
  color: rgb(56, 55, 52)
}
</style>

