<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Novo Paciente')

onMounted(() => {
  viewWrapper.setBackLink('/app/patients')
})

useHead({
  title: 'Pacientes - Novo Paciente',
})

const selectedPlan = ref('')
const selectedColor = ref('')
const calendarTarget = ref('')
const notificationMedium = ref('')
const notificationTarget = ref('')
const date = ref({
  start: new Date(),
  end: new Date(),
})

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})

const options = ref(['All day'])

const onSubmit = () => {
  console.log('Form submitted!')
}

const data = [
  {
    title: 'Dados do Responsável (opcional)',
    content: '',
  },
]
</script>


<template>
  <div class="page-content-inner">

    <form class="form-layout is-stacked" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Dados do Paciente</h3>
            </div>
            <div class="right">
              <div class="buttons">
                <VButton
                  icon="lnir lnir-arrow-left rem-100"
                  to="/app/patients"
                  light
                  dark-outlined
                >
                  Cancelar
                </VButton>
                <VButton type="submit" color="primary" raised> Cadastrar </VButton>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section">
            <div class="columns is-multiline">
              <div class="column is-12">
                <VField>
                  <VControl icon="feather:user">
                    <VInput type="text" placeholder="Ex: Maria dos Santos" />
                  </VControl>
                </VField>
              </div>

              <div class="column is-3">
                <VField>
                  <VLabel>Nascimento</VLabel>
                  <VControl icon="feather:user">
                    <VDatePicker v-model="date" color="green" trim-weeks>
                      <template #default="{ inputValue, inputEvents }">
                        <VField>
                          <VControl icon="feather:calendar">
                            <input
                              class="input v-input"
                              type="text"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </VControl>
                        </VField>
                      </template>
                    </VDatePicker>
                  </VControl>
                </VField>
              </div>
              <div class="column is-3">
                <VField>
                  <VLabel>CPF</VLabel>
                  <VControl>
                    <VInput
                      type="text"
                      placeholder="000.000.000-00"
                      autocomplete="given-name"
                    />
                  </VControl>
                </VField>
              </div>
              <div class="column is-3">
                <VField>
                  <VLabel>RG</VLabel>
                  <VControl>
                    <VInput
                      type="text"
                      placeholder=""
                      autocomplete="given-name"
                    />
                  </VControl>
                </VField>
              </div>
              <div class="column is-3">
                <VField>
                  <VLabel>Celular do Paciente</VLabel>
                  <VControl>
                    <VInput
                      type="text"
                      placeholder="(00) 00000-0000"
                      autocomplete="given-name"
                    />
                  </VControl>
                </VField>
              </div>

              <div class="column is-12">
                <VField>
                  <VControl>
                    <VRadio
                      v-model="options"
                      value="All day"
                      label="Masculino"
                      color="primary"
                    />
                    <VRadio
                      v-model="options"
                      value="Repeat every week"
                      label="Feminino"
                      color="primary"
                    />
                  </VControl>
                </VField>
              </div>

              <div class="column is-12">
                <VField>
                  <VLabel>Observações</VLabel>
                  <VControl>
                    <VTextarea
                      class="textarea"
                      rows="4"
                      placeholder="(opcional)"
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck="true"
                    />
                  </VControl>
                </VField>
              </div>

              <div class="column is-12">
                <VCollapse with-chevron :items="data">
                  <template #collapse-item-content>
                    <div class="form-section-inner">
                      <div class="columns is-multiline">
                        <div class="column is-8">
                          <VField>
                            <VLabel>Nome do Responsável</VLabel>
                            <VControl icon="feather:user">
                              <VInput type="text" placeholder="" />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-3">
                          <VField>
                            <VLabel>Nascimento</VLabel>
                            <VControl icon="feather:user">
                              <VDatePicker v-model="date" color="green" trim-weeks>
                                <template #default="{ inputValue, inputEvents }">
                                  <VField>
                                    <VControl icon="feather:calendar">
                                      <input
                                        class="input v-input"
                                        type="text"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                      />
                                    </VControl>
                                  </VField>
                                </template>
                              </VDatePicker>
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-3">
                          <VField>
                            <VLabel>CPF</VLabel>
                            <VControl>
                              <VInput
                                type="text"
                                placeholder="000.000.000-00"
                                autocomplete="given-name"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-3">
                          <VField>
                            <VLabel>Celular do Responsável</VLabel>
                            <VControl>
                              <VInput
                                type="text"
                                placeholder="(00) 00000-0000"
                                autocomplete="given-name"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                    </div>
                  </template>
                </VCollapse>
              </div>
            </div>
          </div>

          <div class="form-section is-grey">
            <div class="form-section-inner">
              <div class="columns is-multiline">
                <div class="column is-12">

                  <VTabs
                    selected="additional-info"
                    :tabs="[
                      { label: 'Informações Adicionais', value: 'additional-info', icon: 'fas fa-users' },
                      { label: 'Plano', value: 'plan', icon: 'feather:box' },
                      { label: 'Endereço', value: 'address', icon: 'lnil lnil-licencse' },
                    ]"
                  >
                    <template #tab="{ activeValue }">
                      <div
                        v-if="activeValue === 'additional-info'"
                        class="columns is-multiline"
                      >
                        <div class="column is-6">
                          <VField>
                            <VLabel>E-mail</VLabel>
                            <VControl icon="feather:user">
                              <VInput type="email" placeholder="" />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <VLabel>Telefone</VLabel>
                            <VControl icon="feather:phone">
                              <VInput type="text" placeholder="(00) 00000-0000" />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                      <div
                        v-else-if="activeValue === 'plan'"
                        class="columns is-multiline"
                      >
                        <div class="column is-12">
                          <VField>
                            <VLabel>Plano</VLabel>
                            <VControl>
                              <VSelect v-model="selectedPlan">
                                <VOption value="">Selecione um plano</VOption>
                                <VOption value="none">Nenhum</VOption>
                                <VOption value="particular">Particular</VOption>
                              </VSelect>
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-4">
                          <VField>
                            <VLabel>Número da Carteirinha</VLabel>
                            <VControl>
                              <VInput type="text" placeholder="" />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-4">
                          <VField>
                            <VLabel>Titular do Plano</VLabel>
                            <VControl icon="feather:user">
                              <VInput type="text" placeholder="(00) 00000-0000" />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-4">
                          <VField>
                            <VLabel>CPF do Responsável</VLabel>
                            <VControl icon="feather:phone">
                              <VInput type="text" placeholder="000.000.000-00" />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                      <div
                        v-else-if="activeValue === 'address'"
                        class="columns is-multiline"
                      >
                        <div class="column is-3">
                          <VField>
                            <VLabel>CEP</VLabel>
                            <VControl>
                              <VInput type="text" placeholder="00000-000" />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-9">
                          <VField>
                            <VLabel>Endereço</VLabel>
                            <VControl>
                              <VInput type="text" placeholder="Ex: Rua dos Santos" />
                            </VControl>
                          </VField>
                        </div>
                      </div>

                    </template>
                  </VTabs>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </form>

  </div>
</template>

<style lang="scss" src="/@src/components/shared/form.scss" />

<style lang="scss">
.collapse {
  margin-bottom: 0 !important;
}
</style>
