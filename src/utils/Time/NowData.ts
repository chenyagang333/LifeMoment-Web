export const GetFullYear = (date:Date = new Date()) => date.getFullYear();
export const GetMonth = (date:Date = new Date()) => ('0' + (date.getMonth() + 1)).slice(-2);
export const GetDate = (date:Date = new Date()) => ('0' + date.getDate()).slice(-2);
export const GetHours = (date:Date = new Date()) => ('0' + date.getHours()).slice(-2);
export const GetMinutes = (date:Date = new Date()) => ('0' + date.getMinutes()).slice(-2);
export const GetSeconds = (date:Date = new Date()) => ('0' + date.getSeconds()).slice(-2);

export default function GetNowData(){
  // 构建时间字符串
  var formattedTime = GetFullYear() + '-' + GetMonth() + '-' + GetDate() + ' ' + GetHours() + ':' + GetMinutes() + ':' + GetSeconds();
  return formattedTime;
}


