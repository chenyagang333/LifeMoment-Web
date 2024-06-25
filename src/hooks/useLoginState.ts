import { useUserStore } from "@/stores/user/user";
import { computed } from "vue";


// 同意管理用户登录状态的逻辑
export default function useLoginState() {
    const userStore = useUserStore();
    const login = computed(() => userStore.userData);
    return login
}