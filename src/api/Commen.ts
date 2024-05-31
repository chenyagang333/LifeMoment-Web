// pinai
import { useUserStore } from '@/stores/user/user';
import { storeToRefs } from 'pinia'
const UserStore = useUserStore();
const { userData } = storeToRefs(UserStore)
import axios from 'axios'

let request = axios.create({
    timeout: 5000, // 超时的时间的设置
})

// 统一管理项目用户相关的接口
import { get } from "@/api/AHttp/api";

// 统一管理接口
enum API {
    GetAddress = "https://restapi.amap.com/v3/ip",// 
}

export const GetAddressAsync = async () => { //  => 
    const params = {
        key: "b9fe1600bd434cee8375f822b3e0da15",
        ip: userData.value?.ip
    }
    return (await request.get<any>(API.GetAddress, { params })).data;
};
export const GetAddressByYouShowAsync = async () => {
    try {
        return await get('YouShow/GetAddress');
    } catch {
        return "未知"
    }
}

