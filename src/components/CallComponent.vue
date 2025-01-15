<script setup>
import { useStreamStore } from '@/stores/stream'
import { useCallStore } from '@/stores/call'
import { onMounted, ref } from 'vue'

import pb from '@/pocketbase'

const streamStore = useStreamStore()
const callStore = useCallStore()

const image = ref('')

onMounted(async () => {
  const user = await pb.collection('users').getOne(callStore.callerID)

  if (user.avatar) {
    image.value =
      import.meta.env.VITE_POCKETBASE_URL +
      '/api/files/' +
      user.collectionId +
      '/' +
      user.id +
      '/' +
      user.avatar
  }
})
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex h-full w-full gap-10 items-center justify-center">
      <video
        class="w-5/12 aspect-video max-h-full rounded-lg"
        :srcObject.prop="streamStore.stream"
        autoplay
        muted
        v-if="callStore.status == 'connected' || callStore.status == 'calling'"
      ></video>
      <video
        class="w-5/12 aspect-video max-h-full rounded-lg"
        :srcObject.prop="callStore.foreignStream"
        autoplay
        v-if="callStore.status == 'connected'"
      ></video>
      <div
        class="w-5/12 aspect-video max-h-full rounded-lg relative bg-surface-800"
        v-if="callStore.status == 'incoming' || callStore.status == 'calling'"
      >
        <Skeleton height="100%" width="100%"></Skeleton>
        <Avatar
          icon="pi pi-user"
          shape="circle"
          size="xlarge"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          v-if="!image"
        ></Avatar>
        <Avatar
          shape="circle"
          size="xlarge"
          :image="image"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          v-else
        ></Avatar>
      </div>
    </div>
    <div class="flex justify-center items-center gap-4">
      <!-- <div>
        <Button icon="pi pi-microphone" severity="secondary" @click="callStore.disconnect"></Button>
      </div> -->
      <Button
        class="mb-4"
        icon="pi pi-phone"
        @click="callStore.answerCall"
        severity="success"
        v-if="callStore.status == 'incoming'"
      ></Button>
      <Button
        class="mb-4"
        icon="pi pi-times"
        @click="callStore.disconnect"
        severity="danger"
        v-if="callStore.status == 'incoming' || callStore.status == 'connected'"
      ></Button>
    </div>
  </div>
</template>
