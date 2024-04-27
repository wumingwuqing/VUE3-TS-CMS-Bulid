<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
// vue的东西
import { computed } from 'vue'
// 我的东西
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const route = useRoute()
const userMenu = useLoginStore().userMenu
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, userMenu))
</script>

<style lang="less" scoped>
.curmb {
  color: aliceblue;
}
</style>
