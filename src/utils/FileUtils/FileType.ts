// 文件类型

export enum FileType{
    Unknown,
    image,
    video,
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