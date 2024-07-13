import useEventListenerPopstate from '@/hooks/useEventListenerPopstate';
import { LOCAL_THEME_KEY } from '@/hooks/useTheme';
import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useAppStore = defineStore('App', () => {

    // 主题变换
    const theme = ref<string>(localStorage.getItem(LOCAL_THEME_KEY) ?? 'light')
    // 是否滚动到首页顶部背景图下端
    const headerUp = ref(true);
    // 登陆弹窗是否显示
    const showLoginDialog = ref(false);
    // 签到弹窗是否显示
    const { visible: signInVisible } = useEventListenerPopstate('signInVisible');
    // 屏幕是否为移动端尺寸
    const isMobile = ref(false);
    // 浏览器页面历史记录
    const historyMarks = ref<string[]>([]);


    // 主题切换
    const changeTheme = (value: string) => {
        theme.value = value
    }
    return {
        theme, headerUp, signInVisible, showLoginDialog, isMobile, historyMarks,
        changeTheme
    }
})