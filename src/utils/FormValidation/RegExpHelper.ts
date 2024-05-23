

//#region 校验input的正则表达式
// 校验手机号是否符合标准
export function validatePhone(phone: string): boolean {
    // 必须是1开头，第二位数字可以是0-9任意一个，总长为11
    const regExp = /^1[0-9]\d{9}$/;
    return regExp.test(phone);
}
// 是否包含空格
export function validateSpace(str: string): boolean {
    const regExp = /^\S+$/;
    return regExp.test(str);
}
// 长度是否为8-16个字符
export function between8And16(str: string): boolean {
    const regExp = /^.{8,16}$/;
    return regExp.test(str);
}
// 是否包含数字
export function havenumber(str: string): boolean {
    const regExp = /[0-9]/;
    return regExp.test(str);
}
// 是否包含字母
export function haveLetters(str: string): boolean {
    const regExp = /[a-zA-Z]/;
    return regExp.test(str);
}
// // 是否包含6个及以上连续相同的字母或数字字符
// export function haveContinuous(str: string): boolean {
//   const regExp = /\1{5,}/;
//   return regExp.test(str);
// }

//#endregion

