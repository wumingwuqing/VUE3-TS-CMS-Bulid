<template>
  <div class="code">
    <highlightjs :language="language" :code="code" />
  </div>
</template>

<script lang="ts" setup>
import 'highlight.js/styles/github.css'

//props
const { language, code } = defineProps({
  language: {
    type: String,
    default: 'html',
  },
  code: {
    type: String,
    default: '',
  },
})
</script>

<style lang="less" scoped>
:deep(.hljs) {
  padding: 10px;
  text-align: left;
  background: #f0f0f0 !important;
}
</style>
