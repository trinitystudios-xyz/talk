<script setup>
const props = defineProps(['image', 'name', 'tag', 'online'])
</script>

<template>
  <div class="flex items-center">
    <OverlayBadge v-if="online" severity="success" class="inline-flex">
      <Avatar
        v-if="props.image.length"
        v-bind:image="props.image"
        shape="circle"
        size="large"
      ></Avatar>
      <Avatar v-else icon="pi pi-user" shape="circle" size="large"></Avatar>
    </OverlayBadge>
    <div v-else>
      <Avatar v-if="props.image" v-bind:image="props.image" shape="circle" size="large"></Avatar>
      <Avatar v-else icon="pi pi-user" shape="circle" size="large"></Avatar>
    </div>
    <div class="ml-4">
      <h1 class="text-xl font-bold">{{ props.name }}</h1>
      <p class="text-sm text-gray-500">{{ '#' + props.tag }}</p>
    </div>
  </div>
</template>
