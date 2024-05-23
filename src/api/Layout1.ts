// 统一管理项目用户相关的接口
import { get } from "@/api/AHttp/api";

// 统一管理接口
enum API {
    GetUserData = "/User/GetUserDataByToken",// 
}

export const GetUserData = async () => { //  => 
    return await get<any>(API.GetUserData);
};

