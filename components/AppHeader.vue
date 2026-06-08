<script setup lang="ts">
import { navigationItems } from '~/data/navigation'

const { t, locale, locales, setLocale } = useI18n()
const isOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  isOpen.value = false
})

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-core-line bg-white/95 text-core-ink backdrop-blur-xl">
    <nav class="section-shell flex min-h-20 items-center justify-between" :aria-label="t('nav.ariaLabel')">
      <NuxtLink to="/" class="block" :aria-label="t('nav.logoAriaLabel')">
        <img
          class="h-12 w-auto"
          :src="'/logo.png'"
          alt="Global Core Technologies"
          width="960"
          height="237"
          fetchpriority="high"
        >
      </NuxtLink>

      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-extrabold uppercase tracking-wide text-core-ink/78 transition hover:text-core-ink"
        >
          {{ t(`nav.items.${item.key}`) }}
        </NuxtLink>

        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="inline-flex items-center gap-1.5 rounded-full border border-core-line bg-core-mist px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-core-ink/70 transition duration-200 hover:border-core-orange/50 hover:bg-core-orange/5 hover:text-core-orange"
          @click="setLocale(loc.code)"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
          </svg>
          {{ loc.code.toUpperCase() }}
        </button>
      </div>

      <button
        class="grid h-11 w-11 place-items-center rounded-md border border-core-line text-core-ink md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-navigation"
        :aria-label="t('nav.openMenu')"
        @click="isOpen = !isOpen"
      >
        <span class="block h-0.5 w-5 bg-current shadow-[0_7px_0_currentColor,0_-7px_0_currentColor]" />
      </button>
    </nav>

    <div v-if="isOpen" id="mobile-navigation" class="border-t border-core-line bg-white md:hidden">
      <div class="section-shell grid gap-1 py-4">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide text-core-ink/82 hover:bg-core-mist"
        >
          {{ t(`nav.items.${item.key}`) }}
        </NuxtLink>
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="mx-3 mt-1 inline-flex items-center gap-2 rounded-full border border-core-line bg-core-mist px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-core-ink/70 transition hover:border-core-orange/50 hover:text-core-orange"
          @click="setLocale(loc.code)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
          </svg>
          {{ loc.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </header>
</template>
