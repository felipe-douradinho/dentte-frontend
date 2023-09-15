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

    <PatientsTabs :page="PatientPageEnum.PageAnamnesis" :patient-id="patientId">

      <VButtons>
        <VButton color="primary" icon="material-symbols:add-circle-rounded" elevated>
          NOVA ANAMNESE
        </VButton>
      </VButtons>

      <div class="column is-12 is-half-tablet-p">
        <VCardAdvanced radius="smooth">
          <template #header-left>
            <h3 class="title is-5 mb-2 mt-2">Anamneses</h3>
          </template>
          <template #content>
            <VPlaceholderPage
              title="Paciente sem anamnese preenchida"
              subtitle="Você ainda não salvou nenhuma anamnese para este paciente."
              larger
            >
              <template #image>
                <VIcon
                  icon="tabler:report-medical"
                  class="icon-anamnesis-placeholder"
                />
                <!--                      <img-->
                <!--                        class="light-image"-->
                <!--                        src="/@src/assets/illustrations/placeholders/search-1.svg"-->
                <!--                        alt=""-->
                <!--                      />-->
                <!--                      <img-->
                <!--                        class="dark-image"-->
                <!--                        src="/@src/assets/illustrations/placeholders/search-1-dark.svg"-->
                <!--                        alt=""-->
                <!--                      />-->
              </template>
              <template #action>
                <div class="content mt-5">
                  <ul>
                    <li>Lembrete de alertas de restrições, alertas, etc.</li>
                    <li>Personalize e configure os modelos de anamnese</li>
                    <li>Conheça o histórico de saúde do seu paciente</li>
                    <li>Assinatura eletrônica de documentos emitidos</li>
                  </ul>
                </div>
                <VButtons align="centered">
                  <VButton color="primary">Nova Anamnese</VButton>
                </VButtons>
              </template>
            </VPlaceholderPage>
          </template>
        </VCardAdvanced>
      </div>

    </PatientsTabs>

  </div>
</template>

<style lang="scss" scoped>
.icon-anamnesis-placeholder {
  font-size: 3em;
}
.page-placeholder {
  min-height: 300px;
}
</style>
