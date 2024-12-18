<script setup>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { ref, onMounted, defineProps, useTemplateRef } from 'vue'

const props = defineProps(['msg', 'own'])
const msgContainer = useTemplateRef('msgContainer')

const timeStyle = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
  dateStyle: 'medium',
})

const imageUrl = ref('')

onMounted(() => {
  msgContainer.value.innerHTML = DOMPurify.sanitize(
    marked.parse(props.msg.message, {
      breaks: true,
    }),
  )

  imageUrl.value =
    import.meta.env.VITE_POCKETBASE_URL +
    '/api/files/' +
    props.msg.expand.from.collectionId +
    '/' +
    props.msg.expand.from.id +
    '/' +
    props.msg.expand.from.avatar
})
</script>

<template>
  <div class="p-4 flex gap-4" :class="{ 'flex-row-reverse': props.own }">
    <Avatar shape="circle" :image="imageUrl"></Avatar>
    <div class="bg-surface-100 dark:bg-surface-800 px-6 py-4 rounded-lg">
      <h1 class="text-primary inline-block text-lg">{{ props.msg.expand.from.name }}</h1>
      <p class="text-gray-500 inline-block ml-2 text-sm">
        {{ timeStyle.format(Date.parse(props.msg.created)) }}
      </p>
      <div class="prose dark:prose-invert" ref="msgContainer"></div>
    </div>
  </div>
</template>
