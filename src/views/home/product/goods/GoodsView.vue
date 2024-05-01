<template>
  <div class="goods">
    <PageSearch
      :searchConfig="searchConfig"
      @queryClick="queryClick"
      @resetClick="resetClick"
    />
    <PageContent
      ref="contentRef"
      :contentConfig="contentConfig"
      @create="create"
      @edit="edit"
    >
      <template #imageSlot="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.status ? 'primary' : 'danger'"
          plain
          style="cursor: default"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
    <PageModal :modalConfig="modalConfig" ref="pageModelRef"></PageModal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/pageSearch/PageSearch.vue'
import PageContent from '@/components/pageContent/PageContent.vue'
import PageModal from '@/components/pageModal/PageModal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
//点击content,modal的操作
const { pageModelRef, create, edit } = usePageModal()

const { contentRef, queryClick, resetClick } = usePageContent()
</script>

<style scoped></style>
