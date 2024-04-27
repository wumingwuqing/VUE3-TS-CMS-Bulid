<template>
  <div class="line-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { defineProps, computed } from 'vue'
//echarts
import type { EChartsOption } from 'echarts'
//我的东西
import BaseEchart from './BaseEchart.vue'
//props
const props = defineProps<{
  labels: string[]
  values: string[]
}>()
//echarts配置
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.labels,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '商品分类销量统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.values,
      },
    ],
  }
})
</script>

<style lang="less" scoped></style>
