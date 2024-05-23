import { ref, watchEffect } from 'vue';
type Theme = 'light' | 'dark';

export const LOCAL_THEME_KEY = '__theme__';
const theme = ref<Theme>(localStorage.getItem(LOCAL_THEME_KEY) as Theme || 'light');

watchEffect(() => {
    localStorage.setItem(LOCAL_THEME_KEY, theme.value);
    document.documentElement.dataset.theme = theme.value;
})

export default function useTheme() {
    return { theme };
};