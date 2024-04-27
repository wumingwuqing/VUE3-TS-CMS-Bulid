<template>
  <div class="department">
    <PageSearch
      :searchConfig="searchConfigRef"
      @queryClick="queryClick"
      @resetClick="resetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @create="create"
      @edit="edit"
    >
      <!-- <template #leader="scope"><span class="test"> text:{{ scope.row[scope.prop] }}</span> </template> -->
    </PageContent>
    <PageModel :modalConfig="modalConfigRef" ref="pageModelRef"></PageModel>
  </div>
</template>

<script setup lang="ts" name="department">
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
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  modalConfig.formItems.forEach((item: formItem) => {
    if (item.prop === 'parentId') {
      item.options = departments
    }
  })
  return modalConfig
})
const searchConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  searchConfig.formItems.forEach((item: formItem) => {
    if (item.prop === 'parentId') {
      item.options = departments
    }
  })
  return searchConfig
})
//点击search,content的操作
const { contentRef, queryClick, resetClick } = usePageContent()
//点击content,modal的操作
const { pageModelRef, create, edit } = usePageModal()
</script>

<style scoped>
.test {
  color: red;
}
</style>
