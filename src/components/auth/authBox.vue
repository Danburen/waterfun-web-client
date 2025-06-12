<script setup lang="ts">

</script>

<template>
  <div class="container">
    <el-card class="auth-box" shadow="always">
      <div class="logo">
        <img src="@/assets/logo.png" width="40px" height="40px" alt="WaterFun">
        <span style="margin-left: 1em">WaterFun</span>
      </div>
      <div class="slot-container">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

/*container style*/
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-card) {

}
/*@Departed*/
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
  border-radius: 8px;
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