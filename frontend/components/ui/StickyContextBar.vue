<script setup lang="ts">
defineProps<{
  label: string
  sublabel?: string
  backTo?: string
  backLabel?: string
}>()

const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { visible.value = !entry.isIntersecting },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  )
  const sentinel = document.getElementById('hero-sentinel')
  if (sentinel) observer.observe(sentinel)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="visible"
        class="fixed left-0 right-0 top-[80px] z-40 border-b border-core-line/60 bg-core-mist/95 backdrop-blur-md"
      >
        <div class="section-shell flex items-center justify-between py-2.5">
          <div class="flex items-center gap-2 text-sm">
            <span class="font-extrabold text-core-orange">{{ label }}</span>
            <template v-if="sublabel">
              <span class="text-core-ink/30">·</span>
              <span class="font-semibold text-core-ink/70">{{ sublabel }}</span>
            </template>
          </div>
          <NuxtLink
            v-if="backTo && backLabel"
            :to="backTo"
            class="text-xs font-bold text-core-ink/50 transition hover:text-core-orange"
          >
            ← {{ backLabel }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
