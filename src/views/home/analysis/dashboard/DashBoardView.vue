<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <!-- 饼图 各个商品分类的销量-->
      <el-col :span="7">
        <chart-card :header="'各个商品分类的数量'">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <!-- 地图 各个省份的销量-->
      <el-col :span="10">
        <chart-card :header="'各个省份的销量'">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <!-- 玫瑰图 各个商品分类的收藏-->
      <el-col :span="7">
        <chart-card :header="'各个商品分类的数量'">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card :header="'商品分类销量统计'">
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card :header="'商品分类收藏统计'">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
// 组件
import CountCard from './cpns/CountCard.vue'
import ChartCard from './cpns/ChartCard.vue'
// 数据
import useAnalysisStore from '@/store/home/analysis/analysis'

// echart
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart,
} from '@/components/pageEcharts'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale,
} = storeToRefs(analysisStore)

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}
</style>
