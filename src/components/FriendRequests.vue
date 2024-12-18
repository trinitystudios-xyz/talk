<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import pb from '@/pocketbase'
import IncomingUser from './IncomingUser.vue'

const requests = ref([]) // this is the list of friend requests

onMounted(async () => {
  const friendRequests = await pb.collection('friends').getFullList({
    filter: "to = '" + userStore.userData.id + "'&& confirmed = false",
    requestKey: 'friendRequests',
  })
  requests.value.push(...friendRequests)

  // listen for new friend requests
  pb.collection('friends').subscribe('*', (e) => {
    if (e.action === 'create' && e.record.to === userStore.userData.id && !e.record.confirmed) {
      requests.value.push(e.record)
    }

    if (e.action === 'update' && e.record.to === userStore.userData.id && e.record.confirmed) {
      requests.value = requests.value.filter((r) => r.id !== e.record.id)
    }

    if (e.action === 'delete' && e.record.to === userStore.userData.id && !e.record.confirmed) {
      requests.value = requests.value.filter((r) => r.id !== e.record.id)
    }
  })
})

onUnmounted(() => {
  pb.collection('friends').unsubscribe()
})
</script>

<template>
  <div v-if="requests.length > 0">
    <Divider class="!m-0"></Divider>
    <div class="p-4 pb-0">
      <h2 class="text-lg font-bold">Friend Requests</h2>
    </div>
    <div class="flex flex-col">
      <IncomingUser v-for="request in requests" :key="request.id" :request="request" />
    </div>
  </div>
</template>
