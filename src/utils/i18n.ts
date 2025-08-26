import type { Language } from '@/stores/languageStore'

export interface Translations {
  search: string
  upload: string
  changelog: string
  language: string
}

const translations: Record<Language, Translations> = {
  en: {
    search: 'Search...',
    upload: 'Upload',
    changelog: 'Changelog',
    language: 'Language'
  },
  zh: {
    search: '搜索...',
    upload: '上传',
    changelog: '更新日志',
    language: '语言'
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}

export function t(key: keyof Translations, language: Language): string {
  return translations[language][key]
}
