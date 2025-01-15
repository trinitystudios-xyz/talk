<script setup>
import { ref, onMounted, defineProps } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const props = defineProps(['user'])

import pb from '@/pocketbase'
import UserDetails from './UserDetails.vue'

const name = ref('')
const tag = ref('')
const imageUrl = ref('')
const lastSeen = ref('')
const currentTime = ref('')

onMounted(async () => {
  const user = await pb.collection('users').getOne(props.user)

  name.value = user.name
  tag.value = user.tag
  lastSeen.value = user.lastSeen

  pb.collection('users').subscribe(user.id, (e) => {
    if (e.action === 'update') {
      lastSeen.value = e.record.lastSeen
    }
  })

  if (user.avatar) {
    imageUrl.value =
      import.meta.env.VITE_POCKETBASE_URL +
      '/api/files/' +
      user.collectionId +
      '/' +
      user.id +
      '/' +
      user.avatar
  }

  currentTime.value = Date.now()
  setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
})

function goToChat() {
  if (route.params.id === props.user) return
  router.push({ name: 'chat', params: { id: props.user } })
}
</script>

<template>
  <div class="flex items-center w-full justify-between p-2">
    <Button fluid class="text-left" variant="text" severity="contrast" @click="goToChat">
      <div class="flex items-center w-full">
        <UserDetails
          :name="name"
          :tag="tag"
          :image="imageUrl"
          :online="currentTime - Date.parse(lastSeen) < 60000"
        ></UserDetails>
      </div>
    </Button>
  </div>
</template>
