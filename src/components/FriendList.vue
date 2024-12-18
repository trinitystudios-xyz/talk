<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import pb from '@/pocketbase'
import FriendUser from './FriendUser.vue'

const friends = ref([]) // this is the list of friend requests

onMounted(async () => {
  const friendsList = await pb.collection('friends').getFullList({
    filter:
      "(to = '" +
      userStore.userData.id +
      "' || from = '" +
      userStore.userData.id +
      "') && confirmed = true",
    requestKey: 'friends',
  })

  friendsList.forEach((f) => {
    if (f.to === userStore.userData.id) {
      friends.value.push(f.from)
    } else {
      friends.value.push(f.to)
    }
  })

  // listen for new friends
  pb.collection('friends').subscribe('*', (e) => {
    if (
      e.action === 'update' &&
      e.record.confirmed &&
      (e.record.to === userStore.userData.id || e.record.from === userStore.userData.id)
    ) {
      if (e.record.to === userStore.userData.id) {
        friends.value.push(e.record.from)
      } else {
        friends.value.push(e.record.to)
      }
    }

    if (
      e.action === 'delete' &&
      e.record.confirmed &&
      (e.record.to === userStore.userData.id || e.record.from === userStore.userData.id)
    ) {
      if (e.record.to === userStore.userData.id) {
        friends.value = friends.value.filter((f) => f.id !== e.record.from)
      } else {
        friends.value = friends.value.filter((f) => f.id !== e.record.to)
      }
    }
  })
})

onUnmounted(() => {
  pb.collection('friends').unsubscribe()
})
</script>

<template>
  <div class="h-full">
    <div class="p-4 pb-0">
      <h2 class="text-lg font-bold">Friends</h2>
    </div>
    <div class="flex flex-col">
      <FriendUser v-for="friend in friends" :key="friend.id" :user="friend" />
    </div>
  </div>
</template>
