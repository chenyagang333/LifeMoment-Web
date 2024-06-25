// 对外暴露配置路由 (常量路由)
export const constantRoute = [
  {
    // 注册
    path: "/registersucceed",
    component: () => import("@/views/RegisterSucceed.vue"),
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
        // 注册
        path: "/register",
        component: () => import("@/views/Layout1/Register/Register.vue"),
        name: "register", // 命名路由
      },
      {
        path: "/",
        component: () => import("@/views/Layout1/youshow/youshow.vue"),
        name: "youshow",
        meta: {
          keepAlive: true // 需要缓存
        },
      },
      {
        path: "/search",
        component: () => import("@/views/Layout1/global-search/GlobalSearch.vue"),
        name: "search",
      },
      {
        // 登录成功以后展示数据的路由
        path: "/user",
        component: () => import("@/views/Layout1/user/User.vue"),
        name: "User", // 命名路由
      },
      {
        // 登录成功以后展示数据的路由
        path: "/userself",
        component: () => import("@/views/Layout1/user/UserSelf.vue"),
        name: "UserSelf", // 命名路由
      }
    ],
  },
  {
    path: "/:cathAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];
