<script setup>
const adjectives = [
  'Angry',
  'Bashful',
  'Clever',
  'Dopey',
  'Eager',
  'Fancy',
  'Gloomy',
  'Happy',
  'Icy',
  'Jolly',
  'Kind',
  'Lucky',
  'Mighty',
  'Noble',
  'Obedient',
  'Proud',
  'Quick',
  'Rude',
  'Silly',
  'Tough',
  'Unique',
  'Vivid',
  'Wise',
  'Xenial',
  'Yummy',
  'Zany',
]

const nouns = [
  'Antelope',
  'Bear',
  'Cat',
  'Dog',
  'Elephant',
  'Fox',
  'Giraffe',
  'Horse',
  'Iguana',
  'Jaguar',
  'Kangaroo',
  'Lion',
  'Moose',
  'Narwhal',
  'Owl',
  'Penguin',
  'Quail',
  'Raccoon',
  'Squirrel',
  'Tiger',
  'Umbrella Bird',
  'Vulture',
  'Walrus',
  'Xerus',
  'Yak',
  'Zebra',
]

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const randomName =
  adjectives[Math.floor(Math.random() * adjectives.length)] +
  nouns[Math.floor(Math.random() * nouns.length)]

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    tag: z
      .string()
      .trim()
      .length(4, { message: 'Tag must be 4 characters.' })
      .regex(/^[A-Z0-9]+$/, { message: 'Tag must only contain numbers or upperase letters.' }),
  }),
)

import pb from '@/pocketbase'

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    // check the user exists
    const user = await pb
      .collection('users')
      .getList(1, 1, { filter: 'name = "' + values.username + '" && tag = "' + values.tag + '"' })
    if (user.items.length === 0) {
      toast.add({
        severity: 'error',
        summary: 'User not found!',
        detail: 'Please check the name and tag and try again.',
        life: 3000,
      })
      return
    }

    // check if a request was already sent
    const requests = await pb.collection('friends').getList(1, 1, {
      filter:
        'from.id = "' +
        userStore.userData.id +
        '" && to.id = "' +
        user.items[0].id +
        '" && confirmed = false',
    })
    if (requests.items.length > 0) {
      toast.add({
        severity: 'error',
        summary: 'Friend request already sent!',
        detail: 'Please wait for the user to accept.',
        life: 3000,
      })
      return
    }

    //  check if the  other user already sent a request
    const sentRequests = await pb.collection('friends').getList(1, 1, {
      filter:
        'to.id = "' +
        userStore.userData.id +
        '" && from.id = "' +
        user.items[0].id +
        '" && confirmed = false',
    })
    if (sentRequests.items.length > 0) {
      toast.add({
        severity: 'error',
        summary: 'Friend request already sent!',
        detail: 'Please accept it to become friends.',
        life: 3000,
      })
      return
    }

    //  check if the user is already a friend
    const friends = await pb.collection('friends').getList(1, 1, {
      filter:
        '(from.id = "' +
        userStore.userData.id +
        '" && to.id = "' +
        user.items[0].id +
        '") || (from.id = "' +
        user.items[0].id +
        '" && to.id = "' +
        userStore.userData.id +
        '") && confirmed = true',
    })
    if (friends.items.length > 0) {
      toast.add({
        severity: 'error',
        summary: 'Already friends!',
        detail: values.username + ' #' + values.tag + ' is already your friend.',
        life: 3000,
      })
      return
    }

    // send the friend request
    await pb.collection('friends').create({
      from: userStore.userData.id,
      to: user.items[0].id,
    })
    toast.add({
      severity: 'success',
      summary: 'Friend request sent!',
      detail: values.username + ' #' + values.tag,
      life: 3000,
    })
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver
    :validateOnBlur="true"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-64"
  >
    <div class="flex flex-col gap-1">
      <IftaLabel>
        <InputText name="username" type="text" v-bind:placeholder="randomName" fluid />
        <label for="username">Username</label>
      </IftaLabel>
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
        $form.username.error.message
      }}</Message>
    </div>
    <div class="flex flex-col gap-1">
      <IftaLabel>
        <InputText name="tag" type="text" placeholder="1337" fluid />
        <label for="tag">Tag</label>
      </IftaLabel>
      <Message v-if="$form.tag?.invalid" severity="error" size="small" variant="simple">{{
        $form.tag.error.message
      }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>
