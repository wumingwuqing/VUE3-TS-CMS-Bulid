<template>
  <div class="rose-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { computed } from 'vue'
//echart
import type { EChartsOption } from 'echarts'
//我的组件
import BaseEchart from './BaseEchart.vue'
//类型
import type { IEchartValueType } from '../types'

//props
interface IProps {
  roseData: IEchartValueType[]
}
const props = defineProps<IProps>()

//echarts配置
const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left',
      top: '1%',

      formatter: (name: string) => {
        const item = props.roseData.find((item) => item.name === name)
        return `${name}: ${item?.value}`
      },

      itemWidth: 20,
      itemHeight: 13.5,
      itemGap: 20,
    },
    series: [
      {
        name: '该分类的商品数量',
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 80],
        // 设置区域的位置
        center: ['50%', '50%'],
        bottom: '-15%',
        roseType: 'area', // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)',
        },
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.rose-echart {
  color: red;
}
</style>
