<script setup>
import { useUserStore } from '@/stores/user'

import SideBar from '@/components/SideBar.vue'
import Chat from '@/components/ChatComponent.vue'

const userStore = useUserStore()

userStore.refresh()
</script>

<template>
  <main>
    <DynamicDialog />
    <Toast position="bottom-right" />
    <div class="flex justify-left w-screen">
      <SideBar></SideBar>
      <Divider layout="vertical" class="!m-0"></Divider>
      <Chat></Chat>
    </div>
  </main>
</template>
