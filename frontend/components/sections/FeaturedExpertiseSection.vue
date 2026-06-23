<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { featuredExpertise } from '~/data/landing'

const { t, tm, rt } = useI18n()
const localizedTo = useLocalizedTo()

const chipsFor = (id: string): string[] =>
  (tm(`featured.items.${id}.chips`) as unknown[]).map(chip => rt(chip as never))
</script>

<template>
  <section id="expertise" class="relative overflow-hidden py-20 md:py-28">
    <div class="relative px-6 md:px-10 lg:px-28">
      <SectionHeading
        v-reveal
        align="center"
        :eyebrow="t('featured.eyebrow')"
        :title="t('featured.title')"
      />

      <div class="mt-16 grid gap-16 md:gap-20">
        <article
          v-for="item in featuredExpertise"
          :key="item.id"
          v-reveal="{ distance: 40, duration: 840 }"
          class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <div :class="item.flip ? 'lg:order-2' : ''">
            <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">
              {{ t(`featured.items.${item.id}.tag`) }}
            </p>
            <h3 class="mt-3 font-display text-2xl font-extrabold leading-tight text-core-ink md:text-4xl">
              {{ t(`featured.items.${item.id}.title`) }}
            </h3>
            <p class="mt-4 font-display text-lg font-bold text-core-navy">
              {{ t(`featured.items.${item.id}.highlight`) }}
            </p>
            <p class="mt-3 leading-7 text-slate-600">
              {{ t(`featured.items.${item.id}.description`) }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="chip in chipsFor(item.id)"
                :key="chip"
                class="rounded-md bg-core-mist px-3 py-1 text-sm font-bold text-core-navy"
              >
                {{ chip }}
              </span>
            </div>
            <NuxtLink
              :to="localizedTo(item.to)"
              class="group mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-core-orange transition hover:text-[#C95718]"
            >
              {{ t(`featured.items.${item.id}.cta`) }}
              <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>

          <div :class="item.flip ? 'lg:order-1' : ''">
            <div class="relative mx-auto max-w-[420px] overflow-hidden rounded-xl border border-white/10 shadow-premium">
              <!-- Security: shield + control board -->
              <img v-if="item.id === 'security'" src="~/assets/cards_pilars/files_3/secure.png" class="relative h-auto w-full" :alt="t(`featured.items.${item.id}.title`)" />

              <!-- Operations: health dashboard -->
              <img v-else-if="item.id === 'operations'" src="~/assets/cards_pilars/files_3/operate.png" class="relative h-auto w-full" :alt="t(`featured.items.${item.id}.title`)" />

              <!-- Governance: framework / clean core -->
              <img v-else-if="item.id === 'governance'" src="~/assets/cards_pilars/files_3/govern.png" class="relative h-auto w-full" :alt="t(`featured.items.${item.id}.title`)" />

              <!-- Innovation: AI / BTP / Intelliguard -->
              <img v-else-if="item.id === 'innovation'" src="~/assets/cards_pilars/files_3/innovate.png" class="relative h-auto w-full" :alt="t(`featured.items.${item.id}.title`)" />

              <!-- Transformation: ECC → RISE → S/4HANA journey -->
              <img v-else src="~/assets/cards_pilars/files_3/transformation.png" class="relative h-auto w-full" :alt="t(`featured.items.${item.id}.title`)" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
