// 统一管理项目用户相关的接口
import { del, get, post } from "@/api/AHttp/api";

// 统一管理接口
enum API {
  PagingQueryAsync = "/YouShow/PagingQueryAsync",// 获取shows内容
  CreateAsync = "/YouShow/CreateAsync",  // 
  DeleteByIdAsync = "/YouShow/DeleteByIdAsync",  // 
}
export const PagingQueryAsync = async (pageSize: number, pageIndex: number) => { // 获取shows内容
  const params = { pageSize, pageIndex };
  return await get<any>(API.PagingQueryAsync, params);
};
export const CreateAsync = async (
  imageURLList: string[],
  userId: number,
  UserName: string,
  UserAvatarURL: string,
  PublishAddress: string,
  Content: string,
  VideoURLList: string[],
) => {
  const params = { imageURLList, userId, UserName, UserAvatarURL, PublishAddress, Content, VideoURLList };
  return await post<any>(API.CreateAsync, params);
};
export const DeleteByIdAsync = async (id: number) => { // 获取shows内容
  const params = { id };
  return await del<any>(API.DeleteByIdAsync, params);
};

