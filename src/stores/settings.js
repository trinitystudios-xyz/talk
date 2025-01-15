import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  // State variable
  // Using the useLocalStorage composable provided by VueUse in order to persist state during page reloads
  const videoDevice = ref(useLocalStorage('videoDevice', undefined))
  const videoResolution = ref(useLocalStorage('videoResolution', '480p'))
  const videoFramerate = ref(useLocalStorage('videoFrameRate', '30fps'))

  const audioDevice = ref(useLocalStorage('audioDevice', undefined))
  const audioChannels = ref(useLocalStorage('audioChannels', 'Mono'))
  const audioAutoGainControl = ref(useLocalStorage('audioAutoGainControl', true))
  const audioNoiseSuppression = ref(useLocalStorage('audioNoiseSuppression', true))
  const audioEchoCancellation = ref(useLocalStorage('audioEchoCancellation', true))

  // return
  return {
    videoDevice,
    videoResolution,
    videoFramerate,
    audioDevice,
    audioChannels,
    audioAutoGainControl,
    audioNoiseSuppression,
    audioEchoCancellation,
  }
})
