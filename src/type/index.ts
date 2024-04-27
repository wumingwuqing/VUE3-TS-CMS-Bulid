export * from './loginType'

export interface IStateReturn {
  account: any
  token: string
  id: number
  userInfo: {
    code: number
    data: {
      id: number
      name: string
      realname: string
      cellphone: number
      enable: number
      createAt: string
      updateAt: string
      role: {
        id: number
        name: string
        intro: string
        createAt: string
        updateAt: string
      }
      department: {
        id: number
        name: string
        parentId: any
        createAt: string
        updateAt: string
        leader: string
      }
    }
  }
}
