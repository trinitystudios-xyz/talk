<script setup>
import CurrentUser from '@/components/CurrentUser.vue'
import FriendRequests from './FriendRequests.vue'
import FriendList from './FriendList.vue'
</script>

<template>
  <div class="w-96 min-w-96 relative flex flex-col h-screen">
    <FriendList></FriendList>
    <FriendRequests></FriendRequests>
    <CurrentUser></CurrentUser>
  </div>
</template>
