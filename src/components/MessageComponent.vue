<script setup>
import { marked } from 'marked'
import { onMounted, defineProps, useTemplateRef } from 'vue'

const props = defineProps(['msg', 'own'])
const msgContainer = useTemplateRef('msgContainer')

const timeStyle = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
  dateStyle: 'medium',
})

onMounted(() => {
  msgContainer.value.innerHTML = marked.parse(props.msg.message, {
    breaks: true,
  })
})
</script>

<template>
  <div class="p-4 flex" :class="{ 'justify-end': props.own }">
    <div class="bg-surface-100 dark:bg-surface-800 px-6 py-4 rounded-lg">
      <h1 class="text-primary inline-block text-lg">{{ props.msg.expand.from.name }}</h1>
      <p class="text-gray-500 inline-block ml-2 text-sm">
        {{ timeStyle.format(Date.parse(props.msg.created)) }}
      </p>
      <div class="prose dark:prose-invert" ref="msgContainer"></div>
    </div>
  </div>
</template>
