import { createI18n } from "vue-i18n";
// 从语言包文件中导入语言包对象
import zh from "./zh-CN";
import en from "./en-US";

export const messages = {
  zh, // 引入 zh.json 文件
  en, // 引入 en.json 文件
};

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: "zh", // set locale
  fallbackLocale: "zh", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  globalInjection: true, // 可以在template模板中使用$t
  // ...
});

export default i18n;
