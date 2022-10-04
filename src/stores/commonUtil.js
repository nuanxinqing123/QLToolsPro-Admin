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
    userSms,
    checkToken,
    wxpusherState,
    userCheckToken,
} from "utils/api.js";
import { message } from "ant-design-vue";
import router from "@/router";

export const useCommonUtilStore = defineStore("commonUtil", {
    state: () => ({
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
        // 初始化跳转页面
        initGopage() {
            if (this.getUserSms.IsAdmin) {
                this.navigateTo("home");
            } else {
                this.navigateTo("variableSubmission");
            }
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
        // 获取订阅状态
        getWxpusherState() {
            return new Promise(async (resolve, reject) => {
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