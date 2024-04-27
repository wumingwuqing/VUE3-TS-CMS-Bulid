import { ref } from 'vue'
import type PageContent from '@/components/pageContent/PageContent.vue'

function usePageContent() {
  //实例
  const contentRef = ref<InstanceType<typeof PageContent>>()
  //查找的事件处理
  function queryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  //重置的事件处理
  function resetClick() {
    contentRef.value?.fetchPageListData({})
  }
  //返回
  return { contentRef, queryClick, resetClick }
}

export default usePageContent
