import 'primeicons/primeicons.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

import client from '@/pocketbase'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true,
})
app.use(DialogService)
app.use(ToastService)

app.provide('pb', client)

app.mount('#app')
