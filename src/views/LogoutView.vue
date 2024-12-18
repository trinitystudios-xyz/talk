<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const pb = inject('pb')

const router = useRouter()

const userStore = useUserStore()

const login = async () => {
  await pb.authStore.clear()

  userStore.refresh()

  router.push({ name: 'home' })
}

login()
</script>
