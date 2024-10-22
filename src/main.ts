import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// import { Quasar } from 'quasar'

import "@/styles/index.scss"; // 引入模板的全局样式
import "@/styles/GlobalVariable/Theme/Dark.css"; // 引入全局自定义变量
import "@/styles/GlobalVariable/Theme/Light.css"; // 引入全局自定义变量


import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap-icons

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

import gloalComponent from "@/components"; // 引入自定义插件对象：注册整个项目全局组件

import i18n from "@/language/index"; // 国际化

// import ArcoVue from '@arco-design/web-vue';  // arco-design UI框架
// import '@arco-design/web-vue/dist/arco.css';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';


import pinia from '@/stores' // pinia仓库

import lazyPlugin from 'vue3-lazy'

// Import icon libraries
// import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
// import 'quasar/src/css/index.sass'

// 引入已登录才渲染的自定义指令
// import {LogInEd} from '@/directives/LogInEd';

const app = createApp(App);
// LogInEd(app);
/**定义变量$website，并赋值为devcursor**/
app.config.globalProperties.$FileIP = import.meta.env.VITE_APP_FILE_IP


// 安装自定义插件
app.use(pinia); // 仓库 // 在路由前
app.use(ElementPlus); // ElementPlus UI
// app.use(Antd);
app.use(gloalComponent); // 全局组件
app.use(i18n); // 国际化
// app.use(ArcoVue); // ArcoVue UI
app.use(router); // 路由
// app.use(Quasar, {
//     plugins: {}, // import Quasar plugins and add here
// })

import imageLoadError from '@/assets/default/imageLoadError.png';
lazyPlugin.install(app, {
    // loading: 'loading.gif', // png/git/jpg/等格式都可以和你存放的图片格式一样就行
    error: imageLoadError
  })
app.mount("#app");
