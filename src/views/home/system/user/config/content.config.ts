const contentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新建用户',
  },
  propsList: [
    { type: 'selection', align: 'center', label: '选择', width: '60px' },
    { type: 'index', align: 'center', label: '序号', width: '60px' },

    {
      type: 'normal',
      align: 'center',
      label: '用户名',
      prop: 'name',
      width: '180px',
    },
    {
      type: 'normal',
      align: 'center',
      label: '真实姓名',
      prop: 'realname',
      width: '180px',
    },
    {
      type: 'normal',
      align: 'center',
      label: '手机号码',
      prop: 'cellphone',
      width: '180px',
    },
    {
      type: 'custom',
      slotName: 'status',
      align: 'center',
      label: '状态',
      prop: 'enable',
      width: '100px',
    },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作', width: '150px' },
  ],
}

export default contentConfig
