// import { localCache } from '@/utils/cache';
import hyRequest from '..'
import type { ILoginAccount } from '@/type'
// import { LOGIN_TOKEN } from '@/global/Constants';

//发送网络请求验证登录并获取token
export function accountLoginRequest(account: ILoginAccount) {
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}

// 获取用户信息
export function getUserInfoByID(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // 服务器的token(另一个记住密码的实现)
    // headers: {
    //   Authorization:  localCache.getCache(LOGIN_TOKEN),
    // },
  })
}
// 获取菜单
export function getUserMenuByRoleID(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  })
}
