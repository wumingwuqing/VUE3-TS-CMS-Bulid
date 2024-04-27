const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    // btnTitle: '新建菜单',
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '180px' },
    { label: '级别', prop: 'type', width: '180px', align: 'center' },
    { label: '菜单url', prop: 'url', width: '180px' },
    { label: '菜单icon', prop: 'icon', width: '240px' },
    { label: '排序', prop: 'sort', width: '120px', align: 'center' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
    },
  },
}

export default contentConfig
