<script setup>
import { ref, watch, onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import { useCallStore } from '@/stores/call'
const callStore = useCallStore()

import pb from '@/pocketbase'

const state = ref('null')

onMounted(() => {
  loadChat(route.params.id)
})

watch(
  () => route.params.id,
  (user) => {
    loadChat(user)
  },
)

import { useToast } from 'primevue/usetoast'
import MessageComponent from './MessageComponent.vue'
const toast = useToast()

const message = ref('')

async function sendMessage() {
  if (message.value.length > 0) {
    //  check the message  length
    if (message.value.length > 300) {
      toast.add({
        severity: 'error',
        summary: 'Message too long!',
        detail:
          'Your message is too long (' +
          message.value.length +
          '). Please keep it under 3000 characters.',
        life: 3000,
      })
      return
    }

    // send the message
    await pb.collection('messages').create({
      from: userStore.userData.id,
      to: route.params.id,
      message: message.value,
    })

    // clear the  input
    message.value = ''
  }
}

const messageList = ref([])

async function loadChat(user) {
  if (user) {
    // check if user is in friendlist
    const friends = await pb.collection('friends').getList(1, 1, {
      filter:
        '(from.id = "' +
        userStore.userData.id +
        '" && to.id = "' +
        user +
        '") || (from.id = "' +
        user +
        '" && to.id = "' +
        userStore.userData.id +
        '") && confirmed = true',
    })

    if (friends.items.length === 0) {
      state.value = 'invalid'
      return
    }

    // unsubscribe from previous chat
    pb.collection('messages').unsubscribe()

    const messages = await pb.collection('messages').getList(1, 20, {
      filter:
        '(from = "' +
        userStore.userData.id +
        '" && to = "' +
        user +
        '") || (from = "' +
        user +
        '" && to = "' +
        userStore.userData.id +
        '")',
      sort: '-created',
      expand: 'from',
      skipTotal: true,
    })
    messageList.value = messages.items

    // listen for new messages
    pb.collection('messages').subscribe(
      '*',
      (e) => {
        if (
          ((e.record.from === userStore.userData.id && e.record.to === user) ||
            (e.record.from === user && e.record.to === userStore.userData.id)) &&
          e.action === 'create'
        ) {
          messageList.value.unshift(e.record)
        }
      },
      {
        expand: 'from',
      },
    )

    state.value = 'valid'
  }
}

function callUser() {
  callStore.call(route.params.id)
}

async function loadMore() {
  const oldestMessageDate = messageList.value[messageList.value.length - 1].created
  console.log(oldestMessageDate)
  const messages = await pb.collection('messages').getList(1, 20, {
    filter:
      '((from = "' +
      userStore.userData.id +
      '" && to = "' +
      route.params.id +
      '") || (from = "' +
      route.params.id +
      '" && to = "' +
      userStore.userData.id +
      '")) && created < "' +
      oldestMessageDate +
      '"',
    sort: '-created',
    expand: 'from',
    skipTotal: true,
  })
  messageList.value.push(...messages.items)
}
</script>

<template>
  <div v-if="state === 'null'" class="flex flex-col items-center justify-center flex-grow h-full">
    <span class="pi pi-compass !text-7xl"></span>
    <p class="mt-6 text-2xl font-semibold">Select a chat to start messaging.</p>
  </div>
  <div
    v-if="state === 'invalid'"
    class="flex flex-col items-center justify-center flex-grow h-full"
  >
    <span class="pi pi-exclamation-triangle !text-7xl"></span>
    <p class="mt-6 text-2xl font-semibold">This user is not in your friendlist :(</p>
  </div>
  <div v-if="state === 'valid'" class="flex flex-col h-full flex-grow">
    <div class="h-full flex flex-col-reverse overflow-y-auto" id="messageWindow">
      <MessageComponent
        v-for="msg in messageList"
        v-bind:key="msg.id"
        :msg
        :own="msg.from === userStore.userData.id"
      ></MessageComponent>
      <Divider v-if="messageList.length >= 20">
        <Button label="Load more messages" severity="secondary" @click="loadMore"></Button>
      </Divider>
    </div>
    <div class="flex p-4 gap-4 items-center">
      <Textarea
        name="message"
        placeholder="Write a message..."
        fluid
        variant="filled"
        v-model="message"
        rows="1"
        autoResize
      ></Textarea>
      <Button
        icon="pi pi-send"
        severity="secondary"
        aria-label="Send message"
        v-bind:disabled="message.length === 0"
        @click="sendMessage"
      ></Button>
      <Button
        icon="pi pi-phone"
        severity="primary"
        aria-label="Call user"
        v-bind:disabled="callStore.status != 'idle' || route.params.id == userStore.userData.id"
        @click="callUser"
      ></Button>
    </div>
  </div>
</template>
