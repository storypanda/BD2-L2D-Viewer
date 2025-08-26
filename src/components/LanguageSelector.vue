<template>
  <div ref="dropdownRef" class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-1 px-2 py-1 text-white hover:bg-gray-700 rounded transition-colors"
      :aria-label="'Switch language'"
    >
      <span class="text-lg">{{ currentOption.flag }}</span>
      <span class="hidden md:inline text-sm">{{ currentOption.name }}</span>
      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 min-w-[120px]"
    >
      <button
        v-for="option in languageOptions"
        :key="option.code"
        @click="selectLanguage(option.code)"
        class="flex items-center gap-2 w-full px-3 py-2 text-left text-white hover:bg-gray-700 transition-colors"
        :class="{ 'bg-gray-700': option.code === languageStore.currentLanguage }"
      >
        <span class="text-lg">{{ option.flag }}</span>
        <span class="text-sm">{{ option.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguageStore, languageOptions, type Language } from '@/stores/languageStore'
import { useCharacterStore } from '@/stores/characterStore'

const languageStore = useLanguageStore()
const characterStore = useCharacterStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const currentOption = computed(() => {
  return languageOptions.find(option => option.code === languageStore.currentLanguage) || languageOptions[0]
})

function selectLanguage(language: Language) {
  languageStore.setLanguage(language)
  characterStore.updateLanguage(language)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
