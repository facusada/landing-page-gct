<script setup lang="ts">
import { navigationItems } from '~/data/navigation'

const isOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-core-line bg-white/95 text-core-ink backdrop-blur-xl">
    <nav class="section-shell flex min-h-20 items-center justify-between" aria-label="Navegacion principal">
      <a href="#inicio" class="block" aria-label="Global Core Technologies inicio">
        <img
          class="h-12 w-auto"
          :src="'/global-core-logo.png'"
          alt="Global Core Technologies"
          width="960"
          height="237"
          fetchpriority="high"
        >
      </a>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in navigationItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-extrabold uppercase tracking-wide text-core-ink/78 transition hover:text-core-ink"
        >
          {{ item.label }}
        </a>
      </div>

      <button
        class="grid h-11 w-11 place-items-center rounded-md border border-core-line text-core-ink md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-navigation"
        aria-label="Abrir menu de navegacion"
        @click="isOpen = !isOpen"
      >
        <span class="block h-0.5 w-5 bg-current shadow-[0_7px_0_currentColor,0_-7px_0_currentColor]" />
      </button>
    </nav>

    <div v-if="isOpen" id="mobile-navigation" class="border-t border-core-line bg-white md:hidden">
      <div class="section-shell grid gap-1 py-4">
        <a
          v-for="item in navigationItems"
          :key="item.href"
          :href="item.href"
          class="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide text-core-ink/82 hover:bg-core-mist"
          @click="isOpen = false"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </header>
</template>
