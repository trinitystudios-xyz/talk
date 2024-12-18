<script setup>
const props = defineProps(['image', 'name', 'tag'])
</script>

<template>
  <div class="flex items-center">
    <Avatar v-bind:image="props.image" shape="circle" size="large"></Avatar>
    <div class="ml-4">
      <h1 class="text-xl font-bold">{{ props.name }}</h1>
      <p class="text-sm text-gray-500">{{ '#' + props.tag }}</p>
    </div>
  </div>
</template>
