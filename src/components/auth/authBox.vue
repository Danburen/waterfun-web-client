<script setup lang="ts">

</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" width="40px" height="40px">
        <span style="margin-left: 1em">WaterFun</span>
      </div>
      <div class="slot-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background-color: #f0f4f7;
}

.auth-box {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.slot-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo{
  display: flex;
  align-items: center;
  padding: 15px;
}
</style>