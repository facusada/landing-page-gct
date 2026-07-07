<script setup lang="ts">
import { services } from '~/data/landing'

const { t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()

// Only preselect the service if the `?servicio=` query matches a real option
// in the select; otherwise fall back to the "Select service" placeholder.
const serviceSlugs = new Set(services.map(s => s.slug))
const requestedService = (route.query.servicio as string) ?? ''
const preselectedService = serviceSlugs.has(requestedService) ? requestedService : ''

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: '',
  serviceInterest: preselectedService
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const submitError = ref('')

const validateField = (field: string) => {
  switch (field) {
    case 'name':
      errors.name = form.name.trim().length < 2 ? t('form.errors.name') : ''
      break
    case 'email':
      errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : t('form.errors.email')
      break
    case 'message':
      errors.message = form.message.trim().length < 10 ? t('form.errors.message') : ''
      break
  }
}

const isValid = computed(() =>
  form.name.trim().length >= 2
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  && form.message.trim().length >= 10
)

const handleSubmit = async () => {
  validateField('name')
  validateField('email')
  validateField('message')
  if (!isValid.value) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/contact', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company,
        serviceInterest: form.serviceInterest,
        message: form.message
      }
    })
    isSuccess.value = true
    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
    form.serviceInterest = ''
  } catch {
    submitError.value = t('form.submitError')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div v-if="isSuccess" role="status" aria-live="polite" class="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
    <svg class="mx-auto h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke-linecap="round" />
      <path d="M22 4L12 14.01l-3-3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <h3 class="mt-4 font-display text-xl font-extrabold text-core-ink">{{ t('form.success.title') }}</h3>
    <p class="mt-2 text-slate-600">{{ t('form.success.message') }}</p>
  </div>

  <form v-else class="grid gap-6" @submit.prevent="handleSubmit" novalidate>
    <div>
      <label for="contact-name" class="mb-1.5 block text-sm font-bold text-core-ink">{{ t('form.name') }}</label>
      <input
        id="contact-name"
        v-model="form.name"
        type="text"
        required
        autocomplete="name"
        :aria-invalid="!!errors.name"
        :aria-describedby="errors.name ? 'error-name' : undefined"
        class="w-full rounded-md border border-core-line px-4 py-3 text-base transition focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 focus:outline-none"
        @blur="validateField('name')"
      >
      <p v-if="errors.name" id="error-name" role="alert" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div>
      <label for="contact-email" class="mb-1.5 block text-sm font-bold text-core-ink">{{ t('form.email') }}</label>
      <input
        id="contact-email"
        v-model="form.email"
        type="email"
        required
        autocomplete="email"
        :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'error-email' : undefined"
        class="w-full rounded-md border border-core-line px-4 py-3 text-base transition focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 focus:outline-none"
        @blur="validateField('email')"
      >
      <p v-if="errors.email" id="error-email" role="alert" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <div>
      <label for="contact-company" class="mb-1.5 block text-sm font-bold text-core-ink">{{ t('form.company') }}</label>
      <input
        id="contact-company"
        v-model="form.company"
        type="text"
        autocomplete="organization"
        class="w-full rounded-md border border-core-line px-4 py-3 text-base transition focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 focus:outline-none"
      >
    </div>

    <div>
      <label for="contact-service" class="mb-1.5 block text-sm font-bold text-core-ink">{{ t('form.service') }}</label>
      <select
        id="contact-service"
        v-model="form.serviceInterest"
        class="w-full rounded-md border border-core-line px-4 py-3 text-base transition focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 focus:outline-none"
      >
        <option value="">{{ t('form.servicePlaceholder') }}</option>
        <option v-for="service in services" :key="service.slug" :value="service.slug">
          {{ t(`services.items.${service.slug}.title`) }}
        </option>
      </select>
    </div>

    <div>
      <label for="contact-message" class="mb-1.5 block text-sm font-bold text-core-ink">{{ t('form.message') }}</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        required
        rows="4"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'error-message' : undefined"
        class="w-full resize-y rounded-md border border-core-line px-4 py-3 text-base transition focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 focus:outline-none"
        @blur="validateField('message')"
      />
      <p v-if="errors.message" id="error-message" role="alert" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
    </div>

    <p v-if="submitError" class="text-sm text-red-600">{{ submitError }}</p>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="inline-flex min-h-11 items-center justify-center rounded-md bg-core-orange px-6 py-3 text-sm font-bold text-white shadow-lift transition duration-200 hover:bg-[#D9661F] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {{ isSubmitting ? t('form.submitting') : t('form.submit') }}
    </button>
  </form>
</template>
