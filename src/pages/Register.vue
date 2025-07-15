<script setup lang="ts">
import {InfoFilled} from '@element-plus/icons-vue'
import {type FormInstance, type FormRules} from "element-plus";
import VerifyingCodeButton from "~/components/auth/VerifyingCodeButton.vue";
import type {ElInput} from "../../.nuxt/components";
import {validateEmail, validatePassword, validatePhoneNumber} from "~/utils/validator";
import {validateUsername} from "~/utils/validator";
import useUserStore from "~/stores/userStore";
import type {RegisterRequest} from "~/types/LoginRequest";

const registerFormRef = ref<FormInstance>()

const buttonLoad = ref(false)
const expandShow = ref(true)
const licenceCheck = ref(false)
const router = useRouter();

const { register } = useUserStore();

const registerForm = reactive({
  phone: '',
  username: '',
  smsCode: '',
  email: '',
  password: '',
})

const regRules = reactive<FormRules<typeof registerForm>>({
  phone: [{validator:validatePhoneNumber(false), trigger:"blur"}],
  smsCode:[{validator:validateVerifyCode(false), trigger:"blur"}],
  username:[{validator:validateUsername(false), trigger:"blur"}],
  email:[{validator:validateEmail(true), trigger:"blur"}],
  password:[{validator:validatePassword(true),trigger:"blur"}],
})

const handleRegister = () => {
  register(registerForm as RegisterRequest).then(()=> {
    ElMessage({
      message: translate('message.success.registerSuccess'),
      type: "success",
    })
    router.push("/")
  })
}

</script>

<template>
  <auth-box>
    <el-form
      :model="registerForm"
      label-width="auto"
      label-position="right"
      ref="registerFormRef"
      class="register-form"
      :rules="regRules"
    >
      <el-form-item :label = "$t('auth.username')" prop="username">
        <el-input
            :placeholder="$t('auth.placeholder.username')"
            v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.phone')" prop="phone">
        <el-input :placeholder="$t('auth.placeholder.phone')" v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.verifyCode')" prop="smsCode">
        <el-input
            v-model="registerForm.smsCode"
            :placeholder="$t('auth.placeholder.verifyCode')"
            class="login-input">
          <template #append>
            <VerifyingCodeButton :username="registerForm.phone" :getType="registerForm.phone ? 'sms' : 'email'" :codePurpose="'register'"></VerifyingCodeButton>
          </template>
        </el-input>
      </el-form-item>
      <!-- 补充信息 -->
      <el-form-item class="supplementary-info-container">
        <el-text tag="b">{{ $t('auth.supplementaryInfo') }}</el-text>
        <el-tooltip :content="$t('message.tooltip.optionalField')" placement="right"><el-link underline="never" :icon="InfoFilled"></el-link></el-tooltip>
        <el-link underline="never" href="" @click.prevent="expandShow = !expandShow" class="expand-btn">
            {{ expandShow ? $t('auth.btn.collapse') : $t('auth.btn.expand') }}</el-link>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="expandShow" class="supplementary-info-container">
          <el-form-item :label="$t('auth.password')"  prop="password">
            <el-input
                type="password"
                v-model="registerForm.password"
                :placeholder="$t('auth.placeholder.password')"
                class="login-input"
                show-password></el-input>
          </el-form-item>
          <el-form-item :label="$t('auth.email')" prop="email">
            <el-input
                v-model="registerForm.email"
                :placeholder="$t('auth.placeholder.email')"
                class="login-input"></el-input>
          </el-form-item>
        </div>
      </el-collapse-transition>
      <el-form-item label-width="auto">
        <el-button type="primary" class="login-btn" @click="handleRegister">{{ $t('auth.btn.register') }}</el-button>
        <div class="addition-container">
          <el-checkbox size="small" v-model="licenceCheck">
            {{ $t('confirm.confirmReadLicences')  + ' ' }}
            <a href="/" >{{ $t('confirm.userAgreement') }}</a>
          </el-checkbox>
          <el-button  size="small" link class="to-login" @click.prevent="router.push('/login')">{{ $t('auth.toLogin') }}</el-button>
        </div>

      </el-form-item>

    </el-form>
  </auth-box>
</template>

<style scoped>
.register-form {
  width: 95%;
  padding: 5px;
}

.login-btn {
  width: 100%;
}

.supplementary-info-container .expand-btn {
  margin-left: auto;
}

.addition-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.addition-container .to-login{
  margin-left: auto;
}
</style>