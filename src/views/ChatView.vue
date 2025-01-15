<script setup>
import { onMounted, onUnmounted } from 'vue'

import { useUserStore } from '@/stores/user'
import pb from '@/pocketbase'

import SideBar from '@/components/SideBar.vue'
import Chat from '@/components/ChatComponent.vue'

const userStore = useUserStore()
userStore.refresh()

onMounted(async () => {
  // set alive status
  let ls = new Date(Date.now()).toISOString()
  console.log('Pinging server at ', ls)
  await pb.collection('users').update(userStore.userData.id, { lastSeen: ls })

  setInterval(async () => {
    // set alive status
    let ls = new Date(Date.now()).toISOString()
    console.log('Pinging server at ', ls)
    await pb.collection('users').update(userStore.userData.id, { lastSeen: ls })
  }, 30000)

  // get user media permissions
  navigator.permissions.query({ name: 'camera' }).then((result) => {
    if (result.state === 'prompt') {
      navigator.getUserMedia(
        { video: true, audio: true },
        (stream) => {
          for (const track of stream.getTracks()) {
            track.stop()
          }
        },
        () => {},
      )
    }
  })
})

onUnmounted(() => {})
</script>

<template>
  <main class="dark:bg-surface-900">
    <DynamicDialog />
    <Toast position="bottom-right" />
    <div class="flex justify-left w-screen">
      <SideBar></SideBar>
      <Divider layout="vertical" class="!m-0"></Divider>
      <Chat></Chat>
    </div>
  </main>
</template>
