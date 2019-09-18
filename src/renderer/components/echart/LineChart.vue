<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/dark') // echarts theme

export default {

  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '280px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      debugger
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ seriesData, xData, lineColor } = {}) {
      this.chart.setOption({
        xAxis: {
          data: xData,
          boundaryGap: true,
          axisTick: {
            show: false
          },
          nameTextStyle: {
            fontSize: 18,
            color: lineColor
          },
          nameRotate: -20
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        legend: {
          data: ['消费记录']
        },
        series: [{
          name: '消费记录',
          itemStyle: {
            normal: {
              color: lineColor,
              lineStyle: {
                color: lineColor,
                width: 2
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'insideTop',
              color: '#fff',
              fontSize: 12,
              fontFamily: '微软雅黑'
            }
          },
          barWidth: 40,
          smooth: true,
          type: 'bar',
          data: seriesData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
          // animationDelayUpdate: 3800
        }]
      })
    }
  }
}
</script>
