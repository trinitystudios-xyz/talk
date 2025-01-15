import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useSettingsStore } from './settings'

export const useStreamStore = defineStore('stream', () => {
  // State variable
  const stream = ref()
  const settingsStore = useSettingsStore()

  // Actions
  async function start() {
    if (stream.value) {
      return
    }
    // calculate video constraints
    let reqWidth = 3840
    let reqHeight = 2160
    if (settingsStore.videoResolution == '480p') {
      reqWidth = 854
      reqHeight = 480
    } else if (settingsStore.videoResolution == '1080p') {
      reqWidth = 1920
      reqHeight = 1080
    }

    console.log(
      'Starting with res ' +
        reqWidth +
        'x' +
        reqHeight +
        ' due to setting ' +
        settingsStore.videoResolution,
    )

    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: settingsStore.videoDevice,
        width: reqWidth,
        height: reqHeight,
        frameRate: { ideal: settingsStore.videoFramerate.split('fps')[0] },
        aspectRatio: 16 / 9,
      },
      audio: {
        deviceId: settingsStore.audioDevice,
        channelCount: settingsStore.audioChannels === 'Mono' ? 1 : 2,
        autoGainControl: settingsStore.audioAutoGainControl,
        noiseSuppression: settingsStore.audioNoiseSuppression,
        echoCancellation: settingsStore.audioEchoCancellation,
      },
    })
  }

  function stop() {
    if (stream.value) {
      try {
        stream.value.getTracks().forEach((track) => track.stop())
      } catch {
        stream.value = undefined
      }
    }
    stream.value = undefined
  }

  async function refresh() {
    if (stream.value) {
      stop()
      await start()
    }
  }

  // return
  return {
    stream,
    start,
    stop,
    refresh,
  }
})
