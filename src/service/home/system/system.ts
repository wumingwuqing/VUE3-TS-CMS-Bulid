import hyRequest from '@/service'

//**针对页面的增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}
export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  })
}

export function postCreatePageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `${pageName}`,
    data: pageInfo,
  })
}
export function postEditPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
  })
}
