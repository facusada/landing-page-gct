<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { featuredExpertise } from '~/data/landing'

const { t, tm, rt } = useI18n()

const chipsFor = (id: string): string[] =>
  (tm(`featured.items.${id}.chips`) as unknown[]).map(chip => rt(chip as never))
</script>

<template>
  <section id="expertise" class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid" aria-hidden="true" />
    <div class="section-shell relative">
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
              :to="item.to"
              class="group mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-core-orange transition hover:text-[#C95718]"
            >
              {{ t(`featured.items.${item.id}.cta`) }}
              <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>

          <div :class="item.flip ? 'lg:order-1' : ''">
            <div class="relative overflow-hidden rounded-xl border border-white/10 bg-core-ink shadow-premium">
              <div class="absolute inset-0 bg-core-grid bg-[size:42px_42px]" aria-hidden="true" />
              <div class="absolute inset-0 bg-hero-radial opacity-40" aria-hidden="true" />

              <!-- Security: shield + control board -->
              <svg v-if="item.id === 'security'" viewBox="0 0 360 290" class="relative h-auto w-full" fill="none" role="img" :aria-label="t(`featured.items.${item.id}.title`)">
                <defs>
                  <linearGradient id="featSecurity" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#606AF4" />
                    <stop offset="1" stop-color="#123B66" />
                  </linearGradient>
                </defs>
                <path d="M180 38l46 18v40c0 30-20 50-46 60-26-10-46-30-46-60V56z" fill="url(#featSecurity)" opacity="0.92" stroke="rgba(255,255,255,.4)" />
                <path d="M162 96l14 14 26-26" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9" fill="#94A3B8">
                  <rect x="40" y="196" width="124" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="54" y="215">ROLE · RBAC</text><circle cx="150" cy="211" r="4" fill="#52E09A" />
                  <rect x="196" y="196" width="124" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="210" y="215">SoD CHECK</text><circle cx="306" cy="211" r="4" fill="#F17D30" />
                  <rect x="40" y="236" width="124" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="54" y="255">GRC AUDIT</text><circle cx="150" cy="251" r="4" fill="#52E09A" />
                  <rect x="196" y="236" width="124" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="210" y="255">MONITORING</text><circle cx="306" cy="251" r="4" fill="#52E09A" />
                </g>
              </svg>

              <!-- Operations: health dashboard -->
              <svg v-else-if="item.id === 'operations'" viewBox="0 0 360 290" class="relative h-auto w-full" fill="none" role="img" :aria-label="t(`featured.items.${item.id}.title`)">
                <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9" fill="#94A3B8">
                  <text x="34" y="44">SAP SYSTEM HEALTH</text><circle cx="318" cy="40" r="5" fill="#52E09A" /><text x="270" y="44" fill="#52E09A">LIVE</text>
                </g>
                <line x1="34" y1="200" x2="326" y2="200" stroke="rgba(255,255,255,.12)" />
                <g fill="#606AF4" opacity="0.85">
                  <rect x="40" y="150" width="26" height="50" rx="3" /><rect x="76" y="120" width="26" height="80" rx="3" /><rect x="112" y="135" width="26" height="65" rx="3" /><rect x="148" y="100" width="26" height="100" rx="3" fill="#F17D30" /><rect x="184" y="128" width="26" height="72" rx="3" /><rect x="220" y="112" width="26" height="88" rx="3" /><rect x="256" y="142" width="26" height="58" rx="3" /><rect x="292" y="124" width="26" height="76" rx="3" />
                </g>
                <polyline points="53,150 89,120 125,135 161,100 197,128 233,112 269,142 305,124" stroke="#52E09A" stroke-width="2" />
                <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9">
                  <rect x="34" y="226" width="140" height="42" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="46" y="244" fill="#fff">UPTIME</text><text x="46" y="260" fill="#52E09A" font-size="13">99.98%</text>
                  <rect x="186" y="226" width="140" height="42" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" /><text x="198" y="244" fill="#fff">MTTR ↓</text><text x="198" y="260" fill="#F17D30" font-size="13">-42%</text>
                </g>
              </svg>

              <!-- Transformation: ECC → RISE → S/4HANA journey -->
              <svg v-else viewBox="0 0 360 290" class="relative h-auto w-full" fill="none" role="img" :aria-label="t(`featured.items.${item.id}.title`)">
                <defs>
                  <linearGradient id="featTransform" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#606AF4" />
                    <stop offset="1" stop-color="#123B66" />
                  </linearGradient>
                </defs>
                <line x1="78" y1="145" x2="282" y2="145" stroke="rgba(255,255,255,.2)" stroke-width="2" stroke-dasharray="5 6" />
                <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10" text-anchor="middle">
                  <circle cx="78" cy="145" r="34" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.2)" /><text x="78" y="142" fill="#94A3B8">ECC</text><text x="78" y="156" fill="#64748B" font-size="8">LEGACY</text>
                  <circle cx="180" cy="145" r="30" fill="rgba(241,125,48,.14)" stroke="#F17D30" /><text x="180" y="142" fill="#F17D30">RISE</text><text x="180" y="156" fill="#C08A4E" font-size="8">MIGRATE</text>
                  <circle cx="282" cy="145" r="40" fill="url(#featTransform)" stroke="rgba(255,255,255,.4)" /><text x="282" y="141" fill="#fff" font-size="11">S/4HANA</text><text x="282" y="156" fill="#BCD0FF" font-size="8">CLEAN CORE</text>
                </g>
                <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9" fill="#94A3B8" text-anchor="middle">
                  <text x="78" y="220">ASSESS</text><text x="180" y="220">GOVERN</text><text x="282" y="220">OPTIMIZE</text>
                  <circle cx="78" cy="240" r="3" fill="#52E09A" /><circle cx="180" cy="240" r="3" fill="#F17D30" /><circle cx="282" cy="240" r="3" fill="#606AF4" />
                </g>
              </svg>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
