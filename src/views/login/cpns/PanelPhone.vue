<template>
  <div class="panel-phone">
    <el-form label-width="60px" size="large" :rules="accountRules">
      <el-form-item label="手机号" prop="phone_number">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码" prop="verify_code">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, ElForm } from 'element-plus'
// 定义校验规则
const accountRules: FormRules = {
  phone_number: [
    { message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'change' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
  ],
  verify_code: [{ message: '请输入验证码', trigger: 'blur' }],
}
// 执行登录逻辑
function loginAction() {
  ElMessage.error('请用正确的格式输入账号密码后再尝试登录')
}
//暴露子类方法
defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
