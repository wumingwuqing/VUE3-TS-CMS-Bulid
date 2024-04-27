import {
  deletePageById,
  postCreatePageData,
  postEditPageData,
  postPageListData,
} from '@/service/home/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

import userMainStore from '@/store/home/main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageList: [],
    pageTotalCount: 0,
  }),
  actions: {
    //针对页面数据(非用户的其他数据,其实用户数据也可以用这个)增删改查
    async postPageListDataAction(pageName: string = '', queryInfo: any = {}) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdDataAction(pageName: string = '', id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListDataAction(pageName)
      return deleteResult
    },
    async postCreatePageDataAction(pageName: string = '', pageInfo: any) {
      const createResult = await postCreatePageData(pageName, pageInfo)
      this.postPageListDataAction(pageName)
      //重新获取数据
      const mainStore = userMainStore()
      mainStore.fetchEntireDataAction()
      return createResult
    },
    async postEditPageDataAction(
      pageName: string = '',
      id: number,
      queryInfo: any,
    ) {
      const updateResult = await postEditPageData(pageName, id, queryInfo)
      this.postPageListDataAction(pageName)
      //重新获取数据
      const mainStore = userMainStore()
      mainStore.fetchEntireDataAction()
      return updateResult
    },
  },
})
export default useSystemStore
