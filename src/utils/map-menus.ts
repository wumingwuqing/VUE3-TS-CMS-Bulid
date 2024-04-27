import type { RouteRecordRaw } from 'vue-router'

//记录第一个匹配到的路由,用于进入主页后显示一个页面
export let firstMenu: any = null
//动态添加路由
//根据菜单匹配正确的路由
export function mapMenusToRoutes(userMenu: any[]) {
  //1.加载本地路由
  //1.1.获取菜单(参数传进来了)
  //1.2.动态获取路由对象放到数组中
  const localRoutes: RouteRecordRaw[] = []
  //1.2.1路由对象都在独立的文件中,从文件中读取路由对象到数组
  //1.2.1.1读取router/home中的所有ts文件(拿到的是一个对象,key是相对路径,value是文件内容,此处是一个module)
  const files: Record<string, any> = import.meta.glob(
    '../router/home/**/*.ts', // /**/表示匹配所有子目录
    {
      eager: true, //eager:立刻加载
    },
  )
  //1.2.1.2遍历数组,将路由对象push到数组中
  for (const key in files) {
    //根据key取文件内容(module)
    const module = files[key]
    //取出里面的路由对象,使用default导出所以使用default获取
    localRoutes.push(module.default)
  }

  //2.根据菜单匹配正确的路由
  //2.1定义数据存储的变量
  const routes: RouteRecordRaw[] = []
  //2.2添加路由
  //遍历菜单里的一级路由
  for (const menu of userMenu) {
    //遍历菜单里的二级路由
    for (const submenu of menu.children) {
      //2.2.1.根据url匹配正确的路由
      const route = localRoutes.find((item) => {
        //2.2.1.1对菜单里的url进行处理
        const submenuPath = submenu.url.replace('main', 'home')
        //2.2.1.2匹配
        return item.path === submenuPath
      })
      //2.2.2如果找到了对应的路由 //类型缩小
      if (route) {
        //给route的顶层菜单添加重定向功能,但是只需要添加一次即可,用于面包屑的跳转重定向
        if (
          !routes.find(
            (item) =>
              item.path.replace('main', 'home') ===
              menu.url.replace('main', 'home'),
          )
        ) {
          routes.push({
            path: menu.url.replace('main', 'home'),
            redirect: route.path,
          })
        }
        //2.2.2.1添加
        routes.push(route)
      }
      //记录第一个匹配到的路由
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**根据路径匹配菜单
 * @param path 需要匹配的路径
 * @param userMenu 所有的菜单
 */
export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url.replace('main', 'home') === path) {
        return submenu
      }
    }
  }
}

/**根据路径匹配面包屑
 * @param path 需要匹配的路径
 * @param userMenu 所有的菜单
 */
export function mapPathToBreadcrumbs(path: string, userMenu: any[]) {
  const breadcrumbs: {
    name: string
    path: string
  }[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url.replace('main', 'home') === path) {
        //一级菜单
        breadcrumbs.push({
          name: menu.name,
          path: menu.url.replace('main', 'home'),
        })
        //二级菜单
        breadcrumbs.push({
          name: submenu.name,
          path: submenu.url.replace('main', 'home'),
        })
        return breadcrumbs
      }
    }
  }
}

/**菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  //使用递归获取所有id,只需要获取最子级的权限id,菜单就会正确显示
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      //如果还有子级
      if (item.children) {
        // 传入继续递归
        recurseGetId(item.children)
      } else {
        // 否则就是获取id加入集合
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      //如果是第三级菜单
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        //传入空数组,防止报错
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
