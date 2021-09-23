<template lang="pug">
  .root(
    class="flex flex-col items-center min-h-screen"
  )
    svg-symbols
    auth-manager
    error-handler
    nav-bar
    nuxt(
      class="flex-grow self-stretch"
    )
    footer-bar
</template>
