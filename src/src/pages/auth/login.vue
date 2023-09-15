<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

import { z as zod } from 'zod'
import { useDarkmode } from '/@src/stores/darkmode'
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { catchFieldError } from '/@src/utils/api/catchFormErrors'
import { formatError } from '/@src/composable/useError'
import { useApi } from '/@src/composable/useApi'

const api = useApi()
const darkmode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notyf = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const { t } = useI18n()

// Define a validation schema
const validationSchema = toFormValidator(
  zod.object({
    email: zod
      .string({
        required_error: t('auth.errors.email.required'),
      })
      .email(t('auth.errors.email.format')),
    password: zod.string({
      required_error: t('auth.errors.password.required'),
    }),
    remember: zod.boolean().optional(),
  })
)

const { handleSubmit, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    email: 'feliped1987@gmail.com',
    password: 'mudar123',
    remember: false,
  },
})

const onLogin = handleSubmit(async (values) => {
  if (!userSession.isLoading) {
    userSession.setIsLoading(true)

    try {
      await api.get('/sanctum/csrf-cookie')
      userSession.setToken(userSession.getCookie('XSRF-TOKEN')?.replace('%3D', ''))

      await api.post('login', values)

      const { data } = await api.get('/api/users/me')

      userSession.setUser(Object.fromEntries(Object.entries(data.data)))

      if (redirect) {
        await router.push(redirect)
      } else {
        await router.push('/')
      }

      notyf.dismissAll()
      notyf.success(`${t('auth.logged-in')}, ${userSession.user!.email}`)
    } catch (err: any) {
      catchFieldError(err, setFieldError)
      notyf.error(formatError(err))
    } finally {
      userSession.setIsLoading(false)
    }
  }
})

useHead({
  title: 'Auth Login - Vuero',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-8 h-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border is-responsive"
                src="/@src/assets/illustrations/login/login.jpg"
                alt=""
              />
              <img
                class="dark-image has-light-shadow is-responsive"
                src="/@src/assets/illustrations/login/login.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label
            class="dark-mode ml-auto"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink to="/">
              <AnimatedLogo width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>Bem-vindo(a)!</h2>
                  <p>Por favor, entre em sua conta</p>
                  <RouterLink to="/auth/signup-2">
                    Eu ainda não tenho uma conta
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit.prevent="onLogin">
                    <div class="login-form">
                      <!-- E-mail -->
                      <VField>
                        <VControl icon="feather:user">
                          <VInput
                            type="email"
                            placeholder="E-mail"
                            autocomplete="email"
                          />
                        </VControl>
                      </VField>

                      <!-- Password -->
                      <VField>
                        <VControl icon="feather:lock">
                          <VInput
                            type="password"
                            placeholder="Senha"
                            autocomplete="current-password"
                          />
                        </VControl>
                      </VField>

                      <!-- Switch -->
                      <VField>
                        <VControl class="setting-item">
                          <VCheckbox label="Lembrar-me" paddingless />
                        </VControl>
                      </VField>

                      <!-- Submit -->
                      <div class="login">
                        <VButton
                          :loading="userSession.isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        >
                          Entrar
                        </VButton>
                      </div>

                      <div class="forgot-link has-text-centered">
                        <a>Esqueceu sua senha?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
