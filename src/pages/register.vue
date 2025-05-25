<script setup lang="ts">
import type {FormInstance} from "element-plus";
import VerifyingCodeButton from "~/components/auth/VerifyingCodeButton.vue";
import type {ElInput} from "../../.nuxt/components";

definePageMeta({
  ssr: false,
})
const registerFormRef = ref<FormInstance>()

const registerForm = reactive({
  username: '',
  phone: '',
  smsCode: '',
})

const handleRegister = async () => {

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
            v-model="registerForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.phone')" prop="phone">
        <el-input :placeholder="$t('auth.placeholder.phone')" v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('auth.verify-code')" prop="smCode">
        <el-input
            v-model="registerForm.smsCode"
            :placeholder="$t('auth.placeholder.verify-code')"
            class="login-input"
        ></el-input>
        <template #append>
          <VerifyingCodeButton></VerifyingCodeButton>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="">{{ $t('auth.btn.register') }}</el-button>
      </el-form-item>
    </el-form>
  </auth-box>
</template>

<style scoped>
.register-form{
  width: 80%;
}
</style>