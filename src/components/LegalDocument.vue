<script setup lang="ts">
export interface LegalDocPropsType {
  title: string,
  content: string,
  lastUpdate: Date
}

defineProps<LegalDocPropsType>()
</script>

<template>
  <div class="header-container">
    <div class="title" style="font-size: 30px">{{ title }}</div>
    <div class="content">{{$t('info.lastUpdateTime') + lastUpdate}}</div>
  </div>
  <div class="content-container">
    {{content}}
  </div>
  <div class="footer-container">
    <div class="footer">
      CopyRight © WaterFun.top All Rights Reserved.
    </div>
  </div>
</template>

<style scoped>
.header-container {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  justify-content: center;
  display: flex;
  padding: 30px 0;
  color: white;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.footer-container {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  padding: 20px 0;
  text-align: center;
  color: white;
  font-size: 14px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 顶部轻微阴影增强层次感 */
}

.content-container {
  background: white;
  padding: 30px;
  min-height: 300px; /* 确保内容区域有最小高度 */
  color: #333; /* 深灰色文字提升可读性 */
  box-shadow: 0 0 15px rgba(173, 216, 230, 0.2); /* 淡蓝色阴影柔和过渡 */
  margin: 0 auto;
  max-width: 1200px; /* 限制内容宽度避免过宽 */
}
</style>