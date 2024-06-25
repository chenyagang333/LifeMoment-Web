import { UploadImage } from "@/api/modules/upload";

export const BaseUploadImage = async (formData: FormData) => {
    const res = await UploadImage(formData)
    if (res.code === 200) {
        res.data.firstURL = import.meta.env.VITE_APP_FILE_IP + res.data.firstURL;
        return res;
    }
    return ''
}