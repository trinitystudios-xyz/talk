<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const pb = inject('pb')

const router = useRouter()

const userStore = useUserStore()

const login = async () => {
  await pb.collection('users').authWithOAuth2({ provider: 'oidc' })

  userStore.refresh()

  router.push({ name: 'chat' })
}

login()
</script>
