<script setup lang="ts">
import type {FormInstance} from "element-plus";
import VerifyingCodeButton from "~/components/auth/VerifyingCodeButton.vue";
import type {ElInput} from "../../.nuxt/components";

definePageMeta({
  ssr: false,
})
const registerFormRef = ref<FormInstance>()

const buttonLoad = ref(false)
const expandShow = ref(true)

const registerForm = reactive({
  username: '',
  phone: '',
  smsCode: '',
})

const handleRegister = () => {

}

</script>

<template>
  <auth-box>
    <el-form
      :model="registerForm"
      label-width="auto"
      ref="registerFormRef"
      class="register-form"
    >
      <el-form-item :label = "$t('auth.username')" prop="username">
        <el-input
            :placeholder="$t('auth.placeholder.username')"
            v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.phone')" prop="phone">
        <el-input :placeholder="$t('auth.placeholder.phone')" v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.verify-code')" prop="smCode">
        <el-input
            v-model="registerForm.smsCode"
            :placeholder="$t('auth.placeholder.verify-code')"
            class="login-input">
          <template #append>
            <VerifyingCodeButton></VerifyingCodeButton>
          </template>
        </el-input>
      </el-form-item>
      <!-- 补充信息 -->
      <el-form-item class="supplementary-info-container">
          <el-text tag="b">{{ $t('auth.supplementary-info') }}</el-text>
          <el-link underline="never" href="" @click.prevent="expandShow = !expandShow" class="expand-btn">
            {{ expandShow ? $t('auth.btn.collapse') : $t('auth.btn.expand') }}</el-link>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="expandShow" class="supplementary-info-container">
          <el-form-item :label="$t('auth.password')"  prop="password">
            <el-input
                type="password"
                :placeholder="$t('auth.placeholder.password')"
                class="login-input"
                show-password></el-input>
          </el-form-item>
          <el-form-item :label="$t('auth.email')" prop="username">
            <el-input
                ref='usernameInputRef'
                :placeholder="$t('auth.placeholder.email')"
                class="login-input"></el-input>
          </el-form-item>
        </div>
      </el-collapse-transition>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="">{{ $t('auth.btn.register') }}</el-button>
      </el-form-item>
    </el-form>
  </auth-box>
</template>

<style scoped>
.register-form {
  width: 80%;
}

.login-btn {
  width: 100%;
}

.supplementary-info-container .expand-btn {
  margin-left: auto;
}
</style>