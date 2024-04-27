<template>
  <div class="content">
    <!-- 头部信息 -->
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button
        v-if="isCreate && Boolean(contentConfig?.header?.btnTitle)"
        type="primary"
        @click="handleCreateUserClick"
        >{{ contentConfig?.header?.btnTitle ?? '新增数据' }}</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="(item, index) in contentConfig.propsList" :key="index">
          <!-- 时间 -->
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <!-- 操作 -->
          <template v-else-if="item.type === 'handle'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  type="primary"
                  icon="edit"
                  text
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="isDelete"
                  size="small"
                  type="danger"
                  icon="delete"
                  text
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <!-- 自定义 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <!-- 默认 -->
          <template v-else>
            <el-table-column v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        small
        layout="total,sizes, prev, pager, next"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
//我的东西
import useSystemStore from '@/store/home/system/system'

import { formatUTC } from '@/utils/format'
import { message } from '@/utils/operatorResultMessage'

interface Iprops {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<Iprops>()

//页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 0.获取是否有对应的增删改查的权限
import usePermissions from '@/hooks/usePermissions'
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起网络请求，请求的数据
const systemStore = useSystemStore()
function fetchPageListData(formData: any = {}) {
  if (isQuery || props.contentConfig.pageName === 'story') {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = {
      offset,
      size,
    }
    //发送网络请求
    const queryInfo = { ...pageInfo, ...formData }
    systemStore.postPageListDataAction(props.contentConfig.pageName, queryInfo)
  }
}
fetchPageListData()
//暴露网络请求方法
defineExpose({
  fetchPageListData,
})

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//3.新建编辑和删除用户
const emit = defineEmits(['create', 'edit'])
function handleCreateUserClick() {
  emit('create')
}
function handleEdit(row) {
  emit('edit', row)
}
function handleDelete(id: number) {
  //删除数据
  systemStore
    .deletePageByIdDataAction(props.contentConfig.pageName, id)
    .then((res) => {
      message(res)
    })
}
//监听action被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'postCreatePageDataAction' ||
      name === 'postEditPageDataAction' ||
      name === 'deletePageByIdDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
