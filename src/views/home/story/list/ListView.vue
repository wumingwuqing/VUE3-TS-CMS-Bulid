<template>
  <div class="list">
    <PageContent :contentConfig="contentConfig"></PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/pageContent/PageContent.vue'
import contentConfig from './config/content.config'
</script>

<style scoped></style>
