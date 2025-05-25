<script setup lang="ts">
import axios from "axios";
import request from "@/utils/axiosRequest";
import {ref, reactive, onMounted, onBeforeMount, nextTick} from "vue";
import {ElMessage, type FormInstance, type FormRules, type TabsPaneContext} from "element-plus";
import { deBounce , throttle} from "@/utils/TriggerControl.js"
import VerifyingCodeButton from "~/components/auth/VerifyingCodeButton.vue";
import AuthBox from "~/components/auth/authBox.vue";
import type { LoginRequest , LoginType } from '@/types/LoginRequest'
import { validateUsername , validatePassword , validateVerifyCode} from "~/utils/Validator";
import type {ElInput} from "../../.nuxt/components";
import {undefined} from "zod";
import {ErrorMessage} from "vee-validate";

definePageMeta({
  ssr: false,
})

type LoginTabType = 'password'|'fast-auth';

const i18n = useI18n();
const router = useRouter();

const captchaImage = ref('');
const passAuthForm = ref<FormInstance>();
const fastAuthForm = ref<FormInstance>();
const loginTab = ref<LoginTabType>('password');

const passLoginForm = reactive({
  username:'',
  password:'',
  captcha:'',
  loginType: 'password' as LoginType,
})

const fastLoginForm = reactive({
  username:'',
  verifyCode:'',
  loginType: 'sms' as LoginType,
})

const passAuthRules = reactive<FormRules<typeof passLoginForm>>({
  username:[{validator: validateUsername('password'),trigger: "blur" }],
  password:[{validator: validatePassword,trigger: "blur"}],
  captcha:[{validator: validateVerifyCode, trigger: "blur"}],
})

const fastAuthRules = reactive<FormRules<typeof fastLoginForm>>({
  username: [{validator: validateUsername('sms'),trigger: "blur" }],
  verifyCode: [{validator: validateVerifyCode, trigger: "blur"}],
})

const resetForm = (passAuthForm: FormInstance | undefined,fastAuthForm: FormInstance | undefined) => {
  if(!passAuthForm) return;
  passAuthForm.resetFields();
  if(!fastAuthForm) return;
  fastAuthForm.resetFields();
}

const buildRequest= ():LoginRequest =>{
  if(loginTab.value === "password"){
    return passLoginForm as LoginRequest;
  }else{
    return {
      username: fastLoginForm.username,
      loginType: fastLoginForm.loginType,
      ...(fastLoginForm.loginType === 'sms'
              ? { smsCode: fastLoginForm.verifyCode }
              : { emailCode: fastLoginForm.verifyCode }
      ),
    }as LoginRequest;
  }
}

const submitForm = (form: FormInstance | undefined) => {
  if(!form) return;
  form.validate(valid => {
    if(valid){
      request.post("auth/login",buildRequest()).then(res=>{
        console.log(res)
        ElMessage({
          message: i18n.t('message.success.login-success'),
          type: "success"
        })
        router.push("home")
      }).catch(err=>{
        console.log(err.response)
        ElMessage({
          message: getErrorMessage(err.data.code),
          type: "error"
        })
        switch (err.data.code) {
          case 40004:
          case 40006:
          case 40007: refCaptcha();break;
        }
      })
    }else{
      console.log("error");
    }
  })
}


watch(()=>fastLoginForm.username,deBounce((value:string)=>{
  if(loginTab.value === 'fast-auth'){
      if(value.includes('@')){
        fastLoginForm.loginType = 'email';
        fastAuthRules.username = [{validator: validateUsername('email'),trigger: "blur" }];
      }else{
        fastLoginForm.loginType = 'sms';
        fastAuthRules.username = [{validator: validateUsername('sms'),trigger: "blur" }];
      }
    }
},300))

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
      <el-tabs
          type="border-card"
          :stretch="true"
          v-model="loginTab"
          @tab-click="resetForm(passAuthForm,fastAuthForm)"
      >
        <!--密码登录-->
        <el-tab-pane :label="$t('auth.tabs.password')" name="password">
          <el-form
              ref = 'passAuthForm'
              label-width="auto"
              :model="passLoginForm"
              :rules="passAuthRules"
              class="auth-form"
          >
            <el-form-item :label="$t('auth.username')" prop="username">
              <el-input
                  v-model="passLoginForm.username"
                  :placeholder="$t('auth.placeholder.username')"
                  class="login-input"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('auth.password')"  prop="password">
              <el-input
                  v-model="passLoginForm.password"
                  type="password"
                  :placeholder="$t('auth.placeholder.password')"
                  class="login-input"
                  show-password
              ></el-input>
            </el-form-item>
            <!--验证码-->
            <el-form-item :label="$t('auth.verify-code')" prop="captcha">
              <div class="captcha-container">
                <el-input v-model="passLoginForm.captcha" :placeholder="$t('auth.placeholder.verify-code')" style="width: 60%" prop="verifyCode"></el-input>
                <img :src="captchaImage" @click="refreshCaptcha" class="captcha-image" alt="Verifying code"/>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="submitForm(passAuthForm)">{{ $t('auth.btn.login') }}</el-button>
            </el-form-item>
            <div class="password-addition">
              <a href="" class="forget-password">{{ $t('auth.forget-password') }}</a>
              <a href="" class="register" @click.prevent="router.push('/register')" >{{ $t('auth.register') }}</a>
            </div>
          </el-form>
        </el-tab-pane>
        <!--快捷登录-->
        <el-tab-pane :label="$t('auth.tabs.email-phone')" name="fast-auth">
          <el-form
              ref = 'fastAuthForm'
              label-width="auto"
              :model="fastLoginForm"
              :rules="fastAuthRules"
              class="auth-form"
          >
            <el-form-item :label="$t('auth.email') + '/' + $t('auth.phone')" prop="username">
              <el-input
                  ref='usernameInputRef'
                  v-model="fastLoginForm.username"
                  :placeholder="$t('auth.placeholder.email-phone')"
                  class="login-input"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('auth.verify-code')" prop="verifyCode">
              <el-input
                  v-model="fastLoginForm.verifyCode"
                  :placeholder="$t('auth.placeholder.verify-code')"
                  class="login-input"
              >
                <template #append>
                  <VerifyingCodeButton></VerifyingCodeButton>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="submitForm(fastAuthForm)">{{ $t('auth.btn.login') }}</el-button>
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