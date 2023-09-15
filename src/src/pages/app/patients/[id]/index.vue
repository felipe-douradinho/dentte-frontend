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

    <PatientsTabs :page="PatientPageEnum.PageAbout" :patient-id="patientId">
      <div class="columns is-multiline is-flex-tablet-p">
        <div class="column is-6 is-half-tablet-p">
          <div class="column is-12 is-half-tablet-p">
            <VCardAdvanced radius="smooth">
              <template #header-left>
                <h3 class="title is-5 mb-2 mt-2">Felipe Douradinho</h3>
              </template>
              <template #content>
                <table class="table is-hoverable is-fullwidth">
                  <tbody>
                    <tr
                      v-for="(value, index) in Object.entries(userSession.user.data)"
                      :key="index"
                    >
                      <td class="title is-6 is-bold">{{ value[0] }}</td>
                      <td>{{ value[1] }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </VCardAdvanced>
          </div>

          <div class="column is-12 is-half-tablet-p">
            <VCardAdvanced radius="smooth">
              <template #header-left>
                <h3 class="title is-5 mb-2 mt-2">Observações gerais</h3>
              </template>
              <template #content>
                <p>Teste</p>
              </template>
            </VCardAdvanced>
          </div>
        </div>
        <div class="column is-6 is-half-tablet-p">
          <div class="is-12 is-half-tablet-p">
            <div class="column is-12 is-half-tablet-p">
              <VCardAdvanced radius="smooth">
                <template #header-left>
                  <h3 class="title is-5 mb-2 mt-2">Consultas</h3>
                </template>
                <template #content>

                  <PatientAppointmentsList />

                </template>
              </VCardAdvanced>
            </div>
            <div class="column is-12 is-half-tablet-p">
              <VCardAdvanced radius="smooth">
                <template #header-left>
                  <h3 class="title is-5 mb-2 mt-2">Mensagens</h3>
                </template>
                <template #content>
                  <VPlaceholderPage
                    title="Nenhuma mensagem encontrada"
                    subtitle="Você ainda não enviou nenhuma mensagem para este paciente."
                    larger
                  >
                    <template #image>
                      <VIcon
                        icon="majesticons:messages"
                        class="icon-message-placeholder"
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
                      <VButtons align="centered">
                        <VButton>Ir para Comunicações</VButton>
                        <VButton color="primary">Enviar mensagem</VButton>
                      </VButtons>
                    </template>
                  </VPlaceholderPage>
                </template>
              </VCardAdvanced>
            </div>
            <div class="column is-12 is-half-tablet-p">
              <VCardAdvanced radius="smooth">
                <template #header-left>
                  <h3 class="title is-5 mb-2 mt-2">Comunicação</h3>
                </template>
                <template #header-right>
                  <VDropdown icon="feather:more-vertical" right spaced>
                    <template #content>
                      <a href="#" role="menuitem" class="dropdown-item is-media">
                        <div class="icon">
                          <i aria-hidden="true" class="lnil lnil-cog"></i>
                        </div>
                        <div class="meta">
                          <span>Configurações</span>
                          <span>Ver configurações de comunicação</span>
                        </div>
                      </a>
                    </template>
                  </VDropdown>
                </template>
                <template #content>
                  <p>Permitir o envio de:</p>
                  <VField>
                    <VControl>
                      <VSwitchBlock
                        thin
                        color="success"
                        label="Mensagens relacionadas ao serviço prestado"
                        checked
                      />
                    </VControl>
                    <VControl>
                      <VSwitchBlock
                        thin
                        color="success"
                        label="Campanha de marketing"
                        checked
                      />
                    </VControl>
                  </VField>
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
