// 引入项目中全部的全局组件
// import elAvatarCover from "./el-avatar-cover/index.vue";
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// <q-tabs v-model="activeName" dense align="justify">
// <q-tab class="text-blue" name="passwordLogin" label="密码登录">
// </q-tab>
// <q-tab class="text-orange" name="mailLogin" label="邮箱登陆" />
// <!-- <q-tab class="text-orange" name="smsLogin" label="短信登陆" /> -->
// </q-tabs>
// <q-tab-panels v-model="activeName" animated>
// <q-tab-panel name="passwordLogin">
// 全局对象
const allGloablComponent: any = {  };

// 对外暴露插件对象
export default {
  // 务必叫 install 方法
  install(app: any) {
    Object.keys(allGloablComponent).forEach((key) => {
      // import SvgIcon from '@/components/SvgIcon/index.vue';
      // app.component('SvgIcon', SvgIcon) // vue3 全局注册组件语法
      app.component(key, allGloablComponent[key]); // 注册所有组件
    });
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
