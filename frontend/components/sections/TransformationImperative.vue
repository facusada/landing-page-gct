<template>
  <section class="bg-white py-16 md:py-24">
    <div class="section-shell">
      <div v-reveal class="mb-10 max-w-2xl">
        <h2 class="font-display text-3xl font-extrabold text-core-ink">
          {{ title }}
        </h2>
        <p v-if="intro" class="mt-3 text-lg leading-8 text-slate-600">
          {{ intro }}
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(pressure, index) in pressures"
          :key="pressure.label"
          v-reveal="{ delay: Math.min(index * 80, 480), distance: 26, duration: 720 }"
          class="flex items-start gap-3 rounded-xl border border-core-line bg-white/30 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
        >
          <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-core-orange/10 text-core-orange">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <g v-if="pressure.icon === 'server'">
                <rect x="3" y="4" width="18" height="7" rx="1.5" />
                <rect x="3" y="13" width="18" height="7" rx="1.5" />
                <path d="M7 7.5h.01M7 16.5h.01" />
              </g>
              <g v-else-if="pressure.icon === 'layers'">
                <path d="M12 2 2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </g>
              <g v-else-if="pressure.icon === 'alert'">
                <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z" />
                <path d="M12 9v4M12 17h.01" />
              </g>
              <g v-else-if="pressure.icon === 'shield'">
                <path d="M12 3l7 3v5c0 4.4-3 7-7 8-4-1-7-3.6-7-8V6l7-3z" />
              </g>
              <g v-else-if="pressure.icon === 'cloud'">
                <path d="M7 18a4 4 0 01-.5-7.97A5 5 0 0116.5 8.5 3.5 3.5 0 0117 18H7z" />
              </g>
              <g v-else-if="pressure.icon === 'chart'">
                <path d="M3 21h18" />
                <path d="M6 21v-7M12 21V5M18 21v-4" />
              </g>
              <g v-else>
                <path d="M12 3l1.6 4.8L18.5 9.5 13.6 11 12 16l-1.6-5L5.5 9.5l4.9-1.7L12 3z" fill="currentColor" stroke="none" />
              </g>
            </svg>
          </span>
          <p class="font-display text-base font-extrabold leading-snug text-core-ink">
            {{ pressure.label }}
          </p>
        </div>
      </div>

      <div v-if="closing || highlight" v-reveal="{ delay: 200 }" class="mt-12 max-w-3xl">
        <p v-if="closing" class="text-lg leading-8 text-slate-600">
          {{ closing }}
        </p>
        <p v-if="highlight" class="mt-3 font-display text-2xl font-extrabold leading-tight text-core-ink">
          {{ highlight }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Why Organizations Must Transform' },
  intro: { type: String, default: '' },
  pressures: { type: Array, default: () => [] },
  closing: { type: String, default: '' },
  highlight: { type: String, default: '' },
})
</script>
