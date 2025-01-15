<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import { useDialog } from 'primevue'
const dialog = useDialog()
import AddFriendDialog from './dialogs/AddFriendDialog.vue'
import SettingsDialog from './dialogs/SettingsDialog.vue'

import UserDetails from './UserDetails.vue'

let imageUrl

if (userStore.userData.avatar) {
  imageUrl =
    import.meta.env.VITE_POCKETBASE_URL +
    '/api/files/' +
    userStore.userData.collectionId +
    '/' +
    userStore.userData.id +
    '/' +
    userStore.userData.avatar
}

function addFriend() {
  dialog.open(AddFriendDialog, {
    props: {
      header: 'Add friend',
      modal: true,
      draggable: false,
    },
  })
}

function openSettings() {
  dialog.open(SettingsDialog, {
    props: {
      header: 'Settings',
      modal: true,
      draggable: false,
      maximizable: true,
      style: { width: '50%' },
    },
  })
}
</script>

<template>
  <Divider class="!m-0"></Divider>
  <div class="flex items-center w-full justify-between p-4">
    <UserDetails
      :name="userStore.userData.name"
      :tag="userStore.userData.tag"
      :image="imageUrl"
    ></UserDetails>
    <div>
      <Button
        icon="pi pi-user-plus"
        aria-label="Add friend"
        severity="secondary"
        rounded
        variant="text"
        @click="addFriend"
      />
      <Button
        icon="pi pi-cog"
        aria-label="Settings"
        severity="secondary"
        rounded
        variant="text"
        @click="openSettings"
      />
      <Button
        icon="pi pi-sign-out"
        aria-label="Sign out"
        severity="secondary"
        rounded
        variant="text"
        as="router-link"
        to="/logout"
      />
    </div>
  </div>
</template>
