<template>
  <div class="home">
    <el-container class="home-content">
      <!-- 侧边菜单栏 -->
      <el-aside :width="isFold ? '60px' : '210px'">
        <HomeMenu :is-fold="isFold" />
      </el-aside>

      <!-- 主内容区域 -->
      <el-container>
        <!-- 顶部 -->
        <el-header height="50px">
          <HomeHeader @fold-change="handleFoldChange" />
        </el-header>
        <!-- 内容 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HomeMenu from '@/components/home/homeMenu/HomeMenu.vue'
import HomeHeader from '@/components/home/homeHeader/HomeHeader.vue'
// import HomeMain from '@/components/home/homeMain/HomeMain.vue';
import { ref } from 'vue'
//处理homeheader折叠按钮点击事件
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}

.home-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
