<script setup lang="ts">
const props = defineProps<{
  label: string       // e.g. "Transform"
  sublabel?: string   // e.g. "SAP S/4HANA Transformation"
  sections?: { id: string; label: string }[]
}>()

const visible = ref(false)
const activeSection = ref('')

onMounted(() => {
  // Show after scrolling past hero
  const heroSentinel = document.getElementById('hero-sentinel')
  if (heroSentinel) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => { visible.value = !entry.isIntersecting },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )
    heroObserver.observe(heroSentinel)
    onUnmounted(() => heroObserver.disconnect())
  } else {
    visible.value = true
  }

  // Track active section
  if (props.sections?.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) activeSection.value = entry.target.id
        })
      },
      { threshold: 0.3 }
    )
    props.sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })
    onUnmounted(() => sectionObserver.disconnect())
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-4 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-4 opacity-0"
    >
      <div
        v-if="visible"
        class="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-end xl:gap-3"
      >
        <!-- Label -->
        <div class="flex flex-col items-end gap-0.5">
          <span class="text-xs font-extrabold uppercase tracking-widest text-core-orange">{{ label }}</span>
          <span v-if="sublabel" class="max-w-[140px] text-right text-[11px] font-semibold leading-tight text-core-ink/50">{{ sublabel }}</span>
        </div>

        <!-- Section dots -->
        <div v-if="sections?.length" class="flex flex-col items-end gap-2">
          <button
            v-for="section in sections"
            :key="section.id"
            class="group flex items-center gap-2"
            @click="document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })"
          >
            <span
              class="text-[10px] font-semibold text-core-ink/40 opacity-0 transition-all duration-200 group-hover:opacity-100"
              :class="activeSection === section.id ? 'opacity-100 text-core-ink/60' : ''"
            >{{ section.label }}</span>
            <span
              class="block rounded-full transition-all duration-200"
              :class="activeSection === section.id
                ? 'h-2 w-2 bg-core-orange'
                : 'h-1.5 w-1.5 bg-core-ink/20 group-hover:bg-core-ink/40'"
            />
          </button>
        </div>

        <!-- Vertical line -->
        <div class="h-8 w-px bg-core-ink/10" />
      </div>
    </Transition>
  </Teleport>
</template>
