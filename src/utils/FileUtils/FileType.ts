// 文件类型 // 与后端WebAPI保持一致

export enum FileType {
    Unknown = 0,
    image = 1,
    video = 2,
}

export const imageType = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']);

export const videoType = new Set(['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']);

// 根据文件类型获取文件类型
export const getFileType = (fileType: string): FileType => {
    if (imageType.has(fileType)) {
        return FileType.image
    }
    if (videoType.has(fileType)) {
        return FileType.video
    }
    return FileType.Unknown
}
// 根据文件名获取文件类型
// Define sets for image and video file extensions
const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']);
const videoExtensions = new Set(['mp4', 'mpeg', 'quicktime', 'x-msvideo', 'x-ms-wmv']);

export const getFileTypeByFileName = (fileName: string): FileType => {
    const extension = getFileExtension(fileName);

    if (imageExtensions.has(extension)) {
        return FileType.image;
    }
    if (videoExtensions.has(extension)) {
        return FileType.video;
    }
    return FileType.Unknown;
}

// Helper function to get file extension from file name
const getFileExtension = (fileName: string): string => {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1) {
        return ''; // No extension found
    }
    return fileName.substring(dotIndex + 1).toLowerCase();
}