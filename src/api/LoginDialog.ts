// 统一管理项目用户相关的接口
import { get, post } from "@/api/AHttp/api";

// 统一管理接口
enum API {
    Login = "/Login/Login",// x
    LoginBySMS = "/Login/LoginByPhoneSMS",// 
    SendCodeBySMSLogin = "/Login/SendCodeBySMSLogin",// 
}

export const Login = async (account: string, password: string) => { //  => 
    const params = { account, password }
    return await post<any>(API.Login, params);
};
export const LoginByPhoneSMS = (phoneNumber: string, code: string) => { //  => 
    const params = { phoneNumber, code }
    return post<any>(API.LoginBySMS, params);
};
// 发送验证码
export const SendCodeBySMSLogin = (phoneNumber: string) => { //  => 
    const params = { phoneNumber }
    return get<any>(API.SendCodeBySMSLogin, params);
};



