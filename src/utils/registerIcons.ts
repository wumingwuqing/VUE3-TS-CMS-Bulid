// 用于注册element-plus的图标
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
function regiserIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default regiserIcons
