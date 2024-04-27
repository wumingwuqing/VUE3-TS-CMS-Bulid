<template>
  <div class="menu">
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @create="create"
      @edit="edit"
    />
    <PageModel :modalConfig="modalConfig" ref="pageModelRef"></PageModel>
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/pageContent/PageContent.vue'
import contentConfig from './config/content.config'

import PageModel from '@/components/pageModal/PageModal.vue'
import modalConfig from './config/modal.config'

// import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// const { contentRef, queryClick, resetClick } = usePageContent()
const { pageModelRef, create, edit } = usePageModal()
</script>

<style scoped></style>
