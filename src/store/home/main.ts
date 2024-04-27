import {
  getEntireDepartments,
  postEntireMenus,
  getEntireRoles,
} from '@/service/home'
import { defineStore } from 'pinia'
import type { IMainState } from './type'

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      //请求数据
      const entireRoles = await getEntireRoles()
      const entireDepartments = await getEntireDepartments()
      const entireMenus = await postEntireMenus()
      //保存数据
      this.entireRoles = entireRoles.data.list
      this.entireDepartments = entireDepartments.data.list
      this.entireMenus = entireMenus.data.list
    },
  },
})

export default useMainStore
