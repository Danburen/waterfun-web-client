<script setup lang="ts">
import request from "@/utils/axiosRequest";
const countDown = ref(0);
let timer = null as NodeJS.Timeout | null;

const getVerifyingCode = () =>{
  if(countDown.value > 0) return;

  //... get VerifyingCode

  throttle(function(){
    request.post("auth/verify-code")
  },60000)

  countDown.value = 60;
  setUpIntervalTimer()
}

const setUpIntervalTimer = () =>{
  if(timer == null) {
    timer = setInterval(()=>{
      if(countDown.value > 0){
        countDown.value -=1;
        localStorage.setItem("verifying-code:countDown", String(countDown.value));
      }else{
        if (timer != null) {
          clearInterval(timer);
        }
        localStorage.removeItem("verifying-code:countDown");
      }
    },1000)
  }
}

onUnmounted(()=>{

})

onBeforeMount(()=>{
  if(localStorage.getItem("verifying-code:countDown") == null){
    countDown.value = 0;
  }else{
    countDown.value = Number(localStorage.getItem("verifying-code:countDown"));
    setUpIntervalTimer();
  }
})
</script>

<template>
  <el-button type="primary"
             underline="false"
             class=""
             @click.prevent="getVerifyingCode"
             :disabled="countDown > 0">
    {{ countDown > 0 ? countDown : $t('auth.btn.get-verification-code') }}
  </el-button>
</template>

<style scoped>

</style>