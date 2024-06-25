// 统一管理项目用户相关的接口
import { ApiResult, get, post } from "@/api/AHttp/api";
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";

// 统一管理接口


// 图片上传
export const UploadImage = (formData:FormData) => { //  => 
    return post<ApiResult<MyFileInfo>>("Uploader/UploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
};

// 视频上传
export const UploadVideo = (formData:FormData) => { //  => 
    return post<ApiResult<MyFileInfo>>("Uploader/UploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
};

