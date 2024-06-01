import { useUserStore } from "@/stores/user/user";


const UserStore = useUserStore(); // 拿到管理用户信息的仓库
export const LogInEd = (app: any) => {
    // 全局的自定义指令：实现用户登录才渲染的效果
    app.directive('LogInEd', {
        mounted(el: any, binding: any, vnode: any, prevVnode: any) {
            // if (!UserStore.userData) {
            //     el.style.display = 'none'
            // }
        },
    })
}