import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useCharacterStore } from '@/stores/characterStore'
import { useLanguageStore } from '@/stores/languageStore'
import { applyUrlParams } from '@/utils/urlSync'
import App from './App.vue'

const pinia = createPinia()

// 初始化语言设置
const languageStore = useLanguageStore(pinia)
languageStore.initializeLanguage()

// 初始化角色存储并应用语言设置
const characterStore = useCharacterStore(pinia)
characterStore.updateLanguage(languageStore.currentLanguage)

applyUrlParams(characterStore, window.location.search)

const app = createApp(App)
app.use(pinia)
app.mount('#app')
