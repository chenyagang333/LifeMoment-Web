/* eslint-disable */

/**
 *
 * @param func 要被防抖的函数
 * @param wait  防抖的延迟时间
 * @param immediately 第一次的时候是否立即执行,默认为 true
 */
export function debounce(func: Function, wait: number, immediately: boolean = true) {
    let timerID: number = -1;
    return function (this: any, ...args: any[]) {
        if (timerID < 0 && immediately) {
            func.apply(this, args);
            timerID = 1;
            return;
        }
        if (timerID > 0) {
            clearTimeout(timerID);
        }
        timerID = window.setTimeout(() => {
            func.apply(this, args);
        },wait)
    }

}

export function afterExecutionAsync(func: () => Promise<void>) {
    let isExecuting = false;
    return async function () {
        if (!isExecuting) {
            console.log('789 :>> ', isExecuting);
            isExecuting = true;
            await func();
            isExecuting = false;
        } else {
            console.log("Previous execution is still in progress.");
            // 可以选择抛出错误或者返回一个表示操作未完成的 Promise
            // throw new Error("Previous execution is still in progress.");
        }
    };
}

/**
 * 根据路线出发日期 获取每天行程的出发日期
 * @param departDate 行程的出发时间
 * @param index  行程的索引
 */
export const getJourneyDate = (departDate:string | Date,index: number): string => { // 根据路线出发日期 获取每天行程的出发日期
    return getJourneytDate(departDate, index).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * 根据路线出发日期 获取每天行程的出发日期是周几
 * @param departDate 行程的出发时间
 * @param index  行程的索引
 */
const week = ["天", "一", "二", "三", "四", "五", "六"];
export const getJourneyWeek = (departDate:string | Date,index: number) => { // 根据路线出发日期 获取每天行程的出发日期是周几
    return `星期${week[getJourneytDate(departDate, index).getDay()]}`;
}

/**
 * 获取行程的日期
 * @param departDate 行程的出发时间
 * @param index  行程的索引
 */
const getJourneytDate = (departDate: string | Date, index: number) => {  // 获取行程的日期
    const date = new Date(departDate)
    date.setDate(date.getDate() + index);
    return date
}

const separators = ['/', '#', '~', '-']; // 指定逗号、感叹号和空格作为分隔符
export const regExp = new RegExp(separators.join('|'), 'g') // 使用正则表达式作为分隔符
/**
 * 转换标题名为当天的居住酒店城市名，也就是标题中的最后一个城市
 * @param title  行程的标题
 */
export const convertTitleName = (title: string) => { // 转换标题名为当天的居住酒店城市名，也就是标题中的最后一个城市
    regExp.lastIndex = 0; // 重置正则表达式对象的 lastIndex 属性
    if (regExp.test(title)) {
        const cityNames = title.split(regExp);
        const cityName = cityNames[cityNames.length - 1]; // 拿到最后一个城市名,也就是酒店所在的城市名
        return cityName;
    } else {
        return title;
    }
}

// 根据当前时间获取相应的见面问候语，用户登录时提示使用
export const getTime = (): string => {
    const hours = new Date().getHours();
    if (hours < 6) return '凌晨好';
    else if (hours < 9) return '早上好';
    else if (hours < 12) return '上午好';
    else if (hours < 14) return '中午好';
    else if (hours < 17) return '下午好';
    else if (hours < 19) return '傍晚好';
    else if (hours < 22) return '晚上好';
    else return '夜里好';
}





