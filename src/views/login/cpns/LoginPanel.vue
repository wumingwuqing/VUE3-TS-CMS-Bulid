<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间区域 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登陆</span>
            </div>
          </template>
          <PanelAccount ref="accountRef"></PanelAccount>
        </el-tab-pane>

        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone ref="phoneRef"></PanelPhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="onLoginButtonClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { ref, watch } from 'vue'
//组件
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
//我的工具
import { localCache } from '@/utils/cache'

/*
 * 记住密码的实现
 * 1. 创建一个变量，用于记录是否记住密码
 * 2. 获取缓存中的值，用于初始化变量的值
 * 3. 监听变量的变化，将变量的值保存到缓存中
 */
const KEY_ISREMPWD = 'isRememberPassword'
const isRememberPassword = ref<boolean>(
  localCache.getCache(KEY_ISREMPWD) ?? false,
)
watch(isRememberPassword, (newValue) => {
  localCache.setCache(KEY_ISREMPWD, newValue)
})

/*
 * 1. 创建一个变量，用于记录当前激活的选项卡
 *
 */
const activeName = ref('account')

/* 1. 创建两个子组件的实例，用于调用子组件的方法
 * 2. 监听activeName的变化
 * 3. 调用子组件的方法保存或者不报存登录信息
 */
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const phoneRef = ref<InstanceType<typeof PanelPhone>>() //预留

function onLoginButtonClick() {
  if (activeName.value === 'account') {
    //获取子组件的实例  //调用子组件的方法
    accountRef.value?.loginAction(isRememberPassword.value)
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
