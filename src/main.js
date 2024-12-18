import 'primeicons/primeicons.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
const T3Theme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
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

app.provide('pb', client)

app.mount('#app')
