<script setup>
import { watch } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount } from 'vue'
import { useStreamStore } from '@/stores/stream'
import { useCallStore } from '@/stores/call'

// options
const videoDevices = ref([])
const audioDevices = ref([])

// values
const {
  videoDevice,
  videoResolution,
  videoFramerate,
  audioDevice,
  audioChannels,
  audioAutoGainControl,
  audioNoiseSuppression,
  audioEchoCancellation,
} = storeToRefs(useSettingsStore())
const streamStore = useStreamStore()

const callStore = useCallStore()

watch(
  [
    videoDevice,
    videoResolution,
    videoFramerate,
    audioDevice,
    audioChannels,
    audioAutoGainControl,
    audioNoiseSuppression,
    audioEchoCancellation,
  ],
  () => {
    streamStore.refresh()
  },
)

onMounted(() => {
  // get video devices
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    for (const device of devices) {
      if (device.kind === 'videoinput') {
        videoDevices.value.push({
          label: device.label,
          deviceId: device.deviceId,
        })
      }
    }
  })

  // get audio devices
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    for (const device of devices) {
      if (device.kind === 'audioinput') {
        audioDevices.value.push({
          label: device.label,
          deviceId: device.deviceId,
        })
      }
    }
  })
})

onBeforeUnmount(() => {
  // stop the video stream
  if (callStore.status == 'idle') {
    streamStore.stop()
  }
})

// show preview video
function showPreview() {
  // get video stream
  streamStore.start()

  // hide the start button
  const button = document.getElementById('previewButton')
  button.style.display = 'none'
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="prose dark:prose-invert flex flex-col gap-2 prose-headings:mt-6 prose-headings:mb-0 first:prose-headings:mt-0 w-full max-w-prose"
    >
      <h3>Video</h3>
      <label for="videoDevice">Device</label>
      <Select
        id="videoDevice"
        v-model="videoDevice"
        :options="videoDevices"
        optionLabel="label"
        optionValue="deviceId"
        placeholder="Default"
        showClear
      >
      </Select>
      <label for="videoResolution">Resolution</label>
      <SelectButton
        id="videoResolution"
        v-model="videoResolution"
        :options="['480p', '1080p', 'Max']"
      ></SelectButton>
      <label for="videoFramerate">Framerate</label>
      <SelectButton
        id="frameRate"
        v-model="videoFramerate"
        :options="['30fps', '60fps']"
      ></SelectButton>
      <div class="w-full aspect-video bg-surface-800 mt-4 rounded-md relative">
        <video
          :srcObject.prop="streamStore.stream"
          class="w-full h-full object-cover p-0 m-0 rounded-md absolute"
          autoplay
          muted
          v-if="callStore.status == 'idle'"
        ></video>
        <Button
          id="previewButton"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          @click="showPreview"
          >Preview video</Button
        >
      </div>
      <h3>Audio</h3>
      <label for="audioDevice">Device</label>
      <Select
        id="audioDevice"
        v-model="audioDevice"
        :options="audioDevices"
        optionLabel="label"
        optionValue="deviceId"
        placeholder="Default"
        showClear
      ></Select>
      <label for="audioChannels">Channels</label>
      <SelectButton
        id="audioChannels"
        v-model="audioChannels"
        :options="['Mono', 'Stereo']"
      ></SelectButton>
      <p>Options</p>
      <div class="flex gap-4 items-center">
        <ToggleSwitch id="autoGainControl" v-model="audioAutoGainControl"></ToggleSwitch>
        <label for="autoGainControl">Automatic Gain Control</label>
      </div>
      <div class="flex gap-4 items-center">
        <ToggleSwitch id="noiseSuppression" v-model="audioNoiseSuppression"></ToggleSwitch>
        <label for="noiseSuppression">Noise suppression</label>
      </div>
      <div class="flex gap-4 items-center">
        <ToggleSwitch id="echoCancellation" v-model="audioEchoCancellation"></ToggleSwitch>
        <label for="echoCancellation">Echo cancellation</label>
      </div>
    </div>
  </div>
</template>
