<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import TestimonialCard from '~/components/ui/TestimonialCard.vue'
import { testimonials } from '~/data/testimonials'
</script>

<template>
  <section class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        eyebrow="Testimonios"
        title="Lo que dicen nuestros clientes"
        description="Organizaciones que confiaron en Global Core Technologies para transformar, asegurar y operar sus entornos SAP."
      />

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <TestimonialCard
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.personName"
          v-reveal="{ delay: Math.min(index * 140, 420), distance: 38, duration: 840 }"
          :quote="testimonial.quote"
          :person-name="testimonial.personName"
          :role="testimonial.role"
          :company="testimonial.company"
        />
      </div>
    </div>
  </section>
</template>
