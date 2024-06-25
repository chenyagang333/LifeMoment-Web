import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { RouteLocationRaw, Router } from "vue-router";
const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

export const goUserPage = (router: Router, userId: number, type: string = "production") => {
    if (userId == userData.value?.id) {
        router.push({
            path: "/userself",
            query: {
                type
            },
        });
    } else {
        window.open(router.resolve({
            path: "/user", query: {
                userId,
                type
            },
        }).href, "_blank");
    }


};
