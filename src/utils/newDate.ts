export default function GetNowData(){
  // 创建一个新的 Date 对象，表示当前时间
  var currentDate = new Date();
  
  // 获取年份
  var year = currentDate.getFullYear();
  
  // 获取月份（注意月份从 0 开始，需要加 1）
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  
  // 获取日期
  var day = ('0' + currentDate.getDate()).slice(-2);
  
  // 获取小时
  var hours = ('0' + currentDate.getHours()).slice(-2);
  
  // 获取分钟
  var minutes = ('0' + currentDate.getMinutes()).slice(-2);
  
  // 获取秒钟
  var seconds = ('0' + currentDate.getSeconds()).slice(-2);
  
  // 构建时间字符串
  var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  return formattedTime;
}

