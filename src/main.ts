import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import piniaStore from './store'
import regiserIcons from './utils/registerIcons'

import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App)
app.use(regiserIcons)
app.use(piniaStore)
app.use(router)
app.use(hljsVuePlugin)
app.mount('#app')
