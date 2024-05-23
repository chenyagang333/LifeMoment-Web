// 视频文件

export const handleVideoFileSelect = async (file: any): Promise<[string,File]> => {
    // await loadVideo(file.raw)
    return new Promise((resolve, reject) => {
        if (!file) reject("No file selected");

        const video = document.createElement('video');
        video.src = URL.createObjectURL(file.raw);
        // video.preload = 'metadata'
        video.preload = 'auto'
        // video.currentTime = 1;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        video.onloadeddata = () => {
            canvas.width = video.videoWidth; // 使用 video.videoWidth
            canvas.height = video.videoHeight; // 使用 video.videoHeight
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const coverDataURL = canvas.toDataURL();
                resolve([coverDataURL,blobToFile(blob!,`${file.name}-VideoPreviewImage`)]);
            })
        }
        // 处理视频加载失败的情况
        video.onerror = () => {
            reject("Failed to load video");
        };
        // 将视频文件URL设置为视频元素的源
        // video.setAttribute('preload', 'auto')
    });
}


function dataURLtoBlob(dataURL: string): Blob {
    // 将数据URL转换为Blob对象
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// 将Blob对象转换为File对象
function blobToFile(blob: Blob, fileName: string): File {
    // 从Blob类型中提取文件扩展名
    const extension = blob.type.split('/')[1];
    // 创建一个File对象
    const file = new File([blob], `${fileName}.${extension}`, { type: blob.type });
    console.log('file :>> ', file);
    return file;
}