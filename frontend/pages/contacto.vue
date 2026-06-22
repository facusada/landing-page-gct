<script setup lang="ts">
import ContactForm from '~/components/ui/ContactForm.vue'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localizedTo = useLocalizedTo()

const pageTitle = computed(() => t('contactPage.seoTitle'))
const pageDescription = computed(() => t('contactPage.seoDescription'))

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: computed(() => `${pageTitle.value} | ${siteConfig.name}`),
  ogDescription: pageDescription,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteConfig.url}/contacto` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${siteConfig.url}/contacto` }
        ]
      })
    }
  ]
})
</script>

<template>
  <section class="bg-core-ink py-16 text-white md:py-20">
    <div class="section-shell">
      <nav class="mb-8 text-sm text-white/60" aria-label="Breadcrumb">
        <NuxtLink :to="localizedTo('/')" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-white/90">{{ t('contactPage.breadcrumb') }}</span>
      </nav>
      <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ t('contactPage.hero.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        {{ t('contactPage.hero.title') }}
      </h1>
      <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
        {{ t('contactPage.hero.description') }}
      </p>
    </div>
  </section>

  <section class="bg-core-mist py-16 md:py-24">
    <div class="section-shell grid gap-16 lg:grid-cols-[1fr_1.2fr]">
      <div v-reveal>
        <h2 class="font-display text-2xl font-extrabold text-core-ink">{{ t('contactPage.info.title') }}</h2>
        <address class="mt-6 grid gap-5 not-italic text-slate-600">
          <div>
            <p class="text-sm font-bold uppercase tracking-wide text-core-ink">{{ t('contactPage.info.email') }}</p>
            <a class="mt-1 block hover:text-core-orange" :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>
          </div>
          <div>
            <p class="text-sm font-bold uppercase tracking-wide text-core-ink">{{ t('contactPage.info.phone') }}</p>
            <a class="mt-1 block hover:text-core-orange" :href="`tel:${siteConfig.phone.replaceAll(' ', '')}`">{{ siteConfig.phone }}</a>
          </div>
          <div>
            <p class="text-sm font-bold uppercase tracking-wide text-core-ink">{{ t('contactPage.info.office') }}</p>
            <p class="mt-1">{{ siteConfig.address }}</p>
          </div>
        </address>
        <div class="mt-8 flex gap-4">
          <a :href="siteConfig.social.linkedin" class="text-slate-500 transition hover:text-core-ink" aria-label="LinkedIn">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a :href="siteConfig.social.facebook" class="text-slate-500 transition hover:text-core-ink" aria-label="Facebook">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a :href="siteConfig.social.instagram" class="text-slate-500 transition hover:text-core-ink" aria-label="Instagram">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" /></svg>
          </a>
        </div>
      </div>

      <div v-reveal="{ delay: 150 }" class="rounded-xl border border-core-line bg-white p-8 shadow-premium">
        <h2 class="font-display text-2xl font-extrabold text-core-ink">{{ t('contactPage.form.title') }}</h2>
        <p class="mt-2 mb-6 text-slate-600">{{ t('contactPage.form.description') }}</p>
        <ContactForm />
      </div>
    </div>
  </section>
</template>
