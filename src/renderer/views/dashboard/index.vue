<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="setChartData('today')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="today" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日消费
          </div>
          <count-to :start-val="0" :end-val="today" :duration="2600" class="card-panel-num" /><span class="card-panel-num">¥</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="setChartData('month')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="calendar_month" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月消费
          </div>
          <count-to :start-val="0" :end-val="month" :duration="3000" class="card-panel-num" /><span class="card-panel-num">¥</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="setChartData('region')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="tree" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            类别统计
          </div>
          <count-to :start-val="0" :end-val="region" :duration="3200" class="card-panel-num" /><span class="card-panel-num">¥</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="setChartData('history')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            历史记录
          </div>
          <count-to :start-val="0" :end-val="history" :duration="3600" class="card-panel-num" /><span class="card-panel-num">¥</span>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
  <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :className="chartClass" v-bind:chartData="chartData"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import LineChart from '@/components/echart/LineChart'
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  components: {
    CountTo,
    LineChart
  },
  mounted() {
    this.setChartData('today')
  },
  computed: { ...mapState({
    todayData: state => state.pocket.todayData,
    today: state => state.pocket.today,
    monthData: state => state.pocket.monthData,
    month: state => state.pocket.month,
    historyData: state => state.pocket.historyData,
    history: state => state.pocket.history,
    region: state => state.pocket.region
  })
  },
  data() {
    return {
      chartData: { 'seriesData': [], 'xData': [], lineColor: '#000' },
      chartClass: 'chart'
    }
  },
  methods: {
    setChartData(type) {
      const xDataValue = []
      const seriesDataValue = []
      let lineColorValue = '#000'
      switch (type) {
        case 'today':
          this.todayData.map((item) => {
            const index = xDataValue.indexOf(item.region)
            if (index !== -1) {
              seriesDataValue[index] = seriesDataValue[index] + item.money
            } else {
              xDataValue.push(item.region)
              seriesDataValue.push(item.money)
            }
          })
          lineColorValue = '#1d7545'
          break
        case 'month':
          this.monthData.map((item) => {
            const index = xDataValue.indexOf(item.region)
            if (index !== -1) {
              seriesDataValue[index] = seriesDataValue[index] + item.money
            } else {
              xDataValue.push(item.region)
              seriesDataValue.push(item.money)
            }
          })
          lineColorValue = '#36a3f7'
          break
        case 'region':
          break
        case 'history':
          this.historyData.map((item) => {
            const index = xDataValue.indexOf(item.region)
            if (index !== -1) {
              seriesDataValue[index] = seriesDataValue[index] + item.money
            } else {
              xDataValue.push(item.region)
              seriesDataValue.push(item.money)
            }
          })
          lineColorValue = '#ffb52a'
          break
      }
      this.chartData.seriesData = seriesDataValue
      const temp = []
      xDataValue.map((item) => {
        temp.push(this.regionType(item))
      })
      this.chartData.xData = temp
      this.chartData.lineColor = lineColorValue
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    // box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    box-shadow: rgba(0, 0, 0, 0.35) 4px 4px 4px;
    border: 1px solid rgba(255, 241, 241, 0.93);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #1d7545;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #ffb52a;
      }
    }
    .icon-people {
      color: #3b8180;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #ffb52a;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 50px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 80%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.chart{
  width: 90%;
  height: 280px;
  border:1px solid #ccc;
  box-shadow: 4px 4px 12px 0px #9c9797;
}
</style>
