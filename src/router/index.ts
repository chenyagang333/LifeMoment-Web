// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from "vue-router";
import { constantRoute } from "./routers";
import I18n from "@/language/index";
import { useUserStore } from '@/stores/user/user';
import pinia from '@/stores'; // 在获取小仓库之前必须要引入大仓库
import { getToken } from "@/utils/token";
import { storeToRefs } from "pinia";

const UserStore = useUserStore(pinia); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

// 创建路由器
let router = createRouter({
  // 路由模式
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (!userData.value) {
      UserStore.getUserData();
    }
  }else{
    userData.value = null;
  }
  // choosePush(to, next);
  next(); // 参数符合标准
});

// router.afterEach((to, from) => {
  // configLanguage(to);
// });



//#region 工具函数
// const zhCN = "zh-cn";
// const enUS = "en-us";

// const configLanguage = (to: any) => {
//   const language = to.params.language as string; // 获取地址栏中的语言标识
//   if (language == zhCN) {
//     I18n.global.locale.value = "zh";
//   } else {
//     I18n.global.locale.value = "en";
//   }
// };

// 选择跳转的路由
const choosePush = (to: any, next: any) => {
  const language = to.params.language as string; // 获取地址栏中的语言标识

  if (language) {
    // 参数是否存在
    if (language != zhCN && language != enUS) {
      if (zhCN.includes(language) || language.includes(zhCN)) {
        next({ path: to.fullPath.replace(language, zhCN) });
      } else if (enUS.includes(language) || language.includes(enUS)) {
        next({ path: to.fullPath.replace(language, enUS) });
      } else {
        next({ path: `/${zhCN}/` }); // 参数不存在或不包含enUS-US则跳转中文首页
      }
    } else {
      next(); // 参数符合标准
    }
  } else {
    // 参数不存在或不包含enUS-US则跳转中文首页
    next({ path: `/${zhCN}/` }); // 符合标准
  }
};

//#endregion

export default router;

