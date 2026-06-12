<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import TabPanel from '~/components/ui/TabPanel.vue'
import { aboutTabIds } from '~/data/about-tabs'

const { t } = useI18n()

const tabs = computed(() =>
  aboutTabIds.map(id => ({
    id,
    label: t(`about.tabs.${id}.label`),
    content: t(`about.tabs.${id}.content`)
  }))
)
</script>

<template>
  <section id="nosotros" class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="absolute inset-0 mesh-backdrop" aria-hidden="true" />
    <div class="section-shell relative grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-start">
      <div v-reveal>
        <SectionHeading
          :eyebrow="t('about.eyebrow')"
          :title="t('about.title')"
        />
      </div>
      <div v-reveal="{ delay: 160 }">
        <TabPanel :tabs="tabs" />
      </div>
    </div>
  </section>
</template>
