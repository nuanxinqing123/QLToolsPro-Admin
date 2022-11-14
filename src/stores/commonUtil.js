function deepClone(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] =
                    obj && typeof obj[key] === "object"
                        ? deepClone(obj[key])
                        : obj[key];
            }
        }
    }
    return newObj;
}
import { defineStore } from "pinia";
import {
    webSettingsSms,
    getSetting,
    userSms,
    checkToken,
    wxpusherState,
    userCheckToken,
} from "utils/api.js";
import { message } from "ant-design-vue";
import router from "@/router";

export const useCommonUtilStore = defineStore("commonUtil", {
    state: () => ({
        isCollapsed: false, // 侧边栏缩进开关
        // isSlider: true, //是否显示侧边栏
        isMobile: false,
        // 容器高度
        routerPageHeight: 0,
        // 网页宽度
        bodyWidth: 0,
        // 网站设置obj
        siteSettings: {
            web_bg: "",
            web_title: "",
            web_ico: "",
            web_logo: "",
            register: "",
            notice: "",
        },
        // 用户信息
        userSms: {},
        pageKeys: [],
        activePage: {
            title: "",
            content: "",
        },
        isLoading: false, // 是否显示loading
        storageName: "qltools-admin",
    }),
    getters: {
        //是移动端返回true,否则false
        // isMobile: (state) => {
        //     let flag = navigator.userAgent.match(
        //         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        //     );
        //     return flag;

        //     // return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|webOS|android/i.test(
        //     //     navigator.userAgent
        //     // );
        // },
        /**
         * @description 获取storage中存储的值
         * @param {Object} key
         */
        getItem: (state) => (key) => {
            if (!key) {
                return;
            }
            const _storageName = JSON.parse(
                window.localStorage.getItem(state.storageName) || "{}"
            );
            return _storageName[key] || "";
        },
        getUserSms: (state) => {
            if (JSON.stringify(state.userSms) === "{}") {
                const that = useCommonUtilStore();
                state.userSms = that.getItem("userSms") || {};
            }
            return state.userSms;
        },
        getIsLoading: (state) => state.isLoading,
        /**
         * @desc 转换为string
         */
        strToString: (state) => (s) => {
            let str = s || "";
            return typeof str == "string" ? str : JSON.stringify(str);
        },
        /**
         * @desc 保留小数
         */
        toFixed: (state) => (num) => parseFloat(num.toFixed(2)),
        //昨天的时间
        getYesterdayTime: (state) => {
            var day = new Date();
            var now = new Date(day.getTime() - 24 * 60 * 60 * 1000),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            // now.toTimeString().substr(0, 8)
            return (
                y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
            );
        },
        getDateTime: (state) => (date) => {
            var now = date ? new Date(date) : new Date(),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            // now.toTimeString().substr(0, 8)
            return (
                y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
            );
        },
        getActiveAllDateMinute: (state) => (key) => {
            //shijianchuo是整数，否则要parseInt转换
            var time = key ? new Date(Number(key)) : new Date();
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var min = time.getMinutes();
            return (
                y +
                "-" +
                (m > 9 ? m : "0" + m) +
                "-" +
                (d > 9 ? d : "0" + d) +
                " " +
                (h > 9 ? h : "0" + h) +
                ":" +
                (min > 9 ? min : "0" + min)
            );
        },
        getActiveAllDate: (state) => (key) => {
            //shijianchuo是整数，否则要parseInt转换
            var time = key ? new Date(Number(key)) : new Date();
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var min = time.getMinutes();
            var s = time.getSeconds();
            return (
                y +
                "-" +
                (m > 9 ? m : "0" + m) +
                "-" +
                (d > 9 ? d : "0" + d) +
                " " +
                (h > 9 ? h : "0" + h) +
                ":" +
                (min > 9 ? min : "0" + min) +
                ":" +
                (s > 9 ? s : "0" + s)
            );
        },
    },
    actions: {
        setCollapsed(flag) {
            this.isCollapsed = flag;
        },
        setMobile(flag) {
            this.bodyWidth =
                document.body.clientWidth || document.body.offsetWidth;
            this.isMobile = flag;
            if (flag) {
                this.isCollapsed = true;
                document.getElementsByTagName("body")[0].className =
                    "mobile-page";
            } else {
                this.isCollapsed = false;
                document.getElementsByTagName("body")[0].className = "";
            }
        },
        // 设置容器高度
        setRouterPageHeight(height) {
            this.routerPageHeight = height;
        },
        // 初始化跳转页面
        initGopage(code) {
            // if (code == 5003) {
            //     console.log("adsda");
            //     if (this.getUserSms.IsAdmin) {
            //         this.navigateTo("variableSubmission");
            //     } else {
            //     }
            // } else {
            if (this.getUserSms.IsAdmin) {
                this.navigateTo("adminHome");
            } else {
                this.navigateTo("variableSubmission");
            }
            // }
        },
        // 页面跳转
        /*
         * 保留当前页面，跳转到应用内的某个指定页面，可以使用 uni.navigateBack 返回到原来页面。
         * @param {url} 跳转路径
         * @param {param}传递的参数 Object
         */
        navigateTo(name) {
            router.push({
                name: name,
            });
        },
        // 设置网页设置
        setPageSettings(flag) {
            if (flag && this.getItem("siteSettings")) {
                this.siteSettings = this.getItem("siteSettings");
            }
            const { web_ico, web_title, web_bg } = this.siteSettings;
            // 设置ico
            if (web_ico) {
                let $favicon = document.querySelector('link[rel="icon"]');
                if ($favicon !== null) {
                    $favicon.href = web_ico;
                } else {
                    $favicon = document.createElement("link");
                    $favicon.rel = "icon";
                    $favicon.href = web_ico;
                    document.head.appendChild($favicon);
                }
            }
            // 设置标题
            if (web_title) {
                document.title = web_title;
            }
            // 设置背景图片
            if (web_bg) {
                const bgDom = document.body;
                console.log("bgDom", bgDom);
                bgDom.style.backgroundSize = "cover";
                bgDom.style.backgroundImage = "url(" + web_bg + ")";
            } else {
                const bgDom = document.body;
                bgDom.style.backgroundImage = "url()";
            }
        },
        // 获取网站设置
        getWebSetting(flag) {
            return new Promise(async (resolve, reject) => {
                webSettingsSms().then((data) => {
                    try {
                        this.siteSettings.web_title =
                            data.filter((item) => item.key == "web_title")[0]
                                .value || "";
                    } catch (error) {}
                    try {
                        this.siteSettings.web_ico =
                            data.filter((item) => item.key == "web_ico")[0]
                                .value || "";
                    } catch (error) {}
                    try {
                        this.siteSettings.web_logo =
                            data.filter((item) => item.key == "web_logo")[0]
                                .value || "";
                    } catch (error) {}
                    try {
                        this.siteSettings.register =
                            data.filter((item) => item.key == "register")[0]
                                .value || "";
                    } catch (error) {}
                    try {
                        this.siteSettings.web_bg =
                            data.filter((item) => item.key == "web_bg")[0]
                                .value || "";
                    } catch (error) {}
                    try {
                        this.siteSettings.notice =
                            data.filter((item) => item.key == "notice")[0]
                                .value || "";
                    } catch (error) {}

                    // 保存缓存
                    this.saveItem("siteSettings", this.siteSettings);
                    this.setPageSettings(flag);
                    resolve(this.siteSettings);
                });
            });
        },
        // 获取订阅状态
        getWxpusherState() {
            return new Promise(async (resolve, reject) => {
                /*// 网站标题
                const titleRes = await getSetting({
                    splicingData: {
                        key: "web_title",
                    },
                });
                if (titleRes.value) {
                    this.siteSettings.title = titleRes.value;
                }
                // 网站图标
                const icoRes = await getSetting({
                    splicingData: {
                        key: "web_ico",
                    },
                });
                if (icoRes.value) {
                    this.siteSettings.ico = icoRes.value;
                }

                // 网站logo
                const logoRes = await getSetting({
                    splicingData: {
                        key: "web_logo",
                    },
                });
                if (logoRes.value) {
                    this.siteSettings.logo = logoRes.value;
                }
                // 网站背景
                const bgRes = await getSetting({
                    splicingData: {
                        key: "web_bg",
                    },
                });
                if (bgRes.value) {
                    this.siteSettings.bgUrl = bgRes.value;
                }
                  // 保存缓存
                this.saveItem("siteSettings", this.siteSettings);
                */

                // await this.getWebSetting(true);
                wxpusherState()
                    .then((data) => {
                        resolve(data);
                        if (data) {
                            this.initGopage();
                        } else {
                            message.error("请先订阅推送");
                            this.navigateTo("subscriptionPush");
                        }
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },
        // 获取用户信息
        getUserSmsInfo(flag) {
            return new Promise(async (resolve, reject) => {
                userSms()
                    .then(async (data) => {
                        this.setUserSms(data);
                        if (!flag) {
                            await this.getWxpusherState();
                        }
                        resolve(data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },
        // 检查token
        checkUserToken() {
            let tokenFuc = this.getUserSms.IsAdmin
                ? checkToken
                : userCheckToken;
            return new Promise(async (resolve, reject) => {
                tokenFuc()
                    .then(async (data) => {
                        await this.getUserSmsInfo();
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },
        setUserSms(obj) {
            this.userSms = obj || {};
            // 保存缓存
            this.saveItem("userSms", obj);
        },
        setLoading(flag) {
            this.isLoading = flag;
        },
        /**
         * @name 保存
         * @param {key}  存储的名称
         * @param {value}  需要存储的值
         */
        saveItem(key, value) {
            if (!key) {
                return;
            }
            const _storageName = JSON.parse(
                window.localStorage.getItem(this.storageName) || "{}"
            );
            _storageName[key] = value;
            window.localStorage.setItem(
                this.storageName,
                JSON.stringify(_storageName)
            );
        },
        /**
         * @name 清楚缓存
         * @param {key} key 存储的名称
         */
        clearItem(key) {
            if (!key) {
                return;
            }
            const _storageName = JSON.parse(
                window.localStorage.getItem(this.storageName) || "{}"
            );
            if (_storageName[key]) {
                delete _storageName[key];
            }
            window.localStorage.setItem(
                this.storageName,
                JSON.stringify(_storageName)
            );
        },

        /*
         * 设置标题
         * @param  标题
         */
        setNavBar(title) {
            document.title = title;
        },
    },
});
