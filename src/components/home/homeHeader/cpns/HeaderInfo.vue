<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span>
        <el-icon>
          <Message />
        </el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon>
          <ChatDotRound />
        </el-icon>
      </span>
      <span>
        <el-icon>
          <Search />
        </el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <!-- 头像 用户名 -->
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://p1.ssl.qhimg.com/t0167955e5f22953246.jpg"
          />
          <span class="name">{{ username }}</span>
        </span>
        <!-- 下拉框 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>

            <el-dropdown-item>
              <el-icon>
                <Unlock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>

            <el-dropdown-item divided @click="handleExitClick">
              <el-icon>
                <CircleClose />
              </el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue的东西
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 我的东西
import { LOGIN_TOKEN } from '@/global/Constants'
import { localCache } from '@/utils/cache'
import useLoginStore from '@/store/login/login'

// 退出登录
const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
// 获取用户信息
const loginStore = useLoginStore()
const username = ref(loginStore.userInfo?.name)
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
