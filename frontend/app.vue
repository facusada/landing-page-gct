<script setup lang="ts">
import RouteLoadingOverlay from '~/components/ui/RouteLoadingOverlay.vue'
import { siteConfig } from '~/data/site'

const { locale } = useI18n()
const route = useRoute()

// Loading takeover for client-side navigation. Service pages hold their route
// transition until the hero photo is cached, so without this the previous page
// just freezes; with it, the wait reads as an intentional transition.
// Grace delay avoids flashing it on instant navigations; once shown it stays a
// minimum time so it never blinks in and out.
const SHOW_DELAY_MS = 150
const MIN_VISIBLE_MS = 600
const navLoading = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let shownAt = 0

const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  if (navLoading.value || showTimer) return
  showTimer = setTimeout(() => {
    showTimer = null
    shownAt = Date.now()
    navLoading.value = true
  }, SHOW_DELAY_MS)
})
const endNavLoading = () => {
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  if (!navLoading.value) return
  const elapsed = Date.now() - shownAt
  const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => { hideTimer = null; navLoading.value = false }, wait)
}
nuxtApp.hook('page:finish', endNavLoading)
nuxtApp.hook('vue:error', endNavLoading)

// Self-referencing, locale-aware canonical for every page. route.path already
// includes the i18n prefix (e.g. /en/servicios), so each language canonicalizes
// to itself instead of pointing everything at the homepage.
const canonicalHref = computed(() => siteConfig.url + (route.path === '/' ? '' : route.path.replace(/\/$/, '')))

useHead({
  htmlAttrs: { lang: locale },
  link: [{ rel: 'canonical', href: canonicalHref }]
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Transition name="nav-loading">
      <RouteLoadingOverlay v-if="navLoading" />
    </Transition>
  </div>
</template>

<style>
.nav-loading-enter-active {
  transition: opacity 0.18s ease-out;
}
.nav-loading-leave-active {
  transition: opacity 0.4s ease-in;
}
.nav-loading-enter-from,
.nav-loading-leave-to {
  opacity: 0;
}
</style>
