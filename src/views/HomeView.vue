<script setup>
function scrollToDetails() {
  const details = document.getElementById('details')
  details.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900 h-screen">
    <div class="flex-1 flex items-center justify-center">
      <div class="p-6 pt-12 lg:p-12">
        <h1
          class="relative text-3xl lg:text-6xl font-bold text-surface-900 dark:text-surface-0 mb-4 lg:leading-normal text-center lg:text-left"
        >
          <span class="crystal">Crystal</span> calls, free forever.
        </h1>
        <p
          class="text-surface-700 dark:text-surface-200 leading-normal mb-8 text-center lg:text-left"
        >
          TrinityTalk is a free, open-source, peer-to-peer (P2P) voice and video calling app. Our
          goal is to provide a fast, reliable and high quality calling experience to everyone,
          without requiring any subscriptions.
        </p>
        <div class="flex items-center justify-center lg:justify-start gap-6">
          <Button label="Get started" as="router-link" to="/chat" />
          <Button label="Learn more" outlined @click="scrollToDetails" />
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-hidden">
      <img
        src="/images/mohammad-shahhosseini-MUsyGmmdxuo-unsplash-min.jpg"
        alt="hero-1"
        class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
      />
    </div>
  </div>

  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20 h-screen">
    <div class="font-bold text-4xl lg:text-6xl mb-6 text-center text-primary">Peer-to-Peer</div>
    <div
      class="text-surface-700 dark:text-surface-0/70 text-xl mb-12 text-center leading-normal mx-auto max-w-4xl"
    >
      In order to enable a high quality calling experience, TrinityTalk uses a P2P connection. This
      means that the voice and video data is sent directly between the two devices, without any
      intermediary servers.
      <br />
      <br />
      <span class="font-semibold">Here is what you need to know:</span>
    </div>
    <div class="flex lg:flex-row flex-col gap-8 lg:gap-4 xl:gap-12 max-w-7xl mx-auto">
      <div
        class="w-full flex-1 py-4 px-4 lg:px-6 flex rounded-lg flex-col bg-surface-0 dark:bg-surface-800 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12),0px_0px_2px_0px_rgba(0,0,0,0.06),0px_4px_10px_0px_rgba(0,0,0,0.03)]"
      >
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">
          <span class="text-primary">Client-Server</span> model
        </div>
        <div class="text-surface-600 dark:text-surface-300">
          In a classic client-server model, the voice and video data is sent through intermediary
          servers. This means the user is always responsible for sending only one stream, which the
          server will then proxy to all other call participants.
        </div>

        <div class="my-4 w-full h-px bg-surface-300 dark:bg-surface-600" />
        <ul class="list-none flex flex-col gap-4 flex-1">
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Simple group calls
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Different quality for each user
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Better privacy (other users can't see your IP)
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-times-circle text-red-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Quality limited by the server
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-times-circle text-red-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Connection dependent on the server
            </span>
          </li>
        </ul>
      </div>
      <div
        id="details"
        class="w-full flex-1 py-4 px-4 lg:px-6 flex rounded-lg flex-col bg-surface-0 dark:bg-surface-800 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12),0px_0px_2px_0px_rgba(0,0,0,0.06),0px_4px_10px_0px_rgba(0,0,0,0.03)]"
      >
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">
          <span class="text-primary">Peer-to-Peer</span> model
        </div>
        <div class="text-surface-600 dark:text-surface-300">
          In a P2P model, the voice and video data is sent directly between the two devices. This
          means that if you want group calls, every user will send their own stream to every other
          user, which quickly becomes unsustainable.
        </div>
        <div class="my-4 w-full h-px bg-surface-300 dark:bg-surface-600" />

        <ul class="list-none flex flex-col gap-4 flex-1">
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Unlimited video quality
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Independent on server connection
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6"> Fast </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-times-circle text-red-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Worse privacy (other users can see your IP)
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-times-circle text-red-500 text-lg" />
            <span class="text-surface-800 dark:text-surface-100 leading-6">
              Limited group calls
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crystal {
  background-image: url('/images/daniele-levis-pelusi-NXt2h4AQZVU-unsplash.jpg');
  background-size: cover;
  background-clip: text;
  color: transparent;
}

.crystal::before {
  display: block;
  position: absolute;
  content: 'Crystal';
  width: 100%;
  height: 100%;
  mix-blend-mode: color;
  pointer-events: none;
  @apply text-primary;
}
</style>
