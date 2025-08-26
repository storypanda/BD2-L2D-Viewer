import { defineStore } from 'pinia'

export type Language = 'en' | 'zh'

export interface LanguageOption {
  code: Language
  name: string
  flag: string
}

export const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
]

export const useLanguageStore = defineStore('languageStore', {
  state: () => ({
    currentLanguage: 'en' as Language,
  }),
  
  actions: {
    setLanguage(language: Language) {
      this.currentLanguage = language
      // 保存到本地存储
      localStorage.setItem('bd2-viewer-language', language)
    },

    initializeLanguage() {
      // 从本地存储读取语言设置
      const savedLanguage = localStorage.getItem('bd2-viewer-language') as Language
      if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
        this.currentLanguage = savedLanguage
      } else {
        // 检测浏览器语言
        const browserLanguage = navigator.language.toLowerCase()
        if (browserLanguage.startsWith('zh')) {
          this.currentLanguage = 'zh'
        } else {
          this.currentLanguage = 'en'
        }
      }
    }
  }
})
