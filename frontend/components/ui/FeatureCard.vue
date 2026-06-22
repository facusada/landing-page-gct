<script setup lang="ts">
import ServiceIcon from '~/components/ui/ServiceIcon.vue'

defineProps<{
  title: string
  description: string
  proof?: string
  index?: number
  icon?: string
  to?: string
}>()

const cardClass = 'group flex h-full flex-col rounded-xl border border-core-line bg-white p-6 shadow-[0_1px_0_rgba(7,17,31,0.04)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-premium'
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="cardClass">
    <div
      class="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-core-mist transition-colors duration-200 group-hover:bg-core-orange/10"
      :class="icon ? 'text-core-orange' : 'text-lg font-extrabold text-core-orange'"
    >
      <ServiceIcon v-if="icon" :name="icon" :size="24" />
      <template v-else>{{ String((index ?? 0) + 1).padStart(2, '0') }}</template>
    </div>
    <h3 class="font-display text-xl font-extrabold leading-snug text-core-ink">
      {{ title }}
    </h3>
    <p class="mt-4 flex-1 text-base leading-7 text-slate-600">
      {{ description }}
    </p>
    <p v-if="proof" class="mt-6 border-t border-core-line pt-4 text-sm font-bold text-core-navy">
      {{ proof }}
    </p>
    <p class="mt-4 text-sm font-bold text-core-orange transition group-hover:translate-x-1">
      Ver detalle →
    </p>
  </NuxtLink>

  <article v-else :class="cardClass">
    <div
      class="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-core-mist transition-colors duration-200 group-hover:bg-core-orange/10"
      :class="icon ? 'text-core-orange' : 'text-lg font-extrabold text-core-orange'"
    >
      <ServiceIcon v-if="icon" :name="icon" :size="24" />
      <template v-else>{{ String((index ?? 0) + 1).padStart(2, '0') }}</template>
    </div>
    <h3 class="font-display text-xl font-extrabold leading-snug text-core-ink">
      {{ title }}
    </h3>
    <p class="mt-4 flex-1 text-base leading-7 text-slate-600">
      {{ description }}
    </p>
    <p v-if="proof" class="mt-6 border-t border-core-line pt-4 text-sm font-bold text-core-navy">
      {{ proof }}
    </p>
  </article>
</template>
