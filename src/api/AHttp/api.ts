// 统一管理项目用户相关的接口
import request from "@/api/AHttp/request";
import { AxiosRequestConfig } from "axios";

export interface ApiResult<T> {
    code: number,
    message: string,
    data: T,
    total: number,
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T> | any> {
    const response = await request.get<ApiResult<T>>(url, { params });
    return response;
}

export async function post<T, D = any>(url: string, data?: any, config?: AxiosRequestConfig<D>): Promise<ApiResult<T> | any> {
    const response = await request.post<ApiResult<T>>(url, data, config);
    return response;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T> | any> {
    const response = await request.put<ApiResult<T>>(url, data)
    return response;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T> | any> {
    const response = await request.delete<ApiResult<T>>(url, { params });
    return response;
}