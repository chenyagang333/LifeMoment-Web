// 统一管理项目用户相关的接口
import { get, post } from "@/api/AHttp/api";

// 统一管理接口
enum API {
    SendCodeByRegister = "/Register/SendCodeByRegister",// 
    CreateUser = "/Register/CreateUser",// 
}
// 发送验证码
export const SendCodeByRegister = (phoneNumber: string) => { //  => 
    const params = { phoneNumber }
    return get<any>(API.SendCodeByRegister, params);
};
// 注册用户
interface CreateUser {
    userName:string,
    phoneNumber:string,
    phoneNumberRegion:string,
    password:string,
    rightPassword:string,
    code:string,
}
export const CreateUser = (craeteUser:CreateUser) => { //  => 
    return post<any>(API.CreateUser, craeteUser);
};


