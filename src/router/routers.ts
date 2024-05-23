// 对外暴露配置路由 (常量路由)
export const constantRoute = [
  {
    // 注册
    path: "/register",
    component: () => import("@/views/Register/Register.vue"),
    name: "register", // 命名路由
  },
  {
    // 注册
    path: "/registersucceed",
    component: () => import("@/views/Register/RegisterSucceed.vue"),
    name: "RegisterSucceed", // 命名路由
  },
  {
    // 登录成功以后展示数据的路由
    path: "/layout1",
    component: () => import("@/views/Layout1/Layout1.vue"),
    name: "layout", // 命名路由
    redirect: "/",
    children: [
      {
        path: "/",
        component: () => import("@/views/Layout1/youshow/youshow.vue"),
        name: "youshow",
      },
    ],
  },
  {
    path: "/:cathAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];
