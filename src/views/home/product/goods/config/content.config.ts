export const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    // btnTitle: '新建商品',
  },
  propsList: [
    { prop: 'name', label: '商品名称', align: 'center' },
    { prop: 'oldPrice', label: '原价格', align: 'center', width: '70px' },
    { prop: 'newPrice', label: '新价格', align: 'center', width: '70px' },
    { prop: 'desc', label: '商品描述', align: 'center' },
    {
      type: 'custom',
      slotName: 'status',
      prop: 'status',
      label: '状态',
      align: 'center',
      width: '80px',
    },
    {
      type: 'custom',
      prop: 'imgUrl',
      label: '图片',
      slotName: 'imageSlot',
      align: 'center',
      width: '80px',
    },
    { prop: 'inventoryCount', label: '库存', align: 'center', width: '70px' },
    { prop: 'saleCount', label: '销量', align: 'center', width: '70px' },
    { prop: 'favorCount', label: '收藏', align: 'center', width: '70px' },
    { prop: 'address', label: '地址', align: 'center', width: '70px' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '120px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '120px' },
    { type: 'handle', label: '操作', width: '90px' },
  ],
}
export default contentConfig
