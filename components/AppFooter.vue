<script setup lang="ts">
import { siteConfig } from '~/data/site'
</script>

<template>
  <footer id="contacto" class="bg-white text-core-ink">
    <div class="section-shell grid gap-10 py-14 md:grid-cols-[1fr_1.35fr]">
      <div>
        <img
          class="h-12 w-auto"
          :src="'/global-core-logo.png'"
          alt="Global Core Technologies"
          width="960"
          height="237"
          loading="lazy"
        >
        <p class="mt-4 max-w-md text-slate-600">
          Consultoría SAP, seguridad y evolución digital para organizaciones que necesitan operar con control,
          continuidad y capacidad de cambio.
        </p>
      </div>
      <address class="grid gap-3 not-italic text-slate-600 sm:grid-cols-2">
        <a class="hover:text-core-ink" :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>
        <a class="hover:text-core-ink" :href="`tel:${siteConfig.phone.replaceAll(' ', '')}`">{{ siteConfig.phone }}</a>
        <span>{{ siteConfig.address }}</span>
        <span>SAP Silver Partner</span>
      </address>
    </div>
    <div class="border-t border-core-line py-5">
      <div class="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Global Core Technologies. Todos los derechos reservados.</p>
        <div class="flex gap-4">
          <a class="hover:text-core-ink" :href="siteConfig.social.linkedin">LinkedIn</a>
          <a class="hover:text-core-ink" :href="siteConfig.social.facebook">Facebook</a>
          <a class="hover:text-core-ink" :href="siteConfig.social.instagram">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>
