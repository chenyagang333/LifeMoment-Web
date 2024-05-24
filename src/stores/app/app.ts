import { LOCAL_THEME_KEY } from '@/utils/Composables/useTheme';
import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useAppStore = defineStore('App', () => {
    const value = localStorage.getItem(LOCAL_THEME_KEY)
    const theme = ref<string>(value ?? 'light')

    const changeTheme = (value: string) => {
        theme.value = value
    }
    return { theme,changeTheme }
})