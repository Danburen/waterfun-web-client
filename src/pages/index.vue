<script setup lang="ts">
import { onBeforeMount } from "vue";
import {useUserStore} from "~/stores/userStore";


const useStore = useUserStore();
const checkLoginStatus = ()=>{

}

onBeforeMount(() => {

})
</script>

<template>
  <div class="header">
    <header-nav-menu></header-nav-menu>
  </div>
  <div class="container">

  </div>
  <div class="footer">

  </div>
</template>

<style scoped>

</style>