<script setup lang="ts">
import type {
  VFlexTableWrapperSortFunction,
  VFlexTableWrapperFilterFunction,
} from '/@src/components/base/table/VFlexTableWrapper.vue'
import { treatments } from '/@src/data/patients/treatments/patient-treatments-list'

type Treatment = typeof treatments[0]

// duplicate user data to grow the array
const data: Treatment[] = []
for (let i = 0; i < 200; i++) {
  data.push(...treatments)
}

// this is a sample for custom sort function
const idSorter: VFlexTableWrapperSortFunction<Treatment> = ({ order, a, b }) => {
  if (order === 'asc') {
    return a.id.localeCompare(b.id)
  } else if (order === 'desc') {
    return b.id.localeCompare(a.id)
  }

  return 0
}

// this is a sample for custom filter function
const planFilter: VFlexTableWrapperFilterFunction<Treatment> = ({ searchTerm, row }) => {
  if (!searchTerm) {
    return true
  }

  // search either in the name or the bio
  return (
    row.plan.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    row.treatment.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
}

const columns = {
  plan: {
    label: 'Plano',
    sortable: true,
    searchable: true,
    filter: planFilter,
  },
  treatment: {
    label: 'Tratamento',
    sortable: true,
    searchable: true,
  },
  tooth: {
    label: 'Dente / Região',
    sortable: true,
    searchable: true,
  },
  value: {
    label: 'Valor',
    sortable: true,
    searchable: true,
  },
  dentist: {
    label: 'Dentista',
    sortable: true,
    searchable: true,
  },
} as const
</script>

<template>
  <VFlexTableWrapper :columns="columns" :data="data">
    <!--
      Here we retrieve the internal wrapperState.
      Note that we can not destructure it
    -->
    <template #default="wrapperState">
      <!-- We can place any content inside the default slot-->
      <VFlexTableToolbar>
        <template #left>
          <!-- We can bind wrapperState.searchInput to any input -->
          <VField>
            <VControl icon="feather:search">
              <input
                v-model="wrapperState.searchInput"
                type="text"
                class="input is-rounded"
                placeholder="Filter..."
              />
            </VControl>
          </VField>
        </template>

        <template #right>
          <!-- We can also bind wrapperState.limit -->
          <VField>
            <VControl>
              <div class="select is-rounded">
                <select v-model="wrapperState.limit">
                  <option :value="1">1 results per page</option>
                  <option :value="10">10 results per page</option>
                  <option :value="15">15 results per page</option>
                  <option :value="25">25 results per page</option>
                  <option :value="50">50 results per page</option>
                </select>
              </div>
            </VControl>
          </VField>
        </template>
      </VFlexTableToolbar>

      <!--
        The VFlexTable "data" and "columns" props
        will be inherited from parent VFlexTableWrapper
      -->
      <VFlexTable rounded>
        <!-- Custom "name" cell content -->
        <template #body-cell="{ row, column }">
          <template v-if="column.key === 'name'">
            <VAvatar
              size="medium"
              :picture="row.medias.avatar"
              :badge="row.medias.badge"
              :initials="row.initials"
            />
            <div>
              <span class="dark-text" :title="row.name">
                {{ row?.shortname }}
              </span>
              <VTextEllipsis width="280px" class="light-text" :title="row.bio">
                <small>{{ row?.bio }}</small>
              </VTextEllipsis>
            </div>
          </template>
        </template>
      </VFlexTable>

      <!-- Table Pagination with wrapperState.page binded-->
      <VFlexPagination
        v-model:current-page="wrapperState.page"
        class="mt-6"
        :item-per-page="wrapperState.limit"
        :total-items="wrapperState.total"
        :max-links-displayed="5"
        no-router
      />
    </template>
  </VFlexTableWrapper>
</template>
