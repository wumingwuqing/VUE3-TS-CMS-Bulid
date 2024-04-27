/// <reference types="vite/client" />

//用于声明一个名为*.vue的文件模块
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.mjs'
