const modalConfig = {
  pageName: 'role',
  header: {
    creaTitle: '新建角色',
    editTitle: '编辑角色',
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialValue: '',
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍',
    },
  ],
}

export default modalConfig
