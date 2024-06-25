import { LOCAL_THEME_KEY } from '@/hooks/useTheme';
import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useAppStore = defineStore('App', () => {
    const value = localStorage.getItem(LOCAL_THEME_KEY)
    const theme = ref<string>(value ?? 'light') // 主题变换

    const headerUp = ref(true); // 是否滚动到首页顶部背景图下端
    const showLoginDialog = ref(false); // 登陆弹窗是否显示

    // 登陆弹窗是否显示
    const signInVisible = ref(false);


    const changeTheme = (value: string) => { // 主题切换
        theme.value = value
    }
    return {
        theme, headerUp, signInVisible, showLoginDialog,
        changeTheme
    }
})