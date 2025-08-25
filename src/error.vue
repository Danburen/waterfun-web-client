<!-- NotFound.vue -->
<template>
  <div class="error-container">
    <div class="error-image">
      <!-- 随机SVG将在这里显示 -->
      <component :is="randomSvg" class="animated-svg" />
    </div>
    <div class="error-content">
      <h1>404</h1>
      <h2>页面丢失</h2>
      <p>您访问的页面不存在或已被移除</p>
      <router-link to="/" class="home-link">返回首页</router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.error-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-image {
  flex: 1;
  text-align: center;
}

.error-content {
  flex: 1;
  padding: 2rem;
}

.home-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.home-link:hover {
  background: #3aa876;
  transform: translateY(-2px);
}

/* 动画效果 */
.animated-svg {
  animation: bounce 3s infinite ease-in-out;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>