<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

// options
const videoDevices = ref([])
const audioDevices = ref([])

// values
const videoDevice = ref()
const videoResolution = ref()
const videoFramerate = ref()

const audioDevice = ref()
const audioChannels = ref()
const autoGainControl = ref()
const noiseSuppression = ref()
const echoCancellation = ref()

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
        placeholder="Default"
        showClear
      >
      </Select>
      <label for="videoResolution">Resolution</label>
      <SelectButton
        id="videoResolution"
        v-model="videoResolution"
        :options="['480p', 'Max']"
      ></SelectButton>
      <label for="videoFramerate">Framerate</label>
      <SelectButton
        id="frameRate"
        v-model="videoFramerate"
        :options="['30fps', 'Max']"
      ></SelectButton>
      <h3>Audio</h3>
      <label for="audioDevice">Device</label>
      <Select
        id="audioDevice"
        v-model="audioDevice"
        :options="audioDevices"
        optionLabel="label"
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
        <ToggleSwitch id="autoGainControl" v-model="autoGainControl"></ToggleSwitch>
        <label for="autoGainControl">Automatic Gain Control</label>
      </div>
      <div class="flex gap-4 items-center">
        <ToggleSwitch id="noiseSuppression" v-model="noiseSuppression"></ToggleSwitch>
        <label for="noiseSuppression">Noise suppression</label>
      </div>
      <div class="flex gap-4 items-center">
        <ToggleSwitch id="echoCancellation" v-model="echoCancellation"></ToggleSwitch>
        <label for="echoCancellation">Echo cancellation</label>
      </div>
    </div>
  </div>
</template>
