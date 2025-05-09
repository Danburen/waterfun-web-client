<script setup lang="ts">
import axios from "axios";
import request from "@/utils/axiosRequest";
import {ref, reactive, onMounted, onBeforeMount} from "vue";
import {ElMessage} from "element-plus";
import { deBounce , throttle} from "@/utils/TriggerControl.js"
import VerifyingCodeButton from "~/components/auth/VerifyingCodeButton.vue";
import AuthBox from "~/components/auth/authBox.vue";
import type { LoginRequest , LoginType } from '@/types/LoginRequest'
import { AUTH_USERNAME_REGEX_MAP } from "~/utils/regex";

definePageMeta({
  ssr: false,
})

const i18n = useI18n();
const captchaImage = ref('')
const router = useRouter()
const regexMap: Record<LoginType, RegExp> = AUTH_USERNAME_REGEX_MAP;


const loginForm = reactive<LoginRequest>({
  username:'',
  password:'',
  captcha:'',
  loginType: 'password',
})


const handelLogin = ()=>{
  request.post("auth/login",{
    username:loginForm.username,
    password:loginForm.password,
    captcha:loginForm.captcha,
  }as LoginRequest).then(res=>{
    console.log(res)
    ElMessage({
      message: i18n.t('message.success.login-success'),
      type: "success"
    })
    router.push("home")
  }).catch(err=>{
    console.log(err.response)
    const messageKey = 'message.error.bad-request.'
    const errMessage = () => {
      switch (err.data.code) {
        case 40001: return i18n.t(messageKey + 'username-empty');
        case 40002: return i18n.t(messageKey + 'password-empty');
        case 40003: return i18n.t(messageKey + 'username-or-password-incorrect');
        case 40004: return i18n.t(messageKey + 'captcha-empty');
        case 40006: return i18n.t(messageKey + 'captcha-expired');
        case 40007: return i18n.t(messageKey + 'captcha-incorrect');
      }
    }
    ElMessage({
      message: i18n.t('message.error.login-fail-error') + " : " + errMessage(),
      type: "error"
    })
    console.log(err);
    switch (err.data.code) {
      case 40004:
      case 40006:
      case 40007: refCaptcha();break;
    }
  })
}

/**
 * Captcha code
 * @type {(...args: any[]) => void}
 */
const refreshCaptcha = throttle(()=>refCaptcha(),1000)
function refCaptcha(){
  console.log("refCaptcha");
  request.get('auth/captcha', {responseType:'arraybuffer'}).then((response) => {
    const base64 = btoa(new Uint8Array(response.data).reduce(
        (data,byte) => data + String.fromCharCode(byte),''
    ));
    captchaImage.value= 'data:image/jpeg;base64,' + base64;
  }).catch((error) => {
    ElMessage({
      message: i18n.t('message.error.api-error'),
      type: 'error'
    })
    console.error(error)
  })
}

function checkUsernameFormat(loginType:LoginType, username:string){
  
}

onBeforeMount(()=>{
    refreshCaptcha()
})

onMounted(() => {

})

onBeforeUnmount(() => {

})
</script>

<template>
    <auth-box>
      <el-tabs type="border-card" :stretch="true">
        <!--密码登录-->
        <el-tab-pane :label="$t('auth.tabs.password')">
          <el-form label-width="auto" :model="loginForm" class="auth-form">
            <el-form-item :label="$t('auth.username')">
              <el-input
                  v-model="loginForm.username"
                  :placeholder="$t('auth.placeholder.username')"
                  class="login-input"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('auth.password')">
              <el-input
                  v-model="loginForm.password"
                  type="password"
                  :placeholder="$t('auth.placeholder.password')"
                  class="login-input"
                  show-password
              ></el-input>
            </el-form-item>
            <!--验证码-->
            <el-form-item :label="$t('auth.captcha')">
              <div class="captcha-container">
                <el-input v-model="loginForm.captcha" :placeholder="$t('auth.placeholder.captcha')" style="width: 60%"></el-input>
                <img :src="captchaImage" @click="refreshCaptcha" class="captcha-image" alt="Verifying code"/>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handelLogin">{{ $t('auth.btn.login') }}</el-button>
            </el-form-item>
            <div class="password-addition">
              <a href="" class="forget-password">{{ $t('auth.forget-password') }}</a>
              <a href="" class="register" @click.prevent="router.push('/register')" >{{ $t('auth.register') }}</a>
            </div>
          </el-form>
        </el-tab-pane>
        <!--快捷登录-->
        <el-tab-pane :label="$t('auth.tabs.email-phone')">
          <el-form label-width="auto" :model="loginForm" class="auth-form">
            <el-form-item :label="$t('auth.email') + '/' + $t('auth.phone-number')">
              <el-input
                  v-model="loginForm.username"
                  :placeholder="$t('auth.placeholder.email-phone')"
                  class="login-input"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('auth.captcha')">
              <el-input
                  v-model="loginForm.password"
                  type="password"
                  :placeholder="$t('auth.placeholder.captcha')"
                  class="login-input"
                  show-password
              >
                <template #append>
                  <VerifyingCodeButton></VerifyingCodeButton>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handelLogin">{{ $t('auth.btn.login') }}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--      <div class="third-party-login-box">-->
      <!--        {{$t('auth.third-party-login')}}-->
      <!--      </div>-->
    </auth-box>
<!--    <div class="auth-box">-->
<!--      <div class="logo">-->
<!--        <img src="@/assets/logo.png" alt="" width="40px" height="40px">-->
<!--        <span style="margin-left: 1em">WaterFun</span>-->
<!--      </div>-->

<!--    </div>-->
</template>

<style scoped>

.auth-form{
  font-size: small;
  margin-top: 20px;
}

.password-addition{
  display: flex;
  align-items: center;
}

.password-addition .register{
  margin-left: auto;
}

.login-btn{
  width: 100%;
  margin: 5px auto;
}

.captcha-container {
  display: flex;
  align-items: center;
}
</style>