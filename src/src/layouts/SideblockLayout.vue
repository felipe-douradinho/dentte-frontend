<script setup lang="ts">
import type { SideblockTheme } from '/@src/components/navigation/desktop/Sideblock.vue'
import { usePanels } from '/@src/stores/panels'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const props = withDefaults(
  defineProps<{
    theme?: SideblockTheme
    defaultSideblock?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSideblock: 'dashboard',
    theme: 'default',
  }
)

const viewWrapper = useViewWrapper()
const panels = usePanels()
const route = useRoute()
const openSideblockLinks = ref('')
const isMobileSideblockOpen = ref(false)
const isDesktopSideblockOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSideblock)

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushedBlock(isDesktopSideblockOpen.value ?? false)
})
onMounted(() => {
  viewWrapper.setPushed(false)
})
watch(
  () => route.fullPath,
  () => {
    isMobileSideblockOpen.value = false

    if (props.closeOnChange && isDesktopSideblockOpen.value) {
      isDesktopSideblockOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    >
      <template #brand>
        <RouterLink to="/" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    >
      <template #links>
        <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            aria-label="Display dashboard content"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'dashboard'"
            @click="activeMobileSubsidebar = 'dashboard'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:activity"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display layout content"
            :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'layout'"
            @click="activeMobileSubsidebar = 'layout'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display element content"
            :class="[activeMobileSubsidebar === 'elements' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'elements'"
            @click="activeMobileSubsidebar = 'elements'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:box"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display components content"
            :class="[activeMobileSubsidebar === 'components' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'components'"
            @click="activeMobileSubsidebar = 'components'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:cpu"></i>
          </a>
        </li>
        <li>
          <RouterLink to="/messaging-v1">
            <i aria-hidden="true" class="iconify" data-icon="feather:message-circle"></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a
            aria-label="Display search panel"
            tabindex="0"
            @keydown.space.prevent="panels.setActive('search')"
            @click="panels.setActive('search')"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
          </a>
        </li>
        <li>
          <a aria-label="View settings" href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <LayoutsMobileSubsidebar
        v-if="isMobileSideblockOpen && activeMobileSubsidebar === 'layout'"
      />
      <DashboardsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'dashboard'"
      />
      <ComponentsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'components'"
      />
      <ElementsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'elements'"
      />
    </Transition>

    <!-- Desktop navigation -->
    <CircularMenu />

    <!-- Desktop menu links -->
    <Transition name="slide-x">
      <Sideblock v-if="isDesktopSideblockOpen" :theme="props.theme">
        <template #header>
          <RouterLink to="/" class="sidebar-block-logo">
            <AnimatedLogo width="36px" />
          </RouterLink>
          <h3>Dentte</h3>
        </template>
        <template #links>
          <li>
            <RouterLink to="/app/dashboard" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:grid"></i>
              </span>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/patients" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="icon-park-solid:teeth"></i>
              </span>
              Pacientes
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/schedules" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="icon-park-solid:calendar"></i>
              </span>
              Agenda
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/sales" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="bi:kanban-fill"></i>
              </span>
              Vendas
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/financial/cashflows" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="ri:money-euro-box-fill"></i>
              </span>
              Financeiro
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/comunications" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="majesticons:messages"></i>
              </span>
              Comunicação
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/stocks" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="vaadin:stock"></i>
              </span>
              Estoque
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/settings" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="material-symbols:settings-rounded"></i>
              </span>
              Ajustes
            </RouterLink>
          </li>
        </template>

        <template #bottom-links>
          <UserProfileDropdown up />
          <LayoutSwitcher />

          <a
            class="search-link"
            aria-label="Display search panel"
            data-content="Search"
            tabindex="0"
            @keydown.space.prevent="panels.setActive('search')"
            @click="panels.setActive('search')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather-search"
            />
          </a>
        </template>
      </Sideblock>
    </Transition>

    <LanguagesPanel />
    <ActivityPanel />
    <SearchPanel />
    <TaskPanel />

    <VViewWrapper full>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              v-if="viewWrapper.backLink"
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
            >
              <router-link :to="viewWrapper.backLink" class="btn btn-sm show">
                <span class="menu-toggle has-chevron">
                  <span
                    :class="[isDesktopSideblockOpen && 'active']"
                    class="icon-box-toggle"
                  >
                    <span class="rotate">
                      <i aria-hidden="true" class="icon-line-top"></i>
                      <i aria-hidden="true" class="icon-line-center"></i>
                      <i aria-hidden="true" class="icon-line-bottom"></i>
                    </span>
                  </span>
                </span>
              </router-link>
            </div>

            <div class="title-wrap" v-if="false">
              <h1 class="title is-4">{{ viewWrapper.pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar">
              <ToolbarNotification />

              <a
                class="toolbar-link right-panel-trigger"
                aria-label="View activity panel"
                tabindex="0"
                @keydown.space.prevent="panels.setActive('activity')"
                @click="panels.setActive('activity')"
              >
                <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
              </a>
            </Toolbar>
          </div>

          <slot v-if="!viewWrapper.isTab"></slot>
        </VPageContent>

      </VPageContentWrapper>

      <div v-if="true === viewWrapper.isTab" class="tabs-wrapper-custom">
        <slot></slot>
      </div>

    </VViewWrapper>
  </div>
</template>
