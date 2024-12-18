<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps(['request'])

import pb from '@/pocketbase'
import UserDetails from './UserDetails.vue'

const name = ref('')
const tag = ref('')
const imageUrl = ref('')

onMounted(async () => {
  const user = await pb.collection('users').getOne(props.request.from)

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

async function accept() {
  pb.collection('friends').update(props.request.id, { confirmed: true })
}

async function deny() {
  pb.collection('friends').delete(props.request.id)
}
</script>

<template>
  <div class="flex items-center w-full justify-between p-4">
    <div class="flex items-center">
      <UserDetails :name="name" :tag="tag" :image="imageUrl"></UserDetails>
    </div>
    <div>
      <Button
        icon="pi pi-check"
        aria-label="Accept friend request"
        severity="secondary"
        rounded
        variant="text"
        @click="accept"
      />
      <Button
        icon="pi pi-ban"
        aria-label="Deny friend request"
        severity="secondary"
        rounded
        variant="text"
        @click="deny"
      />
    </div>
  </div>
</template>
