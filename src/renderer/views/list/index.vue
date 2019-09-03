<template>
  <div class="app-container">
    <el-table 
    :data="list" 
    v-loading.body="listLoading" 
    element-loading-text="Loading" 
    size='small' 
    stripe fit highlight-current-row
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'date', order: 'descending'}"
    empty-text
    :header-row-class-name="headerClass"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" label='类别' width="195">
        <template slot-scope="scope">
          {{ regionType(scope.row.region) }}
        </template>
      </el-table-column>
      <el-table-column label="金额" width="110" align="center" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.money}} ¥</span>
        </template>
      </el-table-column>
      <el-table-column label="明细">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column label="日期" width="140" align="center" sortable>
        <template slot-scope="scope">
          {{ GetLocalDateTime(scope.row.date) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readFileByNode, GetLocalDateTime } from '@/utils/util'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      headerClass: 'headerClass'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      readFileByNode((data) => {
        this.listLoading = false
        if (data !== 'ERR') {
          this.list = JSON.parse(data)
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
    },
    regionType(value) {
      switch (value) {
        case 'cy':
          return '餐饮'
        case 'gw':
          return '购物'
        case 'jt':
          return '交通'
        case 'jj':
          return '居家'
        case 'tx':
          return '通讯'
        case 'lx':
          return '旅行'
        case 'yl':
          return '医疗'
        case 'lj':
          return '礼金'
        case 'sd':
          return '水电'
      }
    },
    GetLocalDateTime(utcDate) {
      return GetLocalDateTime(utcDate)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: #717273;
    color: #fff;
  }

  .el-table .success-row {
    background: #194203;
  }

  .headerClass {
    background-color: #194203;
    size: 40px;
  }
</style>
