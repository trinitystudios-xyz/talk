import 'primeicons/primeicons.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createPlausible } from 'v-plausible/vue'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
const T3Theme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{rose.50}',
      100: '{rose.100}',
      200: '{rose.200}',
      300: '{rose.300}',
      400: '{rose.400}',
      500: '{rose.500}',
      600: '{rose.600}',
      700: '{rose.700}',
      800: '{rose.800}',
      900: '{rose.900}',
      950: '{rose.950}',
    },
  },
})

import App from './App.vue'
import router from './router'

import client from '@/pocketbase'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: T3Theme,
  },
  ripple: true,
})
app.use(DialogService)
app.use(ToastService)

const plausible = createPlausible({
  init: {
    domain: 'talk.trinitystudios.xyz',
    apiHost: 'https://plausible.trinitystudios.xyz',
    trackLocalhost: false,
  },
  settings: {
    enableAutoOutboundTracking: false,
    enableAutoPageviews: true,
  },
  partytown: false,
})

app.use(plausible)

app.provide('pb', client)

app.mount('#app')
