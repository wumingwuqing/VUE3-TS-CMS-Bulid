<template>
  <div class="category">
    <PageSearch
      :searchConfig="searchConfig"
      @queryClick="queryClick"
      @resetClick="resetClick"
    />
    <PageContent
      ref="contentRef"
      pageName="category"
      :contentConfig="contentConfig"
    ></PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/pageSearch/PageSearch.vue'
import PageContent from '@/components/pageContent/PageContent.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

import usePageContent from '@/hooks/usePageContent'

const { contentRef, queryClick, resetClick } = usePageContent()
</script>

<style scoped></style>
