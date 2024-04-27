<!-- 使用这个组件对所有的图表进行初始化封装 -->
<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { ref, onMounted, watchEffect } from 'vue'
//echarts的东西
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
//地图的数据
import ChinaJSON from '../data/china.json'
import { onUnmounted } from 'vue'

//注册地图
echarts.registerMap('china', ChinaJSON as any)

//定义props
interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
//初始化
const echartRef = ref<HTMLElement>()
let echartInstance: any = null
function resize() {
  if (echartInstance?.resize !== null) echartInstance.resize()
}
onMounted(() => {
  // 1.初始化echarts实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas',
  })

  // 2.第一次进行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3.监听window缩放 防抖节流优化
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style lang="less" scoped>
.base-echart {
  color: red;
}

.echart {
  height: 300px;
}
</style>
