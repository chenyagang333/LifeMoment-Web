// 统一管理项目用户相关的接口
import { get, post } from "@/api/AHttp/api";

// 统一管理接口
enum API {
    SendCodeByRegister = "/Register/SendCodeByMail",// 
    CreateUser = "/Register/CreateUserByMail",// 
}
// 发送验证码
export const SendCodeByRegister = async (mail: string) => { //  => 
    const params = { mail }
    return get<any>(API.SendCodeByRegister, params);
};
// 注册用户
interface CreateUser {
    userName:string,
    mail:string,
    password:string,
    rightPassword:string,
    code:string,
}
export const CreateUser = (craeteUser:CreateUser) => { //  => 
    return post<any>(API.CreateUser, craeteUser);
};


