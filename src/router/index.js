/*
 * @Descripttion: 路由
 * @Author: LiLei
 * @Date: 2021-10-25 17:17:40
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 22:17:47
 */
import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
const routes = [
    {
        path: "/",
        redirect: "/ready",
    },
    {
        path: "/ready",
        name: "ready",
        component: () => import(/* webpackChunkName: 'ready' */ "@/Ready.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: 'login' */ "@/Login.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () =>
            import(/* webpackChunkName: 'home' */ "@/pages/home/home.vue"),
    },
    {
        path: "/subscriptionPush",
        name: "subscriptionPush",
        meta: {
            title: "订阅推送",
        },
        component: () =>
            import(
                /* webpackChunkName: 'subscriptionPush' */ "@/pages/subscriptionPush/index.vue"
            ),
    },
    {
        path: "/MainHome",
        name: "MainHome",
        component: () =>
            import(/* webpackChunkName: 'MainHome' */ "../MainHome.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: "总览",
                    key: "1",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'home' */ "@/pages/adminPage/home/index.vue"
                    ),
            },
            {
                path: "/panelManagement",
                name: "panelManagement",
                meta: {
                    title: "面板管理",
                    key: "2",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'panelManagement' */ "@/pages/adminPage/panelManagement/index.vue"
                    ),
            },
            {
                path: "/userManagement",
                name: "userManagement",
                meta: {
                    title: "用户管理",
                    key: "3",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'userManagement' */ "@/pages/adminPage/userManagement/index.vue"
                    ),
            },
            {
                path: "/messagePushManagement",
                name: "messagePushManagement",
                meta: {
                    title: "消息推送管理",
                    key: "4",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'messagePushManagement' */ "@/pages/adminPage/messagePushManagement/index.vue"
                    ),
            },
            {
                path: "/userVariableManagement",
                name: "userVariableManagement",
                meta: {
                    title: "用户变量管理",
                    key: "5",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'userVariableManagement' */ "@/pages/adminPage/userVariableManagement/index.vue"
                    ),
            },
            {
                path: "/rechargeData",
                name: "rechargeData",
                meta: {
                    title: "充值数据",
                    key: "6",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'rechargeData' */ "@/pages/adminPage/rechargeData/index.vue"
                    ),
            },
            {
                path: "/uploadData",
                name: "uploadData",
                meta: {
                    title: "上传记录",
                    key: "7",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'uploadData' */ "@/pages/adminPage/uploadData/index.vue"
                    ),
            },
            {
                path: "/variableManagement",
                name: "variableManagement",
                meta: {
                    title: "变量管理",
                    key: "8",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'variableManagement' */ "@/pages/adminPage/variableManagement/index.vue"
                    ),
            },
            {
                path: "/cardSecretManagement",
                name: "cardSecretManagement",
                meta: {
                    title: "卡密管理",
                    key: "9",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'cardSecretManagement' */ "@/pages/adminPage/cardSecretManagement/index.vue"
                    ),
            },
            {
                path: "/plugInManagement",
                name: "plugInManagement",
                meta: {
                    title: "插件管理",
                    key: "10",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'plugInManagement' */ "@/pages/adminPage/plugInManagement/index.vue"
                    ),
            },
            {
                path: "/webSettings",
                name: "webSettings",
                meta: {
                    title: "网站设置",
                    key: "11",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'webSettings' */ "@/pages/adminPage/webSettings/index.vue"
                    ),
            },
            {
                path: "/containerManagement",
                name: "containerManagement",
                meta: {
                    title: "容器管理",
                    key: "12",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'containerManagement' */ "@/pages/adminPage/containerManagement/index.vue"
                    ),
            },
        ],
    },
    {
        path: "/main",
        name: "main",
        component: () => import(/* webpackChunkName: 'Main' */ "../Main.vue"),
        children: [
            {
                path: "/variableSubmission",
                name: "variableSubmission",
                meta: {
                    title: "变量提交",
                    key: "1",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'variableSubmission' */ "@/pages/userPage/variableSubmission/index.vue"
                    ),
            },
            {
                path: "/recharge",
                name: "recharge",
                meta: {
                    title: "充值服务",
                    key: "2",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'recharge' */ "@/pages/userPage/recharge/index.vue"
                    ),
            },
            {
                path: "/rechargeRecord",
                name: "rechargeRecord",
                meta: {
                    title: "充值记录",
                    key: "3",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'rechargeRecord' */ "@/pages/userPage/rechargeRecord/index.vue"
                    ),
            },
            {
                path: "/uploadRecords",
                name: "uploadRecords",
                meta: {
                    title: "上传记录",
                    key: "4",
                },
                component: () =>
                    import(
                        /* webpackChunkName: 'uploadRecords' */ "@/pages/userPage/uploadRecords/index.vue"
                    ),
            },
        ],
    },
];

const router = createRouter({
    history:
        process.env.NODE_ENV === "development"
            ? createWebHistory()
            : createWebHashHistory(),
    routes,
});

// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
import { useCommonUtilStore } from "stores/commonUtil";
router.beforeEach((to, from, next) => {
    const commonUtil = useCommonUtilStore();
    document.title = to.meta.title ? to.meta.title : "管理平台";
    commonUtil.$patch({
        pageKeys: [to.meta.key],
        activePage: {
            title: to.meta.title,
        },
    });
    next(); // 允许通过

    // to.matched 是一个数组（匹配到是路由记录）
    // to.matched.some(record => record.meta.requiresAuth)
    // if (to.meta.requiresAuth) {
    //     if (!store.state.user) {
    //         // 跳转到登录页面
    //         next({
    //             name: "login",
    //             query: {
    //                 // 通过 url 传递查询字符串参数
    //                 redirect: to.fullPath, // 把登录成功需要返回的页面告诉登录页面
    //             },
    //         });
    //     } else {
    //         next(); // 允许通过
    //     }
    // } else {
    //     next(); // 允许通过
    // }
});

export default router;
