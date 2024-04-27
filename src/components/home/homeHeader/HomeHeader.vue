<template>
  <div class="home-header">
    <!-- 折叠图标 -->
    <div class="menu-icon">
      <el-icon size="28px" @click="handleMenuIconClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <!-- 其他内容 -->
    <div class="content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <HeaderBreadcrumb />
      </div>
      <!-- 用户信息 -->
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import HeaderInfo from './cpns/HeaderInfo.vue'
import HeaderBreadcrumb from './cpns/HeaderBreadcrumb.vue'

//1.自定义事件
const emit = defineEmits(['foldChange'])
//2.记录状态
const isFold = ref(false)
function handleMenuIconClick() {
  //内部改变状态
  isFold.value = !isFold.value
  //将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.home-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
