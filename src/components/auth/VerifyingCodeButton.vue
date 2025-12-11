<script setup lang="ts">
import request from "../../utils/axiosRequest";
import {ElMessage} from "element-plus";
import {useI18n} from 'vue-i18n';
import { authApi } from "~/api/authApi";
import type {SendCodeType} from "~/types/api/auth";
import { throttle } from "@waterfun/web-core/src/triggerControl";
import { generateFingerprint } from "@waterfun/web-core/src/fingerprint";
import type { VerifyScene } from "~/types/api/auth";

const i18n = useI18n();

const props = defineProps<{
  username: string
  getType: 'sms' | 'email'
  scene: VerifyScene
}>();

const countDown = ref(0);
let timer = null as NodeJS.Timeout | null;

const getVerifyingCode = async () => {
  if(countDown.value > 0) return;
  let requestData: any = {};
  requestData = {
    target: props.username,
    channel: props.getType,
    scene: props.scene,
    deviceFp: await generateFingerprint(),
  }

  throttledSendCode(requestData)
  countDown.value = 5;
  setUpIntervalTimer();
}

const throttledSendCode =
   throttle(async (requestData: SendCodeType) => {
    console.log("code sent", requestData);
    await authApi.sendCode(requestData)
        .then(res => {
          ElMessage.success(i18n.t('message.success.verificationCodeSent'))
        }).catch((err)=>{
          ElMessage.error("发送验证码失败");
        })
  }, 5000,()=>{
    ElMessage.error(i18n.t('message.throttled.clickTooFast'));
  });

const setUpIntervalTimer = () =>{
  if(timer == null) {
    timer = setInterval(()=>{
      if(countDown.value > 0){
        countDown.value -=1;
        localStorage.setItem("verifyingCode:countDown", String(countDown.value));
      }else{
        if (timer != null) {
          clearInterval(timer);
        }
        localStorage.removeItem("verifyingCode:countDown");
      }
    },1000)
  }
}

onUnmounted(()=>{

})

onBeforeMount(()=>{
  if(localStorage.getItem("verifyingCode:countDown") == null){
    countDown.value = 0;
  }else{
    countDown.value = Number(localStorage.getItem("verifyingCode:countDown"));
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
    {{ countDown > 0 ? $t('auth.countDown',{countDown})  : $t('auth.btn.getVerificationCode') }}
  </el-button>
</template>

<style scoped>

</style>