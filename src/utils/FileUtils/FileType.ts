// 文件类型 // 与后端WebAPI保持一致

export enum FileType{
    Unknown = 0,
    image = 1,
    video = 2,
}

export const imageType = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']);

export const videoType = new Set(['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']);

export const getFileType = (fileType:string):FileType => {
    if (imageType.has(fileType)) {
        return FileType.image
    }
    if (videoType.has(fileType)) {
        return FileType.video
    }
    return FileType.Unknown
} 