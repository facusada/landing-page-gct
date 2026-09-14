<script setup lang="ts">
// Full-screen takeover shown during client-side navigation while the next
// page's hero photo is being cached (the service pages hold their Suspense
// resolution until the photo is ready). Covers the header on purpose: a full
// takeover reads as "traveling to the next page" instead of a frozen UI.
</script>

<template>
  <div class="fixed inset-0 z-[80] flex items-center justify-center bg-core-ink" role="status" aria-live="polite">
    <span class="sr-only">Loading</span>
    <!-- Same ambient glows as the site heroes so the takeover feels like part of the page, not a curtain. -->
    <div class="pointer-events-none absolute inset-0 bg-hero-radial opacity-80" aria-hidden="true" />

    <svg class="orbit-mark h-20 w-20 md:h-24 md:w-24" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <!-- Ghost of the full mark, always visible so the shape never disappears. -->
      <path d="M44 14C52 21 47 39 35 48C24 56 12 53 10 43C8 34 17 19 29 13C35 10 40 11 44 14Z" stroke="#0000FF" stroke-opacity="0.16" stroke-width="5" />
      <path d="M18 45C10 38 15 20 27 12C38 5 50 8 52 18C54 27 45 42 33 48C27 51 22 49 18 45Z" stroke="#F17D30" stroke-opacity="0.16" stroke-width="5" />
      <!-- Comet segments tracing each orbit in counter-phase. -->
      <path class="trace trace-blue" d="M44 14C52 21 47 39 35 48C24 56 12 53 10 43C8 34 17 19 29 13C35 10 40 11 44 14Z" pathLength="100" stroke="#0000FF" stroke-width="5" stroke-linecap="round" />
      <path class="trace trace-orange" d="M18 45C10 38 15 20 27 12C38 5 50 8 52 18C54 27 45 42 33 48C27 51 22 49 18 45Z" pathLength="100" stroke="#F17D30" stroke-width="5" stroke-linecap="round" />
      <circle class="core-dot" cx="32" cy="31" r="6" fill="#F5F7FA" />
    </svg>
  </div>
</template>

<style scoped>
.orbit-mark {
  filter: drop-shadow(0 0 24px rgba(0, 0, 255, 0.35)) drop-shadow(0 0 48px rgba(241, 125, 48, 0.18));
}
.trace {
  stroke-dasharray: 30 70;
  animation: orbit-trace 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.trace-orange {
  animation-delay: -0.75s;
}
.core-dot {
  transform-origin: 32px 31px;
  animation: core-pulse 1.5s ease-in-out infinite;
}
@keyframes orbit-trace {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -100; }
}
@keyframes core-pulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.25); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .trace, .core-dot { animation: none; }
  .trace { stroke-dasharray: none; }
}
</style>
