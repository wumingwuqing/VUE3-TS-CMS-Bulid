import useLoginStore from '@/store/login/login'

//获取是否拥有某一权限的结果
function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
