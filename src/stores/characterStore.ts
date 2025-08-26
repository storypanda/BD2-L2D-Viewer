import { defineStore } from 'pinia'
import character_list from '@/utils/character_list'
import character_list_cn from '@/utils/character_list_cn'
import { useLanguageStore, type Language } from '@/stores/languageStore'

type AnimationCategory = 'character' | 'ultimate' | 'dating'
export interface Character {
  id: string
  charName: string
  costumeName: string
  spine: string
  cutscene: string
  dating: string
  datingHasNoBg?: boolean,
  customFiles?: {
    skel?: string,
    json?: string,
    atlas: string,
    images: Record<string, string>
  }
}

function getCharacterList(language: Language) {
  return language === 'zh' ? character_list_cn : character_list
}

function createCharacterArray(language: Language): Character[] {
  const list = getCharacterList(language)
  return Object.entries(list).map(([id, char]) => ({
    id,
    datingHasNoBg: true,
    ...char,
  }))
}

export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    const initialCharacters = createCharacterArray('en')
    return {
      characters: initialCharacters as Character[],
      selectedCharacterId: initialCharacters.length ? initialCharacters[0].id : '',
      selectedAnimation: '',
      selectedSkin: '',
      animationCategory: 'character' as AnimationCategory,
      playing: true,
      animationSpeed: 1,
      backgroundColor: '#1f2937',
      useCurrentCamera: false,
      showDatingBg: true,
    }
  },
  
  actions: {
    updateLanguage(language: Language) {
      const newCharacters = createCharacterArray(language)
      const currentSelectedId = this.selectedCharacterId
      
      this.characters = newCharacters
      
      // 检查当前选中的角色是否仍然存在
      if (currentSelectedId && newCharacters.some(char => char.id === currentSelectedId)) {
        this.selectedCharacterId = currentSelectedId
      } else if (newCharacters.length > 0) {
        this.selectedCharacterId = newCharacters[0].id
      }
    }
  }
})
