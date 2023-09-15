<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { PatientPageEnum } from '/@src/components/pages/patients/interfaces/PatientPageEnum'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Paciente')

onBeforeMount(() => {
  viewWrapper.setBackLink('/app/patients')
  viewWrapper.setIsTab(true)
})

onBeforeRouteLeave(() => {
  viewWrapper.setIsTab(false)
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

    <PatientsTabs :page="PatientPageEnum.PageBudgets" :patient-id="patientId">
      <div class="columns is-multiline is-flex-tablet-p">
        <div class="column is-12 is-half-tablet-p">

          <VButtons>
            <VButton color="primary" icon="material-symbols:add-circle-rounded" elevated>
              NOVO ORÇAMENTO
            </VButton>
          </VButtons>

          <PatientBudgetsList />

        </div>
      </div>
    </PatientsTabs>
  </div>
</template>

<style lang="scss" scoped>

</style>
