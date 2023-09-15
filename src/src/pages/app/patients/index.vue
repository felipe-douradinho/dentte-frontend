<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Pesquisar Pacientes')

onMounted(() => {
  viewWrapper.setBackLink(null)
})

useHead({
  title: 'Pacientes - Pesquisa',
})
</script>

<template>
  <div class="page-content-inner">
    <PatientsList />
  </div>
</template>
