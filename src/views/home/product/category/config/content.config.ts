const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
  },
  propsList: [
    { type: 'selection', align: 'center', label: '选择', width: '100px' },
    { type: 'index', align: 'center', label: '序号', width: '100px' },
    { prop: 'name', label: '类别名称', minWidth: '120', align: 'center' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'create',
      align: 'center',
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'update',
      align: 'center',
    },
    { type: 'handle', label: '操作', width: '150px' },
  ],
}
export default contentConfig
