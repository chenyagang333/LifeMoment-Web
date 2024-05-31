// 获取assets静态资源
export const getEmotionFiles = (url: any) => {
    return new URL(`/public/emotions/${url}.gif`, import.meta.url).href;
};

const baseLeft = 'Emotion['
const baseRight = ']Emotion'


const ip = import.meta.env.VITE_APP_FILE_IP;
// 为防止IP或域名变动，对表情的存储和展示时做相对路径的转换
export function replaceCustomString(inputString: string) {
    // 使用正则表达式匹配 Emotion[未知数]Emot ion 格式的字符串
    return inputString.replace(/Emotion\[(.*?)\]Emotion/g, function (match: any, p1: any) {
        // p1 是匹配到的未知数部分，可以在这里进行替换操作
        return `<img src="${ip}emotions/${p1}">`;
    });
}

// 为防止IP或域名变动，对表情的存储和展示时做相对路径的转换
export function replaceImgString(inputString:string) {
    // 使用正则表达式匹配<img>标签中的src属性内容，并替换
    return inputString.replace(/<img\s+src="([^"]+\/emotions\/)([^"]+)"\s*\/?>/g, function (match: string, p1: string, p2: string) {
        // 输出匹配到的内容
        // 返回替换后的字符串，这里左半部分替换为AAA，右半部分替换为BBB，并去掉中间的斜杠
        return baseLeft + p2.replace(/\//g, '') + baseRight;
    });
}

