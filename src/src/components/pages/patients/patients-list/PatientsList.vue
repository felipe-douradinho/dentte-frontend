<script setup lang="ts">
import type { VAvatarProps } from '/@src/components/base/avatar/VAvatar.vue'
import * as gridData from '/@src/data/patients/patients-list'
import { type Ref } from 'vue'

export interface UserData extends VAvatarProps {
  username: string
  location: string
  position: string
}

const users = gridData.users as UserData[]
const filters = ref('')
const showNewPatientModal = ref(false) as Ref<boolean>

const filteredData = computed(() => {
  if (!filters.value) {
    return users
  } else {
    return users.filter((item) => {
      return (
        item.username.match(new RegExp(filters.value, 'i')) ||
        item.location.match(new RegExp(filters.value, 'i')) ||
        item.position.match(new RegExp(filters.value, 'i')) ||
        item.badge?.match(new RegExp(filters.value, 'i'))
      )
    })
  }
})

const valueSingle = ref(0)
const optionsSingle = [
  'All',
  'UI/UX Design',
  'Web Development',
  'Software Eng.',
  'Business',
]
</script>

<template>
  <div>
    <div class="tile-grid-toolbar">
      <VControl icon="feather:search" :fullwidth="true">
        <input
          v-model="filters"
          class="input custom-text-filter"
          placeholder="Pesquisar paciente..."
        />
      </VControl>
      <VButton
        color="primary"
        to="/app/patients/create"
        raised
        size="huge"
        @click="showNewPatientModal = true"
      >
        <span class="icon">
          <i aria-hidden="true" class="fas fa-plus"></i>
        </span>
        <span>Cadastrar Novo</span>
      </VButton>
    </div>

    <div class="tile-grid tile-grid-v1">
      <!--List Empty Search Placeholder -->
      <VPlaceholderPage
        :class="[filteredData.length !== 0 && 'is-hidden']"
        title="We couldn't find any matching results."
        subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
        larger
      >
        <template #image>
          <img
            class="light-image"
            src="/@src/assets/illustrations/placeholders/search-6.svg"
            alt=""
          />
          <img
            class="dark-image"
            src="/@src/assets/illustrations/placeholders/search-6-dark.svg"
            alt=""
          />
        </template>
      </VPlaceholderPage>

      <!--Tile Grid v1-->
      <TransitionGroup name="list" tag="div" class="columns is-multiline">
        <!--Grid item-->
        <div v-for="(item, key) in filteredData" :key="key" class="column is-4">
          <div class="tile-grid-item">
            <div class="tile-grid-item-inner">
              <VAvatar
                :picture="item.picture"
                :badge="item.badge"
                :color="item.color"
                :initials="item.initials"
                size="medium"
              />
              <div class="meta">
                <span class="dark-inverted">{{ item.username }}</span>
                <span>{{ item.position }}</span>
              </div>
              <UserCardDropdown />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <NewPatientModal :show-modal="showNewPatientModal" @close="showNewPatientModal = false" />
  </div>
</template>

<style lang="scss" src="./PatientsList.scss" />
