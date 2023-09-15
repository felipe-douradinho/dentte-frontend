<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { PatientPageEnum } from '/@src/components/pages/patients/interfaces/PatientPageEnum'

import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useUserSession } from '/@src/stores/userSession'

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
const userSession = useUserSession()
</script>

<template>
  <div class="page-content-inner">
    <Teleport to="[data-teleport-bg]">
      <div class="lifestyle-dashboard-bg"></div>
    </Teleport>

    <PatientsTabs :page="PatientPageEnum.PageTreatments" :patient-id="patientId">
      <div class="columns is-multiline is-flex-tablet-p">
        <div class="column is-8 is-half-tablet-p">
          <div class="column is-12 is-half-tablet-p">
            <VCardAdvanced radius="smooth">
              <template #header-left>
                <h3 class="title is-5 mb-2 mt-2">Adicionar tratamento</h3>
              </template>
              <template #content>

                <div class="columns is-multiline">
                  <div class="column is-3">
                    <VField>
                      <VControl>
                        <VSelect>
                          <VOption value="">Selecione um plano</VOption>
                          <VOption value="none">Nenhum</VOption>
                          <VOption value="particular">Particular</VOption>
                        </VSelect>
                      </VControl>
                    </VField>
                  </div>
                  <div class="column is-4">
                    <VField>
                      <VControl icon="fluent:pill-28-filled">
                        <VInput type="text" placeholder="Tratamento" />
                      </VControl>
                    </VField>
                  </div>
                  <div class="column is-3">
                    <VField>
                      <VControl icon="mdi:tooth">
                        <VInput type="text" placeholder="Dentes / Região" />
                      </VControl>
                    </VField>
                  </div>
                  <div class="column is-2">
                    <VField>
                      <VControl icon="ri:money-dollar-circle-fill">
                        <VInput type="text" placeholder="0,00" />
                      </VControl>
                    </VField>
                  </div>
                </div>

                <div class="columns is-multiline">
                  <div class="column is-12">
                    <VButtons>
                      <VButton color="primary" icon="material-symbols:save" elevated>
                        SALVAR TRATAMENTO
                      </VButton>
                    </VButtons>
                  </div>
                </div>

              </template>
            </VCardAdvanced>
          </div>

          <div class="column is-12 is-half-tablet-p">

            <PatientTreatmentsList />

          </div>
        </div>
        <div class="column is-4 is-half-tablet-p">
          <div class="is-12 is-half-tablet-p">
            <div class="column is-12 is-half-tablet-p">

              <VCardAdvanced radius="smooth">
                <template #header-left>
                  <h3 class="title is-5 mb-2 mt-2">Evoluções</h3>
                </template>
                <template #header-right>
                  <VButtons>
                    <VIconButton
                      color="primary"
                      circle
                      icon="material-symbols:add-circle-rounded"
                    />
                  </VButtons>
                </template>
                <template #content>

                  <PatientTreatmentEvolutionsList />

                </template>
              </VCardAdvanced>
            </div>
          </div>
        </div>
      </div>
    </PatientsTabs>
  </div>
</template>

<style lang="scss" scoped>
.icon-message-placeholder {
  font-size: 3em;
}
.page-placeholder {
  min-height: 300px;
}
</style>
