const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门',
  },
  propsList: [
    { type: 'selection', align: 'center', label: '选择', width: '100px' },
    { type: 'index', align: 'center', label: '序号', width: '100px' },

    {
      type: 'normal',
      align: 'center',
      label: '部门名称',
      prop: 'name',
      width: '200px',
    },
    {
      type: 'normal',
      align: 'center',
      label: '部门领导',
      prop: 'leader',
      width: '200px',
    },
    {
      type: 'normal',
      align: 'center',
      label: '上级部门',
      prop: 'parentId',
      width: '200px',
    },

    // { type: 'custom', align: 'center', label: '部门领导', prop: 'leader', width: '150px', slotName: 'leader' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作', width: '150px' },
  ],
}

export default contentConfig
