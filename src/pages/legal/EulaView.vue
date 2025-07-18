<script setup lang="ts">

import {resourceApi} from "~/api/resourceApi";
import { LangMap } from "~/types/BaseType";
import type { FileResDataType} from "~/types/ResponseDataType";
import LegalDocument, {type LegalDocPropsType} from "~/components/LegalDocument.vue";
import { base64ToUint8Array } from "~/utils/dataAdaptor"
const i18n = useI18n();

const route = useRoute()
const router = useRouter()

const legalDocProps = reactive<LegalDocPropsType>({
  title: i18n.t('confirm.userAgreement'),
  content:i18n.t('info.loading'),
  lastUpdate: new Date(),
})

const returnPath = computed(() => {
  return router.getRoutes().at(-1)?.path ?? '/';
})

const handleConfirm = () =>{
  router.push({
    path: returnPath.value,
    query:{
      userAgreementConfirm: 'true',
      ...(route.query.from ? {}: {from: route.path}),
    }
  })
}

onMounted(()=>{
  resourceApi.getEula(LangMap[i18n.locale.value]).then((response : FileResDataType) => {
    legalDocProps.content = new TextDecoder('utf-8').decode(
        base64ToUint8Array(response.content)
    );
    legalDocProps.lastUpdate = new Date(response.lastModified);
  }).catch(error => {
    console.log(error);
  })
})
</script>

<template>
<LegalDocument v-bind="legalDocProps" @confirm="handleConfirm"></LegalDocument>
</template>

<style scoped>

</style>