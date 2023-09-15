<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Painel Principal')

useHead({
  title: 'Main Dashboard - My app',
})
</script>

<template>
  <div class="page-content-inner">
    <AnalyticsDashboard />
  </div>
</template>
