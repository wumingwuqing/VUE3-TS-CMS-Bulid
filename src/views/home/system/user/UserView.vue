<template>
  <div class="user">
    <!-- 搜索栏 -->
    <PageSearch
      :search-config="searchConfig"
      @query-click="queryClick"
      @reset-click="resetClick"
    />
    <!-- 内容栏 -->
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @create="create"
      @edit="edit"
    >
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'primary' : 'danger'"
          plain
          style="cursor: default"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
    <!-- 弹窗 -->
    <PageModel :modalConfig="modalConfigRef" ref="pageModelRef"></PageModel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageSearch from '@/components/pageSearch/PageSearch.vue'
import PageContent from '@/components/pageContent/PageContent.vue'
import PageModel from '@/components/pageModal/PageModal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import useMainStore from '@/store/home/main'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//定义form数据
interface formItem {
  type?: string
  label?: string
  prop?: string
  placeholder?: string
  initialValue?: string
  options?: Array<{
    label: string
    value: string
  }>
}
interface ModalConfig {
  pageName: string
  header: {
    creaTitle: string
    editTitle: string
  }
  formItems: Array<formItem>
}

//获取服务器给的完整数据
const modalConfigRef = computed((): ModalConfig => {
  //从store中获取完整的部门数据
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  //如果是配置文件里的'选择部门',就添加进去完整的部门数据
  modalConfig.formItems.forEach((item: formItem) => {
    if (item.prop === 'departmentId') {
      item.options = departments
    }
  })

  //从store中获取完整的角色数据
  const roles = mainStore.entireRoles.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  //如果是配置文件里的'选择角色',就添加进去完整的角色数据
  modalConfig.formItems.forEach((item: formItem) => {
    if (item.prop === 'roleId') {
      item.options = roles
    }
  })
  return modalConfig
})
//点击search,content的操作
const { contentRef, queryClick, resetClick } = usePageContent()
//点击content,modal的操作
const { pageModelRef, create, edit } = usePageModal()
</script>

<style lang="less" scoped></style>
