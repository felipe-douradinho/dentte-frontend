<route lang="yaml">
meta:
  requiresAuth: true
</route>

<template>
  <SideblockLayout theme="color-curved" :open-on-mounted="true">
    <!-- Content Wrapper -->
    <RouterView v-slot="{ Component }">
      <Transition name="fade-fast" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </SideblockLayout>
</template>
