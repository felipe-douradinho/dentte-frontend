<script setup lang="ts">
import { type PropType } from 'vue'
import { PatientPageEnum } from '/@src/components/pages/patients/interfaces/PatientPageEnum'

const props = defineProps({
  patientId: {
    type: Number,
    default: undefined,
  },
  page: {
    type: String as PropType<PatientPageEnum>,
    default: undefined,
  },
})

type TabId = 'overview' | 'content' | 'brands'
const activeTab = ref<TabId>('overview')
</script>

<template>
  <div class="lifestyle-dashboard lifestyle-dashboard-v1">
    <PatientHeader />

    <div class="tabs-wrapper">
      <div class="tabs-inner">
        <div class="tabs">
          <ul>
            <li :class="[props.page === PatientPageEnum.PageAbout && 'is-active']">
              <router-link :to="`/app/patients/${patientId}`">
                SOBRE
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageBudgets && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/budgets`">
                ORÇAMENTOS
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageTreatments && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/treatments`">
                TRATAMENTOS
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageAnamnesis && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/anamnesis`">
                ANAMNESES
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageImages && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/images`">
                IMAGENS
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageDocuments && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/documents`">
                DOCUMENTOS
              </router-link>
            </li>
            <li :class="[props.page === PatientPageEnum.PageDebits && 'is-active']">
              <router-link :to="`/app/patients/${patientId}/debits`">
                DÉBITOS
              </router-link>
            </li>
          </ul>
        </div>
      </div>


    </div>
  </div>

  <slot />

</template>

<style lang="scss">
.lifestyle-dashboard-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 235px;
  background: var(--white);
  z-index: 1;

  &.has-top-nav {
    height: 368px;
  }
}

.tabs-wrapper-custom {
  padding: 0 40px;
}

.lifestyle-dashboard-v1 {
  .tabs-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;

    .tabs-inner {
      .tabs {
        margin-bottom: 30px;
        z-index: 10;

        ul {
          border: none;

          li {
            z-index: 10;

            a {
              border-bottom-width: 4px;
            }
          }
        }
      }
    }
  }

  .body-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font);
    margin-bottom: 20px;

    h3 {
      font-family: var(--font-alt);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--dark-text);
    }

    .field {
      z-index: 5;
      min-width: 135px;

      .multiselect {
        .multiselect-input {
          .multiselect-single-label {
            color: var(--light-text);
          }
        }

        .multiselect-options {
          left: unset !important;
          min-width: 180px;
        }
      }
    }
  }

  .stat-widget {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .post-stats {
    padding: 16px;
    text-align: center;
    width: 100%;
    font-family: var(--font);
    font-size: 0.9rem;

    span {
      color: var(--light-text);
    }

    .post-stat {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.2;

      i {
        font-size: 1.2rem;
        margin-right: 6px;
      }

      .count {
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--dark-text);
      }
    }
  }

  .post-group-wrap {
    padding: 4px 10px;

    .post-group {
      display: flex;
      margin-left: -6px;
      margin-right: -6px;

      a {
        display: block;
        width: calc(25% - 12px);
        margin: 6px;

        img {
          display: block;
          width: 100%;
          min-height: 65px;
          max-height: 85px;
          object-fit: cover;
          border-radius: var(--radius-large);
          margin: 0;
        }
      }
    }
  }
}

.is-dark {
  .lifestyle-dashboard-bg {
    background: var(--dark-sidebar-light-6);
  }

  .lifestyle-dashboard-v1 {
    .body-title {
      h3 {
        color: var(--dark-dark-text);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .lifestyle-dashboard-bg {
    &:not(.has-top-nav) {
      height: 614px;
    }

    &.has-top-nav {
      height: 625px;
    }
  }

  .lifestyle-dashboard-v1 {
    .tabs-wrapper {
      .tabs-inner {
        .tabs {
          ul {
            text-align: center;
            justify-content: center;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .lifestyle-dashboard-bg {
    &.has-top-nav {
      height: 428px;
    }

    &:not(.has-top-nav) {
      height: 415px;
    }
  }

  .lifestyle-dashboard-v1 {
    .is-flex-tablet-p {
      flex-wrap: wrap;

      .is-half-tablet-p {
        min-width: 50%;
      }

      .is-full-tablet-p {
        min-width: 100%;
      }

      .column.is-3 {
        min-width: 50%;
      }
    }
  }
}
</style>
