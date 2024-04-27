import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/Constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: 'error',
      component: () => import('../views/not-found/NotFoundView.vue'),
    },
  ],
})

//导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  //判断是否登录
  if (to.path.startsWith('/home') && !token) return '/login'

  //如果进入到home,那么就跳转到已经匹配到的第一个页面
  if (to.path === '/home') return firstMenu?.url.replace('main', 'home')
})

export default router
