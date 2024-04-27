<template>
  <div class="count-card">
    <!-- 上 -->
    <div class="header">
      <!-- 标题 -->
      <span class="title">{{ title }}</span>
      <!-- 文字提示 -->
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon>
          <Warning />
        </el-icon>
      </el-tooltip>
    </div>
    <!-- 中 -->
    <div class="content">
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <!-- 下 -->
    <div class="footer">
      <span>{{ subtitle }}:&nbsp;</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
//vue的东西
import { ref, onMounted } from 'vue'
//数字动画库
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
// 设置默认值
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量',
})

// 获取要添加数字动画的元素
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// 数字动画的配置项
const countOption = {
  prefix: props.amount === 'saleroom' ? '¥' : '',
}
// 确定组件挂载后创建数字动画并播放
onMounted(() => {
  // CountUp(target, endVal, options?):参数一: 执行动画的元素,  参数二: 数字增加到的值, 参数三?:动画的配置项
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption)
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
