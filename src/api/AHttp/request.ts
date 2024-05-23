import { ElMessage } from 'element-plus';

// 进行axios二次封装，使用请求与响应拦截器
import axios from 'axios'
import { getToken, removeToken } from '@/utils/token';
// 第一步，利用axios对象的create方法，去创建axios实例（其他配置：基础路径、超时的时间）
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
    timeout: 5000000, // 超时的时间的设置
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    }
})
// 第二步，request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    // 获取token,请求时携带给服务器
    const token = getToken()
    // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    if (token) {
        config.headers.authorization = 'Bearer ' + token
    }

    // 返回配置对象
    return config;
})
request.interceptors.response.use((res) => {
    // 响应拦截器,成功回调
    // 简化数据
    return res.data;
    // return res;
}, (error) => {
    // 失败回调：处理http网络错误的失败回调
    // 定义一个变量：储存网络错误信息
    let message = '';
    let status = error.response?.status;
    switch (status) {
        case 400:
            message = error.response?.data;
            break;
        case 401:
            message = '用户登录过期，请重新登录';
            removeToken()
            break;
        case 403:
            message = '无权访问';
            break;
        case 404:
            message = '网络请求地址错误';
            break;
        case 500:
            message = '服务器出现错误';
            break;
        default:
            message = '网络出现问题';
            break;
    }
    // 提示错误信息
    ElMessage.error(message);
    // 返回对象
    return Promise.reject(error);
})
// 对外暴露
export default request;