<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { locale } = useI18n()
const route = useRoute()

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
