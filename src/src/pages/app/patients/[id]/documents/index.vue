<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { PatientPageEnum } from '/@src/components/pages/patients/interfaces/PatientPageEnum'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Influencer Dashboard')

onMounted(() => {
  viewWrapper.setBackLink('/app/patients')
  viewWrapper.setIsTab(true)
})

useHead({
  title: 'Influencer Dashboard - Sidebar - Vuero',
})

const route = useRoute()
const patientId = (route.params?.id as number) ?? ''
</script>

<template>
  <div class="page-content-inner">
    <Teleport to="[data-teleport-bg]">
      <div class="lifestyle-dashboard-bg"></div>
    </Teleport>

    <PatientsTabs :page="PatientPageEnum.PageDocuments" :patient-id="patientId">
      Conteudo Documents
    </PatientsTabs>
  </div>
</template>
