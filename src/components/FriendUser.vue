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

onMounted(async () => {
  const user = await pb.collection('users').getOne(props.user)

  name.value = user.name
  tag.value = user.tag

  imageUrl.value =
    import.meta.env.VITE_POCKETBASE_URL +
    '/api/files/' +
    user.collectionId +
    '/' +
    user.id +
    '/' +
    user.avatar
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
        <UserDetails :name="name" :tag="tag" :image="imageUrl"></UserDetails>
      </div>
    </Button>
  </div>
</template>
