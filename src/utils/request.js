/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-10-26 12:05:19
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-30 10:18:15
 */
import axios from "axios";
import qs from "qs";
import { message } from "ant-design-vue";
import { useCommonUtilStore } from "@/stores/commonUtil";
// 创建axios
const service = axios.create({
    withCredentials: true,
    contentType: false,
    processData: false,
    crossDomain: true,
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: "",
    timeout: 1000 * 40,
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        const commonUtil = useCommonUtilStore();

        // 在发送请求之前做些什么
        // 开启loadding
        // 是否开启loadding，默认开启
        var isLoadding =
            config.isLoadding === undefined ? true : config.isLoadding;
        if (isLoadding) {
            commonUtil.setLoading(isLoadding);
        }
        if (config.isExcel) {
            const hide = message.loading("正在导出，请稍候...", 0);
            setTimeout(hide, 2500);
        }
        if (config.ifSplicing) {
            let strUrl = "";
            const splicingData = config.splicingData || config.data;
            console.log("config.splicingData ", config.splicingData);
            for (const key in splicingData) {
                if (strUrl) {
                    strUrl += "&" + key + "=" + splicingData[key];
                } else {
                    strUrl = key + "=" + splicingData[key];
                }
            }
            if (strUrl) {
                strUrl = "?" + strUrl;
            }
            config.url += strUrl;
        }
        // 判断是不是form表单请求
        if (config.isForm) {
            const datas = qs.stringify(config.data, {
                arrayFormat: "indices",
                allowDots: true,
            });
            let formData = new FormData();
            for (let key in datas) {
                formData.append(key, datas[key]);
            }
            config.headers["Content-Type"] =
                "application/x-www-form-urlencoded; charset=UTF-8";
            config.data = datas;
        } else {
            config.data = config.data;
        }
        if (commonUtil.getItem("token")) {
            config.headers.Authorization =
                "Bearer " + commonUtil.getItem("token") || "";
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 导出
function exportExcel(data, title, type = ".csv") {
    const blob = new Blob([data], {
        type: "application/vnd.ms-excel",
    });
    const elink = document.createElement("a");
    elink.download = title + type;
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
}

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        const commonUtil = useCommonUtilStore();
        // 跳转登录的code
        const loginCodes = [5004];
        const config = response.config;

        //是否关闭loadding
        var isCloseLoadding =
            config.isCloseLoadding === undefined
                ? true
                : config.isCloseLoadding;
        // 是否开始错误弹框，默认开启
        var isPop = config.isPop === undefined ? true : config.isPop;

        if (isCloseLoadding) {
            commonUtil.setLoading(false);
        }
        // 对响应数据做点什么
        if (response.status === 200) {
            const data = response.data;
            if (config.isExcel) {
                exportExcel(data, config.excelTitle);
                return;
            }
            if (data.code == 0 || data.code == 2000 || data.code == 1000) {
                const result = data.data;
                try {
                    if (typeof result === "boolean") {
                        return result;
                    }
                    return typeof result === "string"
                        ? JSON.parse(result)
                        : result || {};
                } catch (error) {
                    return result;
                }
            } else {
                if (isPop) {
                    setTimeout(() => {
                        message.error(data.msg || "请求异常");
                    }, 400);
                }
                if (loginCodes.includes(data.code)) {
                    // 跳转登录
                    localStorage.clear();
                    commonUtil.navigateTo("login");
                }
                return Promise.reject(data);
            }
        }
        return response;
    },
    function (error, a) {
        const commonUtil = useCommonUtilStore();

        // 对响应错误做点什么
        commonUtil.setLoading(false);
        setTimeout(() => {
            message.error("请求异常");
        }, 400);
        return Promise.reject(error);
    }
);

export default service;
