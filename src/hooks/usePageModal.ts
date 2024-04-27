import { ref } from 'vue'
import type PageModel from '@/components/pageModal/PageModal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(
  creatCallback?: CallbackFnType,
  editCallback?: CallbackFnType, //这个回调函数用于获取正在编辑的一行的数据,获取当前角色已有的权限
) {
  //实例
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  //创建的事件处理
  function create() {
    pageModelRef.value?.setModalVisble()
    if (creatCallback) creatCallback()
  }
  //编辑的事件处理
  function edit(itemData: any) {
    // 1.让modal显示出来
    pageModelRef.value?.setModalVisble(false, itemData)
    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }
  //返回
  return { pageModelRef, create, edit }
}
export default usePageModal
