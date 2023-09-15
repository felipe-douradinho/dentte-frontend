<script setup lang="ts">
import type {
  VFlexTableWrapperSortFunction,
  VFlexTableWrapperFilterFunction,
} from '/@src/components/base/table/VFlexTableWrapper.vue'
import { budgets } from '/@src/data/patients/budgets/patient-budgets-list'

type Budget = typeof budgets[0]

// duplicate user data to grow the array
const data: Budget[] = []
for (let i = 0; i < 1000; i++) {
  data.push(...budgets)
}

// this is a sample for custom sort function
const idSorter: VFlexTableWrapperSortFunction<Budget> = ({ order, a, b }) => {
  if (order === 'asc') {
    return a.id.localeCompare(b.id)
  } else if (order === 'desc') {
    return b.id.localeCompare(a.id)
  }

  return 0
}

// this is a sample for custom filter function
const descriptionFilter: VFlexTableWrapperFilterFunction<Budget> = ({ searchTerm, row }) => {
  if (!searchTerm) {
    return true
  }

  // search either in the name or the bio
  return (
    row.description.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    row.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
}

const columns = {
  date: {
    label: 'Data',
    searchable: true,
    sortable: true,
  },
  description: {
    label: 'Descrição',
    searchable: true,
    sortable: true,
    filter: descriptionFilter,
  },
  treatment: {
    label: 'Tratamento',
    searchable: true,
    sortable: true,
  },
  value: {
    label: 'Valor',
    searchable: true,
    sortable: true,
  },
  status: {
    label: 'Status',
    searchable: true,
    sortable: true,
  },
  action: {
    label: 'Ação',
    searchable: true,
    sortable: true,
  },
  contract: {
    label: 'Contrato',
    searchable: true,
    sortable: true,
  },
  more: {
    label: '...',
    searchable: true,
    sortable: true,
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
