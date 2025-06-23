<script setup lang="ts">
import request from "~/utils/requests/axiosRequest";
import {ElMessage} from "element-plus";
import {useI18n} from 'vue-i18n';

const i18n = useI18n();

// 定义 props
const props = defineProps<{
  username: string
  getType: 'sms_code' | 'email_code'
  codePurpose: 'login' | 'register' | 'reset_password'
}>();

const countDown = ref(0);
let timer = null as NodeJS.Timeout | null;

const getVerifyingCode = () => {
  if(countDown.value > 0) return;
  // 构建请求参数
  let requestData: any = {};
  if (props.getType === 'sms_code') {
    requestData = {
      phoneNumber: props.username,
      purpose: props.codePurpose
    };
  } else if (props.getType === 'email_code') {
    requestData = {
      email: props.username,
      purpose: props.codePurpose
    };
  }

  throttledSendCode(requestData)
  countDown.value = 5;
  setUpIntervalTimer();
}

const throttledSendCode =
  throttle((requestData: {
    phoneNumber?: string;
    email?: string;
    purpose: 'login' | 'register' | 'reset_password'
  }) => {
    console.log("code sent", requestData);
    const url = props.getType === 'sms_code' ? '/auth/sendSmsCode' : '/auth/sendEmailCode';
    request.post(url, requestData)
        .then(res => {
          if (res.data.code === 200) {
            ElMessage.success(i18n.t('message.success.verificationCodeSent'));
          }
        })
        .catch(err => {
          ElMessage.error(err.data.message || i18n.t('message.error.verificationCodeSendFailed'));
        });
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