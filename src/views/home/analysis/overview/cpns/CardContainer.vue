<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <!-- 内容 -->
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
const { title } = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
})
</script>

<style lang="less" scoped>
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
</style>
