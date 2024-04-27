import hyRequest from '..'
//获取角色列表
export function getEntireRoles(data: { offset?: number; size?: number } = {}) {
  return hyRequest.post({
    url: '/role/list',
    data,
  })
}
// 获取部门列表
export function getEntireDepartments(
  data: { offset?: number; size?: number } = {},
) {
  return hyRequest.post({
    url: '/department/list',
    data,
  })
}
//获取菜单列表
export function postEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
  })
}
