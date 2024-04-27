<template>
  <div class="role">
    <PageSearch
      :search-config="searchConfig"
      @query-click="queryClick"
      @reset-click="resetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @create="create"
      @edit="edit"
    />
    <PageModel
      :modalConfig="modalConfig"
      ref="pageModelRef"
      :other-info="otherInfo"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </PageModel>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

//store相关
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/home/main'

//页面组件极其配置
import PageSearch from '@/components/pageSearch/PageSearch.vue'
import searchConfig from './config/search.config'
import PageContent from '@/components/pageContent/PageContent.vue'
import contentConfig from './config/content.config'
import PageModel from '@/components/pageModal/PageModal.vue'
import modalConfig from './config/modal.config'

//我的hook函数
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//工具函数
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系
const { contentRef, queryClick, resetClick } = usePageContent()
const { pageModelRef, create, edit } = usePageModal(
  createCallback,
  editCallback,
)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// 获取选中的菜单
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 获取当前角色已有的权限
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  //不用nextick设置不上去,因为在调用这个回调函数之前的设置(让mMdal显示出来)没有立即生效
  //一定是微任务,因为这个回调函数:promise.resolve().then(fn) || currentFlushPromise.then(fn)
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
// 清空选中
function createCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<style lang="less" scoped></style>
