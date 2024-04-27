const modalConfig = {
  pageName: 'goods',
  header: {
    creaTitle: '新建商品',
    editTitle: '编辑商品',
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称',
      initialValue: '',
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入部门领导',
    },
    {
      type: 'input',
      label: '新价格',
      prop: 'newPrice',
      placeholder: '请输入新价格',
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'newPrice',
      placeholder: '请输入商品描述',
    },
  ],
}

export default modalConfig
