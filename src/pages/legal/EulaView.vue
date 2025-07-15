<script setup lang="ts">

import {resourceApi} from "~/api/resourceApi";
import { LangMap } from "~/types/BaseType";
import type {FileResDataType} from "~/types/ResponseDataType";
import LegalDocument, {type LegalDocPropsType} from "~/components/LegalDocument.vue";
const i18n = useI18n();

const legalDocProps = reactive<LegalDocPropsType>({
  title: i18n.t('confirm.userAgreement'),
  content:'',
  lastUpdate: new Date(),
})
onMounted(()=>{
  resourceApi.getEula(LangMap[i18n.locale.value]).then((response : FileResDataType) => {
    legalDocProps.content = response.content;
    legalDocProps.lastUpdate = new Date(response.lastModified);
  }).catch(error => {
    console.log(error);
  })
})
</script>

<template>
<LegalDocument v-bind="legalDocProps"></LegalDocument>
</template>

<style scoped>

</style>