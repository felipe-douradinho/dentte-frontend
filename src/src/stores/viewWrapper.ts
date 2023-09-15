import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useViewWrapper = defineStore('viewWrapper', () => {
  const isPushed = ref(false)
  const isPushedBlock = ref(false)
  const pageTitle = ref('Welcome')
  const backLink = ref<string | null>(null)
  const isTab = ref<boolean | null>(null)

  function setPushed(value: boolean) {
    isPushed.value = value
  }
  function setPushedBlock(value: boolean) {
    isPushedBlock.value = value
  }
  function setPageTitle(value: string) {
    pageTitle.value = value
  }
  function setBackLink(value: string | null) {
    backLink.value = value
  }
  function setIsTab(value: boolean | null) {
    isTab.value = value
  }

  return {
    isPushed,
    isPushedBlock,
    pageTitle,
    backLink,
    isTab,
    setPushed,
    setPushedBlock,
    setPageTitle,
    setBackLink,
    setIsTab,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useViewWrapper, import.meta.hot))
}
