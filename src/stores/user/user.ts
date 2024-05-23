import { defineStore } from 'pinia'
import { ref } from 'vue';
import { GetUserData } from "@/api/Layout1";
import { getToken, removeToken } from '@/utils/token';

interface UserData{
    ip:string,
    userId:number,
    userName:string,
    avatarImageURL:string,
}

export const useUserStore = defineStore('user', () => {
    const userData = ref<UserData | null>()

    async function getUserData() {
        try {
            const res = await GetUserData();
            if (res.code == 200) {
                userData.value = res.data;
            }
        } catch (error) {
            alert(error)            
        }
    }

    return { userData, getUserData }
})