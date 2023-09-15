<script setup lang="ts">
import { onceImageErrored } from '/@src/utils/via-placeholder'
</script>

<template>
  <div class="dashboard-header-wrapper">
    <div class="dashboard-header">
      <div class="avatar-container">
        <img
          src="/images/avatars/svg/vuero-2.svg"
          alt=""
          @error.once="onceImageErrored(150)"
        />
        <button class="button is-circle">
          <span class="icon is-small">
            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
          </span>
        </button>
      </div>
      <div class="header-meta">
        <div class="username-wrap">
          <div class="username">
            <h3>
              <span>FELIPE DOURADINHO</span>
            </h3>
            <VFlex flex-wrap="wrap" align-items="center" row-gap=".5rem" column-gap="1rem">
              <VFlex flex-wrap="wrap" align-items="center" row-gap=".5rem" column-gap=".50rem">
                <VIcon icon="feather:phone" />
                (11) 98305-2675
              </VFlex>
              <VFlex flex-wrap="wrap" align-items="center" row-gap=".5rem" column-gap=".50rem">
                <VIcon icon="material-symbols:numbers" />
                354.570.538-22
              </VFlex>
            </VFlex>
          </div>
        </div>
        <div class="meta-stats">
          <div class="meta-stat">
            <span>10</span>
            <span>orçamentos</span>
          </div>
          <div class="meta-stat">
            <span>2</span>
            <span>consultas</span>
          </div>
          <div class="meta-stat">
            <span>3</span>
            <span>agendamentos</span>
          </div>
        </div>
      </div>

      <div class="end">
        <!--Dropdown-->
        <InfluencerDropdown />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tabs ul {
  gap: 40px;
}
.dashboard-header-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 85px;
  z-index: 1;
  padding: 0 40px;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 35px;

  .dashboard-header {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1em;

    .avatar-container {
      position: relative;
      height: 100px;
      width: 100px;
      min-width: 100px;

      img {
        display: block;
        height: 100px;
        width: 100px;
        min-width: 100px;
        border-radius: var(--radius-rounded);
      }

      .button {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }

    .header-meta {
      font-family: var(--font);
      margin-left: 16px;

      .username-wrap {
        display: flex;

        .username {
          h3 {
            font-family: var(--font-alt);
            color: var(--dark-text);
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 3px;

            i {
              font-size: 1.2rem;
              margin-left: 5px;
              color: var(--yellow);
            }
          }

          > span {
            color: var(--light-text-dark-5);
          }
        }

        .badges {
          margin-left: 16px;

          .tag {
            margin-right: 0.5rem;
          }
        }
      }

      .meta-stats {
        display: flex;
        padding: 16px 0;

        .meta-stat {
          margin-right: 30px;

          span {
            &:first-child {
              color: var(--dark-text);
              font-size: 1.3rem;
              font-weight: 600;
              margin-right: 0.25rem;
            }

            &:nth-child(2) {
              color: var(--light-text);
            }
          }
        }
      }

      .meta-description {
        max-width: 640px;

        p {
          color: var(--light-text-dark-5);
        }
      }

      .meta-achievements {
        display: flex;
        padding-top: 16px;

        .meta-achievement {
          height: 36px;
          width: 36px;
          min-width: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--white);
          background: var(--fade-grey);
          border-radius: var(--radius-rounded);
          margin-right: 10px;
          box-shadow: var(--light-box-shadow);

          &.is-primary {
            color: var(--primary);
            background: var(--primary-light-45);
          }

          &.is-yellow {
            color: var(--yellow);
            background: var(--yellow-light-22);
          }

          &.is-danger {
            color: var(--danger);
            background: var(--danger-light-40);
          }
        }
      }
    }

    .end {
      margin-left: auto;
    }
  }
}

.is-dark {
  .dashboard-header-wrapper {
    .dashboard-header {
      .header-meta {
        .username-wrap {
          .username {
            h3 {
              color: var(--dark-dark-text);
            }
          }
        }

        .meta-stats {
          .meta-stat {
            span {
              &:first-child {
                color: var(--dark-dark-text);
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .dashboard-header-wrapper {
    height: 418px;

    .dashboard-header {
      flex-direction: column;

      .avatar-container {
        margin: 0 auto 10px;
      }

      .header-meta {
        margin-left: 0;
        text-align: center;

        .username-wrap {
          flex-direction: column;

          .badges {
            margin: 10px auto;
          }
        }

        .meta-stats {
          justify-content: center;

          .meta-stat {
            margin: 0 10px;
          }
        }

        .meta-achievements {
          justify-content: center;
          padding-bottom: 16px;
        }
      }

      .end {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
