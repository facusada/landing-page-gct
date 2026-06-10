<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import ServiceIcon from '~/components/ui/ServiceIcon.vue'
import { serviceModules } from '~/data/landing'

const { t } = useI18n()
</script>

<template>
  <section id="servicios" class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        :eyebrow="t('services.section.eyebrow')"
        :title="t('services.section.title')"
        :description="t('services.section.description')"
      />

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="(module, index) in serviceModules"
          :key="module.slug"
          :to="`/servicios/${module.slug}`"
          v-reveal="{ delay: Math.min(index * 100, 400), distance: 30, duration: 820 }"
          :style="{ backgroundImage: `url('${module.image}')` }"
          :class="['group relative h-[340px] overflow-hidden rounded-xl bg-cover bg-center', index === 4 ? 'lg:col-start-1' : '']"
        >
          <!-- bottom gradient panel -->
          <div class="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/95 via-black/80 to-transparent" />

          <!-- text content -->
          <div class="absolute inset-x-0 bottom-0 p-5">
            <h3 class="font-display text-base font-extrabold leading-snug text-white">
              {{ t(`services.modules.${module.slug}.title`) }}
            </h3>
            <p class="mt-1.5 text-xs leading-5 text-white/75 line-clamp-3">
              {{ t(`services.modules.${module.slug}.description`) }}
            </p>
            <p class="mt-3 text-xs font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
              {{ t('services.section.viewDetail') }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
