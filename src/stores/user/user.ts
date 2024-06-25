import { defineStore } from 'pinia'
import { getCurrentInstance, ref } from 'vue';
import { GetUserData } from "@/api/Layout1";
import { getToken, removeToken } from '@/utils/token';
import { ElMessage } from 'element-plus';

export interface UserData {
    ip: string,
    id: number,
    userName: string,
    userAvatar: string,
    userAccount: number,
    attentionCount: number,
    fansCount: number,
    getLikeCount: number,
    likeCount: number,
    starCount: number,
    contentCount: number,
    description: string,
}
const FileIP = import.meta.env.VITE_APP_FILE_IP

export const useUserStore = defineStore('user', () => {
    const userData = ref<UserData | null>()


    async function getUserData() {
        try {
            const res = await GetUserData();
            if (res.code == 200) {
                userData.value = res.data;
            }
            if (res.code == 400) {
                removeToken()
                ElMessage.error(res.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    return { userData, getUserData }
})