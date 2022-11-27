/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-03-24 13:15:33
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-27 11:35:03
 */
import { useCommonUtilStore } from "@/stores/commonUtil";
import { message } from "ant-design-vue";
import qs from "qs";

function doDownloadFile(config) {
    const commonUtil = useCommonUtilStore();

    console.log("configconfigconfig", config);
    var isLoadding = config.isLoadding === undefined ? true : config.isLoadding;
    //是否关闭loadding
    var isCloseLoadding =
        config.isCloseLoadding === undefined ? true : config.isCloseLoadding;
    // 是否开始错误弹框，默认开启
    var isPop = config.isPop === undefined ? true : config.isPop;

    if (isLoadding) {
        commonUtil.setLoading(true);
    }

    if (config.ifSplicing) {
        let strUrl = "";
        const splicingData = config.splicingData || config.data;
        console.log("config.splicingData Download", config.splicingData);
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

    const hide = message.loading(config.exportTip || "正在导出，请稍候...", 0);
    setTimeout(hide, 500);
    const data = config.data;
    console.log("导出下载请求参数：", data);
    const oReq = new XMLHttpRequest();
    // console.log('params', params)

    oReq.open(config.method || "POST", config.url, true);
    oReq.setRequestHeader("Content-Type", "application/json");
    if (commonUtil.getItem("token") && !config.noAuthorization) {
        oReq.setRequestHeader(
            "Authorization",
            "Bearer " + commonUtil.getItem("token") || ""
        );
    }

    oReq.responseType = "blob";
    oReq.onload = function (oEvent) {
        const content = oReq.response;

        const elink = document.createElement("a");
        elink.download =
            config.excelTitles ||
            config.excelTitle + (config.excelType || ".xlsx");
        elink.style.display = "none";

        const blob = new Blob([content], {
            type: "application/vnd.ms-excel",
        });

        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    };
    oReq.send(JSON.stringify(data));
    // 请求结束
    oReq.addEventListener("loadend", (e) => {
        if (isCloseLoadding) {
            store.commit("setLoadding", false);
            commonUtil.setLoading(false);
        }
    });
}

export default doDownloadFile;
