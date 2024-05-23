
const userData = {
    id: 1,
    account: '2578036363',
    password: 'cyg304625',
    email: '2578036363@qq.com',
    userName: 'chenyagang',
    headImgUrl: './imgs/myimg.jpg'
}
export const mainLayout = [
    { // 获取shows内容
        url: "/User/Login",
        method: "post",
        response: ({ body }: any) => {
            const { userName, password } = body;
            const token = 'token';
            if ((userName == userData.userName || userName == userData.email|| userName == userData.account) && password == userData.password) {
                return { code: 200, message: '登陆成功', data: token }
            } else {
                console.log('body :>> ', body);
                return { code: 401, message: '登陆失败', data: undefined }
            }
        },
    },
    {// 获取用户信息
        url: '/User/GetUserData',
        method: 'post',
        response: (res: any) => {
            // 获取请求头携带token
            const token = res.headers.authorization;
            // 没有返回失败的信息
            if (token != 'token') {
                return { code: 201, message: '获取用户信息失败', data: undefined }
            }
            // 如果有返回成功信息
            return { code: 200, message: '获取用户信息成功', data: userData }
        }
    }
]