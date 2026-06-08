<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ServiceIcon from '~/components/ui/ServiceIcon.vue'
import { services } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const service = services.find(s => s.slug === slug)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Servicio no encontrado' })
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

const title = computed(() => t(`services.items.${slug}.title`))
const description = computed(() => t(`services.items.${slug}.description`))
const longDescription = computed(() => t(`services.items.${slug}.longDescription`))
const features = computed(() => t(`services.items.${slug}.features`) as unknown as string[])
const benefits = computed(() => t(`services.items.${slug}.benefits`) as unknown as string[])

useSeoMeta({
  title,
  description: computed(() => longDescription.value.slice(0, 160)),
  ogTitle: computed(() => `${title.value} | ${siteConfig.name}`),
  ogDescription: description,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteConfig.url}/servicios/${slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title.value,
        description: description.value,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        url: `${siteConfig.url}/servicios/${slug}`
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${siteConfig.url}/servicios` },
          { '@type': 'ListItem', position: 3, name: title.value, item: `${siteConfig.url}/servicios/${slug}` }
        ]
      })
    }
  ]
})

const otherServices = services.filter(s => s.slug !== slug)
</script>

<template>
  <div v-if="service">
    <section class="bg-core-ink py-16 text-white md:py-20">
      <div class="section-shell">
        <nav class="mb-8 text-sm text-white/60" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/servicios" class="hover:text-white">{{ t('breadcrumb.services') }}</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ title }}</span>
        </nav>
        <div class="flex items-start gap-5">
          <div class="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10 text-core-orange md:flex">
            <ServiceIcon :name="service.icon" :size="32" />
          </div>
          <div>
            <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ t('services.detail.eyebrow') }}</p>
            <h1 class="mt-2 font-display text-4xl font-extrabold leading-tight md:text-6xl">
              {{ title }}
            </h1>
            <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 md:py-24">
      <div class="section-shell grid gap-16 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div v-reveal>
            <h2 class="font-display text-3xl font-extrabold text-core-ink">{{ t('services.detail.sectionDescription') }}</h2>
            <p class="mt-4 text-lg leading-8 text-slate-600">
              {{ longDescription }}
            </p>
          </div>

          <div v-reveal="{ delay: 150 }" class="mt-12">
            <h3 class="font-display text-2xl font-extrabold text-core-ink">{{ t('services.detail.sectionIncludes') }}</h3>
            <ul class="mt-6 grid gap-3">
              <li v-for="feature in features" :key="feature" class="flex items-start gap-3 text-slate-700">
                <svg class="mt-1 h-5 w-5 shrink-0 text-core-orange" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div v-reveal="{ delay: 200 }" class="sticky top-28 rounded-xl border border-core-line bg-core-mist p-8">
            <h3 class="font-display text-xl font-extrabold text-core-ink">{{ t('services.detail.sectionBenefits') }}</h3>
            <ul class="mt-5 grid gap-3">
              <li v-for="benefit in benefits" :key="benefit" class="flex items-start gap-3 text-slate-700">
                <span class="mt-1 block h-2 w-2 shrink-0 rounded-full bg-core-cyan" />
                <span>{{ benefit }}</span>
              </li>
            </ul>
            <div class="mt-8">
              <BaseButton :to="`/contacto?servicio=${service.slug}`" class="w-full text-center">
                {{ t('services.detail.cta') }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-core-mist py-16 md:py-20">
      <div class="section-shell">
        <h2 v-reveal class="text-center font-display text-3xl font-extrabold text-core-ink">
          {{ t('services.detail.sectionOther') }}
        </h2>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="other in otherServices.slice(0, 4)"
            :key="other.slug"
            :to="`/servicios/${other.slug}`"
            v-reveal="{ delay: 100, distance: 30 }"
            class="group rounded-xl border border-core-line bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-lift"
          >
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-core-mist text-core-orange">
              <ServiceIcon :name="other.icon" :size="20" />
            </div>
            <h3 class="font-display text-lg font-extrabold text-core-ink">{{ t(`services.items.${other.slug}.title`) }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ t(`services.items.${other.slug}.description`) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
