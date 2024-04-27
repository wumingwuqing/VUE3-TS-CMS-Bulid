<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="
        isCreate ? modalConfig.header.creaTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <!-- 表单内容 -->
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="(item, index) in modalConfig.formItems" :key="index">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>

              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <!-- 按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" plain @click="handelConfirmClick"
            >确定</el-button
          >
          <el-button type="primary" plain @click="centerDialogVisible = false"
            >取消</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { reactive, ref } from 'vue'
//我的东西
import { message } from '@/utils/operatorResultMessage'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      creaTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

//表单中的数据
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive(initialData)
const editData = ref<any>(null)
//表单可见性控制
const isCreate = ref(true)
const centerDialogVisible = ref(false)
function setModalVisble(iscreate: boolean = true, itemData?) {
  centerDialogVisible.value = true
  //编辑数据
  if (!iscreate && itemData) {
    isCreate.value = false
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    //新建数据
    isCreate.value = true
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
defineExpose({
  setModalVisble,
})

//点击了确定
import useSystemStore from '@/store/home/system/system'
const systemStore = useSystemStore()
function handelConfirmClick() {
  centerDialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isCreate.value && editData.value) {
    //编辑
    systemStore
      .postEditPageDataAction(
        props.modalConfig.pageName,
        editData.value.id,
        infoData,
      )
      .then((res) => {
        message(res)
      })
  } else {
    //创建
    systemStore
      .postCreatePageDataAction(props.modalConfig.pageName, infoData)
      .then((res) => {
        message(res)
      })
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
