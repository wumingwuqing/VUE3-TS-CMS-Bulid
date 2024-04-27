<template>
  <div class="home-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/image/logo.svg" alt="" srcset="" />
      <h2 :v-if="!isFold" class="title">后台管理系统</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="activeDefault"
        :collapse="isFold"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <!-- 父菜单内容 -->
            <template #title>
              <!-- 图标:el-icon-moitor=>moitor动态组件 -->
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <!-- 文字 -->
              <span>{{ item.name }}</span>
            </template>

            <!-- 子菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleItemClick(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue的东西
import { computed } from 'vue'

// 我的东西
import useLoginStore from '@/store/login/login'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

//定义porps
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})

//获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenu

//监听item点击事件
const router = useRouter()
function handleItemClick(subItem) {
  const url = subItem.url
  router.push(url.replace('main', 'home'))
}

//Elmenu默认菜单
const route = useRoute()
//匹配菜单
const activeDefault = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.home-menu {
  height: 100%;
  background-color: #001529;

  h2 {
    margin-left: 10px;
  }
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: rgb(235, 235, 235);
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fdfdfd;
    background-color: #1f344a;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
