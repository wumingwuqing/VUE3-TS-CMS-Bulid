<template>
  <div class="pie-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { computed } from 'vue'
//echart
import type { EChartsOption } from 'echarts'
//我的东西
import BaseEchart from './BaseEchart.vue'
//类型
import type { IEchartValueType } from '../types'

//props
interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()
//echart配置
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    series: [
      {
        name: '该分类的商品数量',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.pie-echart {
  color: red;
}
</style>
