import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function piniaStore(app: App<Element>) {
  app.use(pinia)
  //刷新后应该进行的操作
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default piniaStore
