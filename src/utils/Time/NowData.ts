export const GetFullYear = (date: Date = new Date()) => date.getFullYear();
export const GetMonth = (date: Date = new Date()) => ('0' + (date.getMonth() + 1)).slice(-2);
export const GetDate = (date: Date = new Date()) => ('0' + date.getDate()).slice(-2);
export const GetHours = (date: Date = new Date()) => ('0' + date.getHours()).slice(-2);
export const GetMinutes = (date: Date = new Date()) => ('0' + date.getMinutes()).slice(-2);
export const GetSeconds = (date: Date = new Date()) => ('0' + date.getSeconds()).slice(-2);

const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export const GetWeek = (date: Date = new Date()) => weeks[date.getDay()];

export default function GetNowData() {
  // 构建时间字符串
  var formattedTime = GetFullYear() + '-' + GetMonth() + '-' + GetDate() + ' ' + GetHours() + ':' + GetMinutes() + ':' + GetSeconds();
  return formattedTime;
}


