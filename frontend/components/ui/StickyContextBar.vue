<script setup lang="ts">
defineProps<{
  label: string
  sublabel?: string
  backTo?: string
  backLabel?: string
}>()
</script>

<template>
  <!-- Floating capsule (no full-width bar): breadcrumb + prominent back CTA in a single pill. -->
  <div class="pointer-events-none sticky top-24 z-40 h-0">
    <!-- pt centers the ~50px capsule inside the 48px/64px gap (mt-12/mt-16) before the next section -->
    <div class="section-shell flex justify-start md:pt-2">
      <div class="pointer-events-auto inline-flex max-w-full items-center gap-3 rounded-full border border-core-line/70 bg-white/90 py-1.5 pl-1.5 pr-5 shadow-lift backdrop-blur-md">
        <NuxtLink
          v-if="backTo && backLabel"
          :to="backTo"
          class="group inline-flex shrink-0 items-center gap-2 rounded-full bg-core-orange px-4 py-2 text-sm font-bold text-white shadow-lift transition hover:bg-[#D9661F]"
        >
          <svg class="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
          </svg>
          {{ backLabel }}
        </NuxtLink>
        <div class="flex min-w-0 items-center gap-2 text-sm">
          <span class="shrink-0 font-extrabold text-core-orange">{{ label }}</span>
          <template v-if="sublabel">
            <span class="shrink-0 text-core-ink/30">·</span>
            <span class="hidden truncate font-semibold text-core-ink/70 sm:inline">{{ sublabel }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
