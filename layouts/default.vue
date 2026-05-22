<template>
  <div class="min-h-screen bg-core-mist text-core-ink">
    <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
    <AppHeader />
    <main id="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
