<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// vue的东西
import { reactive, ref } from 'vue'
//element-plus的东西
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
//我的东西
import useLoginStore from '@/store/login/login'
import type { ILoginAccount } from '@/type'
import { localCache } from '@/utils/cache'

//定义key
const KEY_USERNAME = 'username'
const KEY_PASSWORD = 'password'

//定义数据
const account = reactive<ILoginAccount>({
  username: localCache.getCache(KEY_USERNAME) ?? '',
  password: localCache.getCache(KEY_PASSWORD) ?? '',
})
//定义校验规则
const accountRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'change' },
    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: ' 6 到 12 个字符的数字或字母',
      trigger: 'change',
    },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: ' 6 到 12 个字符的数字或字母',
      trigger: 'blur',
    },
  ],
}
//执行登录逻辑
const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction(isRememberPassword: boolean) {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      //1.获取用户输入的账号和密码
      const { username, password } = account
      loginStore.account.username = username
      loginStore.account.password = password
      //2.调用登录接口
      loginStore.loginAccountAction().then(() => {
        localCache.setCache(KEY_USERNAME, loginStore.account.username)
        //判断是否需要记住密码
        if (isRememberPassword) {
          localCache.setCache(KEY_PASSWORD, loginStore.account.password)
        } else {
          localCache.removeCache(KEY_USERNAME)
          localCache.removeCache(KEY_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请用正确的格式输入账号密码后再尝试登录')
    }
  })
}
//暴露子类方法
defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.panel-account {
  color: rgba(1, 1, 1, 1);
}
</style>
