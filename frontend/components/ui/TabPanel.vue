<script setup lang="ts">
import type { TabItem } from '~/types/landing'

const props = defineProps<{
  tabs: TabItem[]
  defaultTab?: string
}>()

const activeTab = ref(props.defaultTab ?? props.tabs[0]?.id ?? '')

const setTab = (id: string) => {
  activeTab.value = id
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  let nextIndex = index
  if (event.key === 'ArrowRight') {
    nextIndex = (index + 1) % props.tabs.length
  } else if (event.key === 'ArrowLeft') {
    nextIndex = (index - 1 + props.tabs.length) % props.tabs.length
  } else {
    return
  }
  event.preventDefault()
  const nextTab = props.tabs[nextIndex]
  if (nextTab) {
    activeTab.value = nextTab.id
    const btn = (event.currentTarget as HTMLElement)
      ?.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]
    btn?.focus()
  }
}
</script>

<template>
  <div>
    <div role="tablist" class="flex gap-1 border-b border-core-line" aria-label="Secciones">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        role="tab"
        type="button"
        :id="`tab-${tab.id}`"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        class="px-4 py-3 text-sm font-bold transition-colors duration-200"
        :class="activeTab === tab.id
          ? 'border-b-2 border-core-orange text-core-ink'
          : 'text-slate-500 hover:text-core-ink'"
        @click="setTab(tab.id)"
        @keydown="handleKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-6">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :id="`panel-${tab.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
        :hidden="activeTab !== tab.id"
      >
        <p v-if="activeTab === tab.id" class="leading-7 text-slate-600 transition-opacity duration-300">
          {{ tab.content }}
        </p>
      </div>
    </div>
  </div>
</template>
