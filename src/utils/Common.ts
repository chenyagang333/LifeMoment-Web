// 跳转页面
import {
  Router,
  LocationQuery,
  RouteLocationNormalizedLoaded,
} from "vue-router";
export const jump = (router: Router, url: string, data?: any) => {
  if (data) {
    console.log(data);

    // 带参数跳转
    // const query: LocationQuery = {};
    router.push({
      path: `/${url}`,
      // query: {
      //   params: encodeURIComponent(JSON.stringify(data)),
      // },
      query: data,
    });
  } else {
    // 不带参数跳转
    router.push({
      path: `/${url}`,
    });
  }
};
// 跳转页面后接收参数
export const routeQuery = (route: RouteLocationNormalizedLoaded) => {
  // 接受目的地页面传来的行程基本信息
  interface RouteQuery extends LocationQuery {
    params: string;
  }
  const routeQuery = route.query as RouteQuery;
  // if (route.query.params) {
  //   return JSON.parse(decodeURIComponent(routeQuery.params));
  // }
  if (route.query) {
    console.log(route.query);

    return route.query;
  }
};

// 将阿拉伯数字转换为中文的数字
export const zhCNnum = (num: number): string => {
  const strs: string[] = num.toString().split("");
  const len: number = strs.length;
  const zhCNnums = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["十", "百", "千"]; // 暂时写到千以内的数字转换
  // 十以内的
  if (len == 1) {
    return zhCNnums[num];
    // 百以内的
  } else if (len == 2) {
    if (strs[0] == "1") {
      return units[0] + zhCNnums[parseInt(strs[1])];
    } else {
      return (
        zhCNnums[parseInt(strs[0])] + units[0] + zhCNnums[parseInt(strs[1])]
      );
    }
    // 千以内的
  } else if (len == 3) {
    if (strs[1] == "0" && strs[2] == "0") {
      return zhCNnums[parseInt(strs[0])] + units[1];
    } else if (strs[1] == "0") {
      return (
        zhCNnums[parseInt(strs[0])] +
        units[1] +
        "零" +
        zhCNnums[parseInt(strs[2])]
      );
    } else {
      return (
        zhCNnums[parseInt(strs[0])] +
        units[1] +
        zhCNnums[parseInt(strs[1])] +
        units[0] +
        zhCNnums[parseInt(strs[2])]
      );
    }
  }
  return "";
};

// 点击导航条跳转到指定位置
export const scrollIntoViewByClass = (className: string): void => {
  const element = document.querySelector("." + className);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // 设置滚动行为为平滑滚动
      block: "start", // 滚动到目标元素顶部
      inline: "nearest", // 滚动到目标元素的最近边缘
    });
  }
};

// 点击导航条跳转到指定位置
// export const toJourneyById = (href: string): void => {
//   document.getElementById(href)?.scrollIntoView({
//     behavior: "smooth", 
//     block: "end", 
//     inline: "nearest",
//   });
// };

// 点击导航条跳转到指定位置
export const toJourneyById = (href: string): void => {
  const element = document.getElementById(href);
  // 获取视口高度
  const viewportHeight = window.innerHeight;
  // 获取元素距离视口顶部的位置
  const elementOffset = element.getBoundingClientRect().top;
  // 计算目标滚动位置
  const targetScrollPosition = window.scrollY + elementOffset - viewportHeight + 300;
  // 平滑滚动到目标位置
  window.scrollTo({
    top: targetScrollPosition,
    behavior: "smooth"
  });
};