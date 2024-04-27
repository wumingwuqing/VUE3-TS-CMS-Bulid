import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoByID,
  getUserMenuByRoleID,
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/Constants'
import useMainStore from '@/store/home/main'

import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'

import type { IStateReturn } from './type'

const useLoginStore = defineStore('login', {
  state: (): IStateReturn => ({
    account: {
      username: '',
      password: '',
    },
    id: -1,
    token: '',
    userInfo: {},
    userMenu: [],
    permissions: [],
  }),
  actions: {
    //登陆后缓存数据
    async loginAccountAction() {
      // 1.发送网络请求 获取 id token
      const loginResult = await accountLoginRequest(this.account)
      this.id = loginResult?.data?.id
      this.token = loginResult?.data?.token

      // 保存token
      localCache.setCache(LOGIN_TOKEN, this.token)

      //2.获取用户的角色
      const userInfo = await getUserInfoByID(this.id)
      this.userInfo = userInfo?.data

      //3.根据角色信息请求角色权限(菜单)
      const userMenu = await getUserMenuByRoleID(this.userInfo?.role?.id)
      this.userMenu = userMenu?.data
      console.log(userMenu)
      //4.进行缓存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)

      //5. 获取登录用户的所有权限( 增 || 删 || 改 || 查 )
      const permissions = mapMenusToPermissions(this.userMenu)
      this.permissions = permissions
      console.log(permissions)
      //6.动态添加路由
      const routes = mapMenusToRoutes(userMenu.data)
      routes.forEach((route) => router.addRoute('home', route))

      //7.请求所有的roles/departments/menus数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //8.进行页面跳转
      router.push('/home')
    },
    //刷新缓存数据
    loadLocalCacheAction() {
      //用户刷新的时候默认加载数据的操作
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      // 只有在都有值的时候才进行操作
      if (token && userInfo && userMenu) {
        // 1.赋值操作
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('home', route))
        // 3.获取按钮的权限
        const permissions = mapMenusToPermissions(userMenu)
        this.permissions = permissions
        // 4.请求所有的roles/departments/menus数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      }
    },
  },
})

export default useLoginStore
